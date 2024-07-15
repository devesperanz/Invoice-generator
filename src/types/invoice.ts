export type InvoicePayloadType = {
  items: Array<{
    name: string;
    quantity: string;
    rate: string;
  }>;
  summary: {
    templateColor: string;
    template: string;
    fontStyle: string;
    note: string;
    textColor?: string;
  };
  title: string;
  billFrom: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
  billTo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
  details: {
    currency: string;
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    file: string;
  };
  payment: {
    name: string;
    accountName: string;
    accountNo: string;
  };
};

export const createInvoiceHTML = (invoiceData: any) => {
  const itemsHTML = invoiceData?.items
    ?.map(
      (item: any) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align:center">${
        item.name
      }</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align:center">${
        item.quantity
      }</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align:center">${
        item.rate
      }</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align:center">${
        item.quantity * item.rate
      }</td>
    </tr>
  `
    )
    .join("");

  const totalAmount = invoiceData?.items?.reduce(
    (acc: any, item: any) => acc + item.quantity * item.rate,
    0
  );

  const invoiceHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice</title>
    </head>
    <body style="font-family: Arial, sans-serif; padding: 20px;">
      <div style="margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="padding: 8px; background-color: #f2f2f2; border-bottom: 1px solid #ddd; text-align:center">Item</th>
              <th style="padding: 8px; background-color: #f2f2f2; border-bottom: 1px solid #ddd;  text-align:center">Quantity</th>
              <th style="padding: 8px; background-color: #f2f2f2; border-bottom: 1px solid #ddd;  text-align:center">Rate</th>
              <th style="padding: 8px; background-color: #f2f2f2; border-bottom: 1px solid #ddd;  text-align:center">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="text-align: right; padding: 8px;">Total Amount:</td>
              <td style="padding: 8px;">${totalAmount}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 18px; color: #ff69b4;">Terms and Conditions</h2>
        <p>This invoice is due on ${
          invoiceData?.details?.dueDate ? invoiceData?.details?.dueDate : "N/A"
        } from the issue date: ${
    invoiceData?.details?.issueDate ? invoiceData?.details?.issueDate : "N/A"
  } .</p>
        <p style="font-style: ${
          invoiceData?.summary?.fontStyle
        };">Payment should be made in ${invoiceData?.details?.currency}.</p>
      </div>

      <div style="margin-top: 40px;">
        <div style="display: inline-block; width: 49%; vertical-align: top;">
          <h3 style="font-size: 16px;">Bill From:</h3>
          <p>${
            invoiceData?.billFrom?.name ? invoiceData?.billFrom?.name : "N/A"
          }</p>
          <p>${
            invoiceData?.billFrom?.address
              ? invoiceData?.billFrom?.address
              : "N/A"
          }, ${
    invoiceData?.billFrom?.city ? invoiceData?.billFrom?.city : "N/A"
  }, ${
    invoiceData?.billFrom?.country ? invoiceData?.billFrom?.country : "N/A"
  }</p>
          <p>Email: ${
            invoiceData?.billFrom?.email ? invoiceData?.billFrom?.email : "N/A"
          }</p>
          <p>Phone: ${
            invoiceData?.billFrom?.phone ? invoiceData?.billFrom?.phone : "N/A"
          }</p>
        </div>
        <div style="display: inline-block; width: 49%; vertical-align: top;">
          <h3 style="font-size: 16px;">Bill To:</h3>
          <p>${
            invoiceData?.billTo?.name ? invoiceData?.billTo?.name : "N/A"
          }</p>
          <p>${
            invoiceData?.billTo?.address ? invoiceData?.billTo?.address : "N/A"
          }, ${invoiceData?.billTo?.city}, ${
    invoiceData?.billTo?.country ? invoiceData?.billTo?.country : "N/A"
  }
          </p>
          <p>Email: ${
            invoiceData?.billTo?.email ? invoiceData?.billTo?.email : "N/A"
          }</p>
          <p>Phone: ${
            invoiceData?.billTo?.phone ? invoiceData?.billTo?.phone : "N/A"
          }</p>
        </div>
      </div>

      <div style="margin-top: 40px;">
        <h3 style="font-size: 16px;">Payment Details:</h3>
        <p>Payment Method: ${
          invoiceData?.payment?.name ? invoiceData?.payment?.name : "N/A"
        }</p>
        <p>Account Name: ${
          invoiceData?.payment?.accountName
            ? invoiceData?.payment?.accountName
            : "N/A"
        }</p>
        <p>Account Number: ${
          invoiceData?.payment?.accountNo
            ? invoiceData?.payment?.accountNo
            : "N/A"
        }</p>
      </div>

      <div style="margin-top: 40px;">
          <p>Please take note: ${
            invoiceData?.summary?.note
              ? invoiceData?.summary?.note
              : "Note here"
          }</p>
      </div>
    </body>
    </html>
  `;

  return invoiceHTML;
};
