import React, { useEffect, useState } from "react";
import classes from "./TypeModal.module.css";
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import { Input } from "@/component/atoms/Input";
import Button from "@/component/atoms/Button";
import useAxios from "@/interceptor/axiosInterceptor";
import useDebounce from "@/resources/hooks/useDebounce";
import { RECORDS_LIMIT } from "@/const";
import { useFormik } from "formik";
import { TYPE_INITIAL } from "@/formik/formikInitialValues/form-initial-values";
import { TypeSchema } from "@/formik/formikSchema/formik-schemas";

const TypeModal = ({ show, onHide, initialValues, onSubmit, isEdit, loading }) => {
  // Units fetching state
  const [units, setUnits] = useState([]);
  const [unitsLoading, setUnitsLoading] = useState(false);
  const [unitsSearch, setUnitsSearch] = useState("");
  const [unitsPage, setUnitsPage] = useState(1);
  const [unitsTotalRecords, setUnitsTotalRecords] = useState(0);
  const debounceUnitsSearch = useDebounce(unitsSearch, 500);
  
  const { Get } = useAxios();

  // Formik setup
  const formik = useFormik({
    initialValues: TYPE_INITIAL,
    validationSchema: TypeSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  // Fetch units with pagination
  const fetchUnits = async (page = 1, search = "") => {
    setUnitsLoading(true);
    const query = {
      page,
      limit: RECORDS_LIMIT,
      search,
    };
    const queryString = new URLSearchParams(query);
    const { response } = await Get({
      route: `units/all?${queryString}`,
    });
    if (response) {
      setUnits(response?.data || []);
      setUnitsTotalRecords(response?.totalRecords);
      setUnitsPage(page);
    }
    setUnitsLoading(false);
  };

  useEffect(() => {
    if (show) {
      // Initialize form data
      formik.setValues({
        name: initialValues?.name || "",
        description: initialValues?.description || "",
        selectedUnits: initialValues?.units || [],
      });
      
      // Fetch units
      fetchUnits(1, "");
      setUnitsSearch("");
      setUnitsPage(1);
    }
  }, [initialValues, show]);

  useEffect(() => {
    if (show) {
      fetchUnits(1, debounceUnitsSearch);
      setUnitsPage(1);
    }
  }, [debounceUnitsSearch, show]);

  // No need for manual handleSubmit - formik handles this

  const handleClose = () => {
    // Reset form when closing
    formik.resetForm();
    setUnitsSearch("");
    setUnitsPage(1);
    setUnits([]);
    onHide();
  };

  const handleUnitSelect = (unit) => {
    const isSelected = formik.values.selectedUnits.some(selected => selected.slug === unit.slug);
    
    // Mark field as touched for validation
    formik.setFieldTouched('selectedUnits', true);
    
    if (isSelected) {
      // Remove unit
      formik.setFieldValue('selectedUnits', 
        formik.values.selectedUnits.filter(selected => selected.slug !== unit.slug)
      );
    } else {
      // Add unit
      formik.setFieldValue('selectedUnits', 
        [...formik.values.selectedUnits, unit]
      );
    }
  };

  const handleRemoveSelectedUnit = (unitSlug) => {
    // Mark field as touched for validation
    formik.setFieldTouched('selectedUnits', true);
    
    formik.setFieldValue('selectedUnits', 
      formik.values.selectedUnits.filter(unit => unit.slug !== unitSlug)
    );
  };

  const handleUnitsPageChange = (newPage) => {
    fetchUnits(newPage, debounceUnitsSearch);
  };

  const isUnitSelected = (unit) => {
    return formik.values.selectedUnits.some(selected => selected.slug === unit.slug);
  };

  return (
    <ModalSkeleton
      show={show}
      onHide={handleClose}
      header={isEdit ? "Edit Type" : "Add New Type"}
      width="800px"
    >
      <form onSubmit={formik.handleSubmit} className={classes.typeForm}>
        <div className={classes.formSection}>
          <h5 className={classes.sectionTitle}>Type Information</h5>
          <Input
            label="Type Name"
            placeholder="Enter type name"
            value={formik.values.name}
            setter={(value) => formik.setFieldValue('name', value)}
            onBlur={formik.handleBlur}
            name="name"
            errorText={formik.touched.name && formik.errors.name}
            required
          />
          
          <TextArea
            label="Description (Optional)"
            placeholder="Enter type description (optional)"
            value={formik.values.description}
            setter={(value) => formik.setFieldValue('description', value)}
            onBlur={formik.handleBlur}
            name="description"
            errorText={formik.touched.description && formik.errors.description}
            rows={3}
          />
        </div>

        <div className={classes.formSection}>
          <h5 className={classes.sectionTitle}>Select Units</h5>
          
          {/* Units Search */}
          <div className={classes.unitsSearch}>
            <Input
              label="Search Units"
              placeholder="Search for units..."
              value={unitsSearch}
              setter={setUnitsSearch}
            />
          </div>

          {/* Selected Units */}
          {formik.values.selectedUnits.length > 0 && (
            <div className={classes.selectedUnits}>
              <h6 className={classes.selectedTitle}>Selected Units ({formik.values.selectedUnits.length})</h6>
              <div className={classes.selectedUnitsList}>
                {formik.values.selectedUnits.map((unit) => (
                  <div key={unit.slug} className={classes.selectedUnit}>
                    <span className={classes.selectedUnitName}>{unit.name}</span>
                    <button
                      type="button"
                      className={classes.removeUnitBtn}
                      onClick={() => handleRemoveSelectedUnit(unit.slug)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Units Validation Error */}
          {formik.touched.selectedUnits && formik.errors.selectedUnits && (
            <div className={classes.validationError}>
              {formik.errors.selectedUnits}
            </div>
          )}

          {/* Units List */}
          <div className={classes.unitsContainer}>
            <h6 className={classes.unitsTitle}>Available Units</h6>
            {unitsLoading ? (
              <div className={classes.unitsLoading}>Loading units...</div>
            ) : (
              <>
                <div className={classes.unitsList}>
                  {units.map((unit) => (
                    <div
                      key={unit.slug}
                      className={`${classes.unitItem} ${isUnitSelected(unit) ? classes.unitSelected : ''}`}
                      onClick={() => handleUnitSelect(unit)}
                    >
                      <div className={classes.unitInfo}>
                        <span className={classes.unitName}>{unit.name}</span>
                        {unit.description && (
                          <span className={classes.unitDescription}>{unit.description}</span>
                        )}
                      </div>
                      <div className={classes.unitSelectIcon}>
                        {isUnitSelected(unit) ? '✓' : '+'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Units Pagination */}
                {unitsTotalRecords > RECORDS_LIMIT && (
                  <div className={classes.unitsPagination}>
                    <Button
                      type="button"
                      variant="outline"
                      label="Previous"
                      disabled={unitsPage <= 1}
                      onClick={() => handleUnitsPageChange(unitsPage - 1)}
                    />
                    <span className={classes.pageInfo}>
                      Page {unitsPage} of {Math.ceil(unitsTotalRecords / RECORDS_LIMIT)}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      label="Next"
                      disabled={unitsPage >= Math.ceil(unitsTotalRecords / RECORDS_LIMIT)}
                      onClick={() => handleUnitsPageChange(unitsPage + 1)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Form Summary Errors */}
        {Object.keys(formik.errors).length > 0 && formik.submitCount > 0 && (
          <div className={classes.formErrors}>
            <h6 className={classes.formErrorsTitle}>Please fix the following errors:</h6>
            <ul className={classes.formErrorsList}>
              {formik.errors.name && <li>{formik.errors.name}</li>}
              {formik.errors.description && <li>{formik.errors.description}</li>}
              {formik.errors.selectedUnits && <li>{formik.errors.selectedUnits}</li>}
            </ul>
          </div>
        )}

        <div className={classes.buttonGroup}>
          <Button
            type="button"
            label="Cancel"
            variant="outline"
            onClick={handleClose}
            disabled={loading}
          />
          <Button 
            type="submit" 
            label={isEdit ? "Update Type" : "Create Type"}
            disabled={loading}
            loading={loading}
          />
        </div>
      </form>
    </ModalSkeleton>
  );
};

export default TypeModal; 