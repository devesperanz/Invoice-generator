import React from "react";
import FormInput from "../form/FormInput";
export default function FromAndTo({ handleSubmit, register, errors }: any) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-10 mb-4">
        <FormInput
          id="title"
          label="Invoice Title"
          name="title"
          placeholder="Invoice Title"
          type="text"
          register={register}
          errorMessage={errors.title?.message}
          customClass="flex-col"
        />
      </div>
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div>
          <h1 className="mb-4 font-semibold text-xl">Bill From: </h1>
          <FormInput
            id="name"
            label="Name"
            name="billFrom.name"
            placeholder=""
            type="text"
            register={register}
            errorMessage={errors?.billFrom?.name?.message}
          />

          <FormInput
            id="email"
            label="Email"
            name="billFrom.email"
            type="email"
            placeholder=""
            register={register}
            errorMessage={errors.billFrom?.email?.message}
          />

          <FormInput
            id="phone"
            label="Phone"
            name="billFrom.phone"
            type="phone"
            placeholder=""
            register={register}
            errorMessage={errors.billFrom?.phone?.message}
          />

          <FormInput
            id="address"
            label="Address"
            name="billFrom.address"
            type="text"
            placeholder=""
            register={register}
            errorMessage={errors.billFrom?.address?.message}
          />

          <FormInput
            id="city"
            label="City"
            name="billFrom.city"
            type="text"
            placeholder=""
            register={register}
            errorMessage={errors.billFrom?.city?.message}
          />

          <FormInput
            id="country"
            label="Country"
            name="billFrom.country"
            type="text"
            placeholder=""
            register={register}
            errorMessage={errors.billFrom?.country?.message}
          />
        </div>

        <div>
          <h1 className="mb-4 font-semibold text-xl">Bill To: </h1>
          <FormInput
            id="name"
            label="Name"
            name="billTo.name"
            placeholder=""
            type="text"
            register={register}
            errorMessage={errors.billTo?.name?.message}
          />

          <FormInput
            id="email"
            label="Email"
            name="billTo.email"
            type="email"
            placeholder=""
            register={register}
            errorMessage={errors.billTo?.email?.message}
          />

          <FormInput
            id="phone"
            label="Phone"
            name="billTo.phone"
            type="phone"
            placeholder=""
            register={register}
            errorMessage={errors.billTo?.phone?.message}
          />

          <FormInput
            id="address"
            label="Address"
            name="billTo.address"
            type="text"
            placeholder=""
            register={register}
            errorMessage={errors.billTo?.address?.message}
          />

          <FormInput
            id="city"
            label="City"
            name="billTo.city"
            type="text"
            placeholder=""
            register={register}
            errorMessage={errors.billTo?.city?.message}
          />

          <FormInput
            id="country"
            label="Country"
            name="billTo.country"
            type="text"
            placeholder=""
            register={register}
            errorMessage={errors.billTo?.country?.message}
          />
        </div>
      </div>
      {/* <button type="submit">Submit</button> */}
    </form>
  );
}
