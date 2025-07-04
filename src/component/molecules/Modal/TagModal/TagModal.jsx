import React, { useEffect } from "react";
import classes from "./TagModal.module.css";
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import { Input } from "@/component/atoms/Input";
import Button from "@/component/atoms/Button";

const TagModal = ({ show, onHide, initialValues, onSubmit, isEdit, loading }) => {
  const [formData, setFormData] = React.useState({
    name: initialValues?.name || "",
    description: initialValues?.description || "",
  });

  useEffect(() => {
    if (show) {
      setFormData({
        name: initialValues?.name || "",
        description: initialValues?.description || "",
      });
    }
  }, [initialValues, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      alert("Unit name is required");
      return;
    }

    onSubmit(formData);
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      name: "",
      description: "",
    });
    onHide();
  };

  return (
    <ModalSkeleton
      show={show}
      onHide={handleClose}
      header={isEdit ? "Edit Unit" : "Add New Unit"}
      width="500px"
    >
      <form onSubmit={handleSubmit} className={classes.tagForm}>
        <Input
          label="Unit Name"
          placeholder="Enter unit name"
          value={formData.name}
          setter={(value) => setFormData({ ...formData, name: value })}
          required
        />
        
        <TextArea
          label="Description"
          placeholder="Enter unit description (optional)"
          value={formData.description}
          setter={(value) => setFormData({ ...formData, description: value })}
          rows={4}
        />

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
            label={isEdit ? "Update Unit" : "Create Unit"}
            disabled={loading}
            loading={loading}
          />
        </div>
      </form>
    </ModalSkeleton>
  );
};

export default TagModal; 