// InvoiceDetails.js

import React, { useState, useEffect } from "react";
import FormInput from "../form/FormInput";

import FormSelect from "../form/FormSelect";

export default function InvoiceDetails({
  handleSubmit,
  register,
  errors,
  setValue,
  setError,
  clearErrors,
  currencies,
  currenciesLoader,
}: any) {
  const [base64, setBase64] = useState("");

  const onFileChange = (e: any) => {
    const file = e.target.files[0];
    const isFileSizeValid = file.size <= 2 * 1024 * 1024; // 2MB
    const isFileTypeValid = ["image/jpeg", "image/png", "image/gif"].includes(
      file.type
    );

    if (!isFileSizeValid) {
      setError("details.file", {
        type: "fileSize",
        message: "The file is too large",
      });
      return;
    }

    if (!isFileTypeValid) {
      setError("details.file", {
        type: "fileType",
        message: "Unsupported file format",
      });
      return;
    }

    if (isFileSizeValid && isFileTypeValid) {
      clearErrors("details.file");

      const reader = new FileReader() as any;
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const base64String = reader.result;
        setBase64(base64String);
        setValue("details.file", base64String);
      };
    }
  };

  const onDateChange = (date: string) => {
    setValue("details.date", date); // Assuming "details.date" is the name of your date field
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        id="logo"
        label="Logo:"
        name="details.file"
        type="file"
        register={register}
        onFileChange={onFileChange}
        errorMessage={errors?.details?.file?.message}
      />
      <FormInput
        id="invoiceNumber"
        label="Invoice No:"
        name="details.invoiceNumber"
        type="number"
        register={register}
        errorMessage={errors?.details?.invoiceNumber?.message}
      />
      <FormInput
        id="Issue Date:"
        label="Issue Date:"
        name="details.issueDate"
        type="date"
        register={register}
        errorMessage={errors?.details?.issueDate?.message}
      />
      <FormInput
        id="Due Date:"
        label="Due Date:"
        name="details.dueDate"
        type="date"
        register={register}
        errorMessage={errors?.details?.dueDate?.message}
      />
      <FormSelect
        id="currency"
        label="Currency:"
        register={register}
        name="details.currency"
        options={currencies}
        type="currency"
        loading={currenciesLoader}
        errorMessage={errors?.details?.currency?.message}
      />
    </form>
  );
}
