import { useEffect, useState } from "react";
import { InvoicePayloadType } from "@/types/invoice";

// Variables
export const INVOICES_API = `${process.env.NEXT_PUBLIC_URL}/api/settings`;

// Type for the fetched data structure
export type InvoicesResponseType = {
  items: any[];
  Metadata: {
    Timestamp: string;
    CorrelationId: string;
    ProcessedBy: string;
  };
};

const useInvoices = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [invoicesLoading, setInvoicesLoading] = useState<boolean>(false);

  /**
   * Fetches all the invoices asynchronously.
   *
   * @return {Promise<void>} Promise that resolves when the invoices are fetched.
   */
  const fetchInvoices = async () => {
    setInvoicesLoading(true);
    try {
      const response = await fetch(`${INVOICES_API}`);
      const data: InvoicesResponseType = await response.json();
      setInvoices(data.items);
    } catch (err) {
      console.log(err);
    } finally {
      setInvoicesLoading(false);
    }
  };

  /**
   * Saves an invoice asynchronously.
   *
   * @param {InvoicePayloadType} payload - The payload of the invoice to be saved.
   * @return {Promise<void>} Promise that resolves when the invoice is saved.
   */
  const saveInvoice = async (payload: InvoicePayloadType) => {
    setInvoicesLoading(true);
    try {
      const response = await fetch(INVOICES_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setInvoices((prevInvoices) => [...prevInvoices, data]);
    } catch (err) {
      console.log("POST error:", err);
    } finally {
      setInvoicesLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return { invoices, invoicesLoading, saveInvoice };
};

export default useInvoices;
