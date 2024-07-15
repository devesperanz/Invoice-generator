import { Dialog } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";

const InvoiceModal = ({ open, close, invoiceData }: any) => {
  if (!invoiceData) return null;

  const { items, summary, title, billFrom, billTo, details, payment } =
    invoiceData;

  return (
    <Dialog
      open={open}
      as="div"
      transition
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <img src={details?.file} alt="" />
            <div className="flex justify-end mb-2">
              <IoMdClose
                color="grey"
                size={24}
                onClick={close}
                className="cursor-pointer"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Invoice {details?.invoiceNumber} - {title}
            </h3>

            <div className="mb-4">
              <h4 className="text-md font-semibold text-gray-700">
                Bill From:
              </h4>
              <p className="text-sm text-gray-600">{billFrom?.name}</p>
              <p className="text-sm text-gray-600">{billFrom?.email}</p>
              <p className="text-sm text-gray-600">{billFrom?.phone}</p>
              <p className="text-sm text-gray-600">
                {billFrom?.address}, {billFrom?.city}, {billFrom?.country}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-md font-semibold text-gray-700">Bill To:</h4>
              <p className="text-sm text-gray-600">{billTo?.name}</p>
              <p className="text-sm text-gray-600">{billTo?.email}</p>
              <p className="text-sm text-gray-600">{billTo?.phone}</p>
              <p className="text-sm text-gray-600">
                {billTo?.address}, {billTo?.city}, {billTo?.country}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-md font-semibold text-gray-700">
                Invoice Details:
              </h4>
              <p className="text-sm text-gray-600">
                Currency: {details?.currency}
              </p>
              <p className="text-sm text-gray-600">
                Issue Date: {details?.issueDate}
              </p>
              <p className="text-sm text-gray-600">
                Due Date: {details?.dueDate}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-md font-semibold text-gray-700">Items:</h4>
              <ul className="list-none">
                {items?.map((item: any, index: any) => (
                  <li key={index} className="text-sm text-gray-600">
                    {item?.name} - Quantity: {item?.quantity}, Rate:{" "}
                    {item?.rate}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-md font-semibold text-gray-700">
                Payment Details:
              </h4>
              <p className="text-sm text-gray-600">Bank: {payment?.name}</p>
              <p className="text-sm text-gray-600">
                Account Name: {payment?.accountName}
              </p>
              <p className="text-sm text-gray-600">
                Account Number: {payment?.accountNo}
              </p>
            </div>

            {/* <div className="flex justify-end mt-4">
              <button
                className="inline-flex items-center gap-2 rounded-md bg-red-500 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600"
                onClick={() => {
                  close();
                }}
              >
                Delete
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default InvoiceModal;
