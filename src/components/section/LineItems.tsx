import React, { useMemo } from "react";
import FormInput from "../../components/form/FormInput";
import { MdDelete } from "react-icons/md";

export default function LineItems({
  register,
  errors,
  data,
  currencies,
  append,
  remove,
}: any) {
  const formattedDetails = useMemo(() => {
    return data;
  }, [data]);

  return (
    <div>
      <div className="bg-transparent border border-solid rounded-xl p-4">
        {formattedDetails?.items?.map((item: any, index: any) => (
          <div key={index} className="mb-4">
            <div className="flex items-center justify-between">
              <h1>
                #{index + 1} - {item.name === "" ? "Empty Name" : item.name}
              </h1>
              {formattedDetails?.items?.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 px-2 py-2 rounded-md"
                >
                  <MdDelete />
                </button>
              )}
            </div>

            <div className="mt-6">
              <FormInput
                id={`items.${index}.name`}
                label="Name:"
                name={`items.${index}.name`}
                type="text"
                register={register}
                errorMessage={errors?.items?.[index]?.name?.message}
              />
              <FormInput
                id={`items.${index}.quantity`}
                label="Quantity:"
                name={`items.${index}.quantity`}
                type="number"
                register={register}
                errorMessage={errors?.items?.[index]?.quantity?.message}
              />
              <FormInput
                id={`items.${index}.rate`}
                label="Rate:"
                name={`items.${index}.rate`}
                type="number"
                register={register}
                errorMessage={errors?.items?.[index]?.rate?.message}
              />

              <div className="flex items-center mb-3">
                <label className="mr-4 w-[100px] py-3">Total: </label>
                <p className="italic">
                  {formattedDetails?.details?.currency}{" "}
                  {item.quantity * item.rate}
                </p>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ name: "", quantity: 1, rate: 0 })}
          className="bg-blue-500 px-4 py-2 rounded-md"
        >
          Add New
        </button>
      </div>
    </div>
  );
}
