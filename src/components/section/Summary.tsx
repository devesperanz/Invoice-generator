import React, { useState } from "react";
import FormTextArea from "../form/FormTextArea";
import FormSelect from "../form/FormSelect";
import { PiEmptyBold } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";

export default function Summary({
  register,
  setValue,
  errors,
  templates,
  templatesLoading,
}: any) {
  const templateColor = [
    "transparent",
    "custom1",
    "custom2",
    "custom3",
    "custom4",
    "custom5",
    "custom6",
    "custom7",
    "custom8",
    "custom9",
    "custom10",
    "custom11",
    "custom12",
    "custom13",
  ];

  const fontStyles = ["normal", "italic", "oblique"];

  const colorClasses: { [key: string]: string } = {
    transparent: "bg-transparent",
    custom1: "bg-custom1",
    custom2: "bg-custom2",
    custom3: "bg-custom3",
    custom4: "bg-custom4",
    custom5: "bg-custom5",
    custom6: "bg-custom6",
    custom7: "bg-custom7",
    custom8: "bg-custom8",
    custom9: "bg-custom9",
    custom10: "bg-custom10",
    custom11: "bg-custom11",
    custom12: "bg-custom12",
    custom13: "bg-custom13",
  };

  const textColors = ["#ffffff", "#000000"];

  const [selectedColor, setSelectedColor] = useState<string>("transparent");
  const [selectedFontStyle, setSelectedFontStyle] = useState<string>("normal");

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setValue("summary.templateColor", color); // Update form data with selected color
  };

  const handleTextColor = (color: string) => {
    setSelectedColor(color);
    setValue("summary.textColor", color); // Update form data with selected color
  };

  const handleFontStyleSelect = (fontStyle: string) => {
    setSelectedFontStyle(fontStyle);
    setValue("summary.fontStyle", fontStyle); // Update form data with selected font style
  };

  return (
    <div>
      <FormSelect
        id="summary.template"
        label="Select Template:"
        register={register}
        name="summary.template"
        type="template"
        options={templates}
        errorMessage={errors?.summary?.template?.message}
        loading={templatesLoading}
        customClass="flex-col"
      />
      <div className="mt-4">
        <FormSelect
          id="summary.fontStyle"
          label=" Select Font Style"
          name="summary.fontStyle"
          register={register}
          options={fontStyles}
          type="font"
          errorMessage={errors?.summary?.fontStyle?.message}
          loading={false}
          customClass="flex-col"
        />
      </div>

      <div className="my-4">
        <label htmlFor="color" className="mr-4 min-w-[90px] max-w-full">
          Select Template Color
        </label>
        <div className="grid grid-cols-7 gap-4 w-[20rem] mt-4">
          {templateColor.map((item: string, index: number) => (
            <div
              key={index}
              className={`relative w-[40px] h-[40px] cursor-pointer ${
                item === "transparent"
                  ? "bg-white flex items-center justify-center"
                  : colorClasses[item]
              }`}
              onClick={() => handleColorSelect(item)}
            >
              {item === "transparent" && <PiEmptyBold />}
              {selectedColor === item && (
                <FaCheck
                  className={`absolute top-1 right-1 ${
                    item === "transparent" ? "text-black" : "text-white"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="my-4">
        <label htmlFor="color" className="mr-4 min-w-[90px] max-w-full">
          Select Text Color
        </label>
        <div className="grid grid-cols-7 gap-4 w-[20rem] mt-4">
          {textColors.map((item: string, index: number) => (
            <div
              key={index}
              style={{ backgroundColor: item }}
              className={`relative w-[40px] h-[40px] cursor-pointer border border-solid outline-sky-950]`}
              onClick={() => handleTextColor(item)}
            >
              {selectedColor === item && (
                <FaCheck
                  className={`absolute top-1 right-1 ${
                    item !== "#ffffff" ? "text-white" : "text-[#000000]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <FormTextArea
        id="summary.note"
        label="Additional Note:"
        name="summary.note"
        register={register}
        placeholder=""
        errorMessage={errors?.summary?.note?.message}
        customClass="flex-col"
      />
    </div>
  );
}
