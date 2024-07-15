import React from "react";
import FormInput from "@/components/form/FormInput";
export default function PaymentInfo({ register, errors }: any) {
  return (
    <div className="">
      <FormInput
        id="payment.name"
        label="Bank Name:"
        name="payment.name"
        type="text"
        register={register}
        errorMessage={errors?.payment?.name?.message}
        customClass="flex-col"
      />
      <FormInput
        id="payment.accountName"
        label="Account Name:"
        name="payment.accountName"
        type="text"
        register={register}
        errorMessage={errors?.payment?.accountName?.message}
        customClass="flex-col"
      />
      <FormInput
        id="payment.accountNo"
        label="Account Number:"
        name="payment.accountNo"
        type="number"
        register={register}
        errorMessage={errors?.payment?.accountNo?.message}
        customClass="flex-col"
      />
    </div>
  );
}
