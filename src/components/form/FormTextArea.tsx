import React from "react";

export default function FormTextArea({
  errorMessage,
  name,
  placeholder,
  label,
  id,
  register,
  customClass,
}: any) {
  return (
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
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          rows={9}
          {...register(name)}
          className="bg-transparent w-[28rem] border-[#1E293B] border-solid border-4 outline-none mb-0 py-2 px-4 text-xs leading-5 focus:text-white block text-xs rounded border"
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}
