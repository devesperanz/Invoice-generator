// FormSelect.tsx

import React, { useState, useEffect } from "react";
import { UseFormRegister } from "react-hook-form";

type FormSelectProps = {
  errorMessage?: string;
  name: string;
  label: string;
  id: string;
  register?: UseFormRegister<any>;
  options: any[];
  type: "currency" | "template" | "font" | "invoice";
  customClass?: string;
  loading: any;
};

const FormSelect: React.FC<FormSelectProps> = ({
  register = () => ({}),
  name,
  options,
  errorMessage,
  label,
  id,
  type,
  loading,
  customClass,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  // // useEffect(() => {
  // //   if (type === "invoice") {
  // //     setSelectedValue("");
  // //   } else if (value !== undefined) {
  // //     setSelectedValue(value);
  // //   }
  // // }, [type, value]);

  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value } = event.target;
  //   setSelectedValue(value);
  //   if (onChange) {
  //     onChange(value);
  //   }
  // };

  const labelWidthClass = customClass?.includes("flex-col")
    ? "w-full"
    : "w-[100px]";

  const selectClasses = `
    bg-transparent w-[13rem] border-[#1E293B] border-solid outline-none mb-1 py-2 px-4 text-xs leading-5 focus:text-white block text-xs rounded border
    ${type === "invoice" ? "bg-red-500 border-white border-1 h-10" : "border-4"}
  `;

  return (
    <div>
      <div className={`flex items-start ${customClass}`}>
        <label
          htmlFor={id}
          className={`${
            label === "" ? "d-none" : `mr-4 ${labelWidthClass} py-3`
          }`}
        >
          {label}
        </label>
        <div>
          <select {...register(name)} className={selectClasses}>
            {loading ? (
              <option>loading....</option>
            ) : (
              <>
                {type === "currency" &&
                  Object.entries(options).map(([code, name]: any) => (
                    <option key={code} value={code}>
                      {code}: {name}
                    </option>
                  ))}
                {type === "template" &&
                  options.map((item: any) => (
                    <option key={item.Id} value={item.Id}>
                      {item.Name}
                    </option>
                  ))}
                {type === "font" &&
                  options.map((style: string, index: number) => (
                    <option key={index} value={style}>
                      {style}
                    </option>
                  ))}
              </>
            )}
          </select>
        </div>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default FormSelect;
