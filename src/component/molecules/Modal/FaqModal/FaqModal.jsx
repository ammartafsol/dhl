import React, { useEffect } from "react";

import classes from "./FaqModal.module.css";
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton";
import { Input } from "@/component/atoms/Input";
import Button from "@/component/atoms/Button";

const FaqModal = ({ show, onHide, initialValues, onSubmit, isEdit }) => {
  const [formData, setFormData] = React.useState({
    title: initialValues?.title || "",
    description: initialValues?.description || "",
  });

  useEffect(() => {
    setFormData({
      title: initialValues?.title || "",
      description: initialValues?.description || "",
    });
  }, [initialValues, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onHide();
  };

  return (
    <ModalSkeleton
      show={show}
      onHide={onHide}
      title={isEdit ? "Edit FAQ" : "Add New FAQ"}
    >
      <form onSubmit={handleSubmit} className={classes.faqForm}>
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <TextArea
          label="Description"
          value={formData.description}
          setter={(value) => setFormData({ ...formData, description: value })}
          required
        />
        <div className={classes.buttonGroup}>
          <Button
            type="button"
            label="Cancel"
            variant="outline"
            onClick={onHide}
          />
          <Button type="submit" label={isEdit ? "Update" : "Add"} />
        </div>
      </form>
    </ModalSkeleton>
  );
};

export default FaqModal;
