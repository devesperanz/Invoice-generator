"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useInvoices from "@/hooks/useInvoices";
import { FaFileInvoice } from "react-icons/fa";
import useCurrencies from "@/hooks/useCurrencies";
import useTemplates from "@/hooks/useTemplates";
import InvoiceForm from "@/components/InvoiceForm";
import FormSelect from "@/components/form/FormSelect";
import Button from "@/components/ui/Button";
import { MdSaveAlt } from "react-icons/md";
import { BiSolidFilePdf } from "react-icons/bi";
import InvoiceModal from "@/components/modal/InvoiceModal";
import { InvoicePayloadType } from "@/types/invoice";
import { RxReset } from "react-icons/rx";
import { createInvoiceHTML } from "@/types/invoice";
function replacePlaceholders(htmlContent: any, data: any) {
  // Replace placeholders with values from data
  let replacedHTML = htmlContent.replace(
    /{{\s*\.\s*([\w.]+)\s*}}/g,
    (match: any, key: any) => {
      let keys = key.split(".");
      let value = data;
      for (let k of keys) {
        value = value[k];
      }
      return value !== undefined ? value : match;
    }
  );
  // Replace other placeholders as before
  replacedHTML = replacedHTML.replace(
    /{{\s*\.\s*([\w.]+)\s*}}/g,
    (match: any, key: any) => {
      let keys = key.split(".");
      let value = data;
      for (let k of keys) {
        value = value[k];
      }
      return value !== undefined ? value : match;
    }
  );

  return replacedHTML;
}

export default function Home() {
  const { invoices, invoicesLoading, saveInvoice } = useInvoices();
  const { currencies, currenciesLoading } = useCurrencies();
  const { templates, templatesLoading } = useTemplates();
  const [formData, setFormData] = useState({} as InvoicePayloadType);
  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedTemplates, setSelectedTemplates] = useState(
    {} as InvoicePayloadType
  );
  const updateFormData = (data: InvoicePayloadType) => {
    saveInvoice(data);
    handleReset();
  };

  const openDialog = () => {
    setOpen(true);
  };

  const handleTemplate = (value: any) => {
    setSelectedInvoice(value);
    openDialog();
    const selectedInvoiceData = invoices.find(
      (item: any) => item.title === value
    );
    setSelectedTemplates(selectedInvoiceData);
  };

  useEffect(() => {
    if (!open) {
      setSelectedInvoice("");
    }
  }, [open]);

  const childRef = useRef() as any;

  const handleAction = () => {
    childRef.current.childMethod();
  };
  const handleReset = () => {
    if (childRef.current) {
      childRef.current.resetMethod();
    }
  };

  const selectedTemplate = useMemo(() => {
    return templates.find(
      (template) => template.Id === formData?.summary?.template
    );
  }, [formData?.summary?.template, templates]);

  const decodedContent = useMemo(() => {
    if (selectedTemplate?.Content) {
      return atob(selectedTemplate.Content);
    }
    return "";
  }, [selectedTemplate]);

  useEffect(() => {
    console.log("Decoded Content:", decodedContent);
  }, [decodedContent]);

  const colors = {
    transparent: "#ffffff",
    custom1: "#333333",
    custom2: "#555555",
    custom3: "#455964",
    custom4: "#C62828",
    custom5: "#D71A60",
    custom6: "#7B1EA2",
    custom7: "#4526A0",
    custom8: "#283593",
    custom9: "#1664C0",
    custom10: "#0177BD",
    custom11: "#01685C",
    custom12: "#2F7C31",
    custom13: "#548B2F",
  } as any;

  const srcDoc = replacePlaceholders(decodedContent, {
    BrandLogo: formData?.details?.file,
    Title: `${formData?.title ? formData?.title : "Enter title"} - ${
      formData?.details?.invoiceNumber
        ? formData?.details?.invoiceNumber
        : "###"
    }`,
    Content: createInvoiceHTML(formData),
    Terms: formData?.title,
    FontStyle: "italic",
    FontColor: formData?.summary?.textColor,
    BackgroundColor: colors[formData?.summary?.templateColor],
  });

  return (
    <>
      <nav className="bg-[#383737] h-[60px] text-white w-full flex items-center py-10">
        <div className="container pl-16 flex items-center ">
          <FaFileInvoice size={30} className="mr-4" />
          <h1 className="text-3xl font-serif">Quik Invoice</h1>
        </div>
      </nav>

      <div className="flex items-start pt-10 gap-0 flex-wrap px-0 w-full mx-auto container mx-auto">
        <div className="bg-[#020817] text-white border-solid w-[750px] px-5 py-5 rounded-lg border border-gray-600">
          <div className="flex items-center pb-5">
            <h1 className="text-2xl mr-4">Invoice</h1>
            <div className="rounded-full bg-[#1E293B] text-white text-base py-2 px-5">
              New Invoice
            </div>
          </div>
          <InvoiceForm
            ref={childRef}
            setFormData={setFormData}
            currencies={currencies}
            currenciesLoading={currenciesLoading}
            templates={templates}
            templatesLoading={templatesLoading}
            updateFormData={updateFormData}
          />
        </div>
        <div className="bg-[#020817] text-white w-[750px] border-solid rounded-lg border border-gray-600 h-[80rem]">
          <div className="p-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold leading-none tracking-tight mb-2">
                ACTIONS
              </h1>
              <p className="text-sm text-muted-foreground text-gray-400 ">
                Operations and preview
              </p>
            </div>

            <select
              className="bg-red-500 border-white border-1 h-10  bg-transparent w-[13rem] border-[#1E293B] border-solid outline-none mb-1 py-2 px-4 text-xs leading-5 focus:text-white block text-xs rounded border"
              value={selectedInvoice}
              onChange={(e) => handleTemplate(e.target.value)}
            >
              {invoicesLoading ? (
                <option>loading....</option>
              ) : (
                <>
                  <option value="" disabled>
                    Select template
                  </option>
                  {invoices.map((item: any, index: number) => (
                    <option key={index} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          {currenciesLoading && invoicesLoading ? (
            <div className="px-6">
              <Skeleton
                count={3}
                height={50}
                baseColor="#202020"
                highlightColor="#444"
              />
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-3 justify-center mt-5">
                <Button
                  title="Save Template"
                  handleAction={handleAction}
                  icon={<MdSaveAlt />}
                />

                <Button
                  title="Reset"
                  icon={<RxReset />}
                  handleAction={handleReset}
                />
              </div>

              <iframe
                srcDoc={srcDoc}
                className="w-full h-[80rem] mt-6 "
              ></iframe>
            </>
          )}
        </div>
      </div>

      <InvoiceModal
        open={open}
        close={() => setOpen(false)}
        invoiceData={selectedTemplates}
      />
    </>
  );
}
