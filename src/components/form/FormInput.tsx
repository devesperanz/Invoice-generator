import React from "react";
import { MdOutlineDateRange } from "react-icons/md";
type FormInputProps = {
  type: string;
  errorMessage?: string;
  name: string;
  placeholder?: string;
  label?: string;
  id: string;
  register: any;
  min?: string;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customClass?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  type,
  errorMessage,
  name,
  placeholder,
  label,
  id,
  register,
  onFileChange,
  min,
  customClass,
}) => {
  return (
    <div>
      {type === "file" && (
        <div className="flex items-start">
          <label
            htmlFor={id}
            className={`${label === "" ? "d-none" : "mr-4 w-[100px] py-3"}`}
          >
            {label}
          </label>
          <div className="mb-4 w-full">
            <input
              id={id}
              name={name}
              placeholder={placeholder}
              type={type}
              accept="image/*"
              onChange={onFileChange}
              className="bg-transparent w-[14rem] border-[#1E293B] border-solid border-4 outline-none mb-1 py-2 px-4 text-xs leading-5 focus:text-white block text-xs rounded border"
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
        </div>
      )}

      {type === "date" && (
        <div className="flex items-start">
          <label
            htmlFor={id}
            className={`${label === "" ? "d-none" : "mr-4 w-[100px] py-3"}`}
          >
            {label}
          </label>
          <div className="mb-4 w-full ">
            <div className="relative">
              <input
                id={id}
                name={name}
                placeholder={placeholder}
                type={type}
                min={min}
                {...register(name)}
                className="bg-transparent w-[14rem] border-[#1E293B] border-solid border-4 outline-none mb-1 py-2 px-4 text-xs leading-5 focus:text-white block text-xs rounded border"
              />
              <div className="absolute inset-y-0 right-0 left-44  pl-3 flex items-center pointer-events-none">
                <MdOutlineDateRange />
              </div>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
        </div>
      )}

      {type !== "file" && type !== "date" && (
        <div className={`flex items-start ${customClass}`}>
          <label
            htmlFor={id}
            className={`${
              label === "" ? "d-none" : "mr-4 min-w-[90px] max-w-full py-3"
            }`}
          >
            {label}
          </label>
          <div className="mb-4 w-full relative self-start">
            <input
              id={id}
              name={name}
              placeholder={placeholder}
              type={type}
              {...register(name)}
              className="bg-transparent w-[14rem] border-[#1E293B] border-solid border-4 outline-none mb-0 py-2 px-4 text-xs leading-5 focus:text-white block text-xs rounded border"
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormInput;
