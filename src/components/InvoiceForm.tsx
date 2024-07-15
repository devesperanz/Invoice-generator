import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { debounce } from "lodash";
import FromAndTo from "./section/FromAndTo";
import InvoiceDetails from "./section/InvoiceDetails";
import LineItems from "./section/LineItems";
import PaymentInfo from "./section/PaymentInfo";
import Summary from "./section/Summary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation schema
const schema = yup.object().shape({
  title: yup.string().required("This field is required"),
  billFrom: yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email address is required"),
    name: yup.string().required("This field is required"),
    city: yup.string().required("This field is required"),
    address: yup.string().required("This field is required"),
    country: yup.string().required("This field is required"),
    phone: yup.string().required("This field is required"),
  }),
  billTo: yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email address is required"),
    name: yup.string().required("This field is required"),
    city: yup.string().required("This field is required"),
    address: yup.string().required("This field is required"),
    country: yup.string().required("This field is required"),
    phone: yup.string().required("This field is required"),
  }),
  details: yup.object().shape({
    file: yup.string().required("A file is required"),
    invoiceNumber: yup.string().required("This field is required"),
    dueDate: yup.string().required("This field is required"),
    currency: yup.string().required("This field is required"),
    issueDate: yup.string().required("This field is required"),
  }),
  items: yup.array().of(
    yup.object().shape({
      name: yup.string().required("This field is required"),
      quantity: yup
        .number()
        .required("This field is required")
        .positive("value must be a positive number")
        .integer("value must be an integer"),
      rate: yup
        .number()
        .required("This field is required")
        .positive("value must be a positive number"),
    })
  ),
  summary: yup.object().shape({
    template: yup.string(),
    templateColor: yup.string(),
    note: yup.string().required("This field is required"),
    fontStyle: yup.string(),
    textColor: yup.string(),
  }),
  payment: yup.object().shape({
    name: yup.string().required("This field is required"),
    accountName: yup.string().required("This field is required"),
    accountNo: yup.string().required("This field is required"),
  }),
});

const InvoiceForm = forwardRef(
  (
    {
      setFormData,
      updateFormData,
      currencies,
      currenciesLoading,
      templates,
      templatesLoading,
      resetForm,
    }: any,
    ref
  ) => {
    const {
      register,
      handleSubmit,
      watch,
      setValue,
      setError,
      clearErrors,
      control,
      formState: { errors, isValid },
      reset,
    } = useForm({
      resolver: yupResolver(schema),
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: {
        items: [{ name: "", quantity: 0, rate: 0 }],
        summary: {
          templateColor: "transparent",
          template: "template-id-1",
          note: "",
          textColor: "#000000",
        },
        details: { file: null, currency: "" } as any,
        title: "",
        billFrom: {
          name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          country: "",
        },
        billTo: {
          name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          country: "",
        },
      },
    });

    const { fields, append, remove } = useFieldArray({
      control,
      name: "items",
    });
    const watchedFields = watch();
    const debouncedSetFormData = useCallback(debounce(setFormData, 300), []);

    useEffect(() => {
      debouncedSetFormData(watchedFields);
      return () => debouncedSetFormData.cancel();
    }, [watchedFields, debouncedSetFormData]);

    const tabs = [
      "From & To",
      "Invoice Details",
      "Line items",
      "Payment Info",
      "Summary",
    ];
    const [selectedItem, setSelectedItem] = useState(tabs[0] as string);

    const onSubmit = (data: any) => {
      if (isValid) {
        updateFormData(data);
        toast.success("Form submitted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        reset();
        setSelectedItem("From & To");
      }
    };

    useEffect(() => {
      if (currencies && Object.keys(currencies).length > 0) {
        const firstCurrencyCode = Object.keys(currencies)[0];
        const firstTemplatesCode = templates[0]?.Id;
        setValue("details.currency", firstCurrencyCode);
        setValue("summary.template", firstTemplatesCode);
      }
    }, [currencies, setValue, templates]);

    useImperativeHandle(ref, () => ({
      childMethod() {
        handleSubmit(onSubmit)();
        if (!isValid) {
          toast.error("Please fill out all required fields correctly.");
        }
      },
      resetMethod() {
        reset();
        setSelectedItem("From & To");
      },
    }));

    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className="flex flex-wrap flex-row items-center gap-x-3 mb-4">
          {tabs.map((item) => (
            <div key={item}>
              <button
                onClick={() => setSelectedItem(item)}
                className={`${
                  selectedItem === item && "bg-white text-black"
                } inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-auto`}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
        {selectedItem === "From & To" && (
          <FromAndTo
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
          />
        )}
        {selectedItem === "Invoice Details" && (
          <div className="mt-10 mb-4">
            <h1 className="mb-4 font-semibold text-xl">Invoice Details</h1>
            <InvoiceDetails
              handleSubmit={handleSubmit(onSubmit)}
              register={register}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              currencies={currencies}
              currenciesLoader={currenciesLoading}
              errors={errors}
            />
          </div>
        )}
        {selectedItem === "Line items" && (
          <div className="mt-10 mb-4">
            <h1 className="mb-4 font-semibold text-xl">Line Items</h1>
            <LineItems
              register={register}
              errors={errors}
              data={watchedFields}
              currencies={currencies}
              append={append}
              remove={remove}
            />
          </div>
        )}
        {selectedItem === "Payment Info" && (
          <div className="mt-10 mb-4">
            <h1 className="mb-4 font-semibold text-xl">Payment Info</h1>
            <PaymentInfo register={register} errors={errors} />
          </div>
        )}
        {selectedItem === "Summary" && (
          <div className="mt-10 mb-4">
            <h1 className="mb-4 font-semibold text-xl">Summary</h1>
            <Summary
              register={register}
              errors={errors}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              templates={templates}
              templatesLoading={templatesLoading}
            />
          </div>
        )}
        <div className="flex justify-end">
          {selectedItem !== "From & To" && (
            <button
              onClick={() =>
                setSelectedItem(tabs[tabs.indexOf(selectedItem) - 1])
              }
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-auto mr-2"
            >
              Back
            </button>
          )}
          {selectedItem !== "Summary" && (
            <button
              onClick={() =>
                setSelectedItem(tabs[tabs.indexOf(selectedItem) + 1])
              }
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-auto"
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  }
);

export default InvoiceForm;
