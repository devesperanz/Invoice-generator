import { NextResponse } from "next/server";

// Sample data to return
const invoice = {
  items: [
    {
      items: [
        {
          name: "coal",
          quantity: "2",
          rate: "5",
        },
        {
          name: "nffnnf",
          quantity: "1",
          rate: "4",
        },
      ],
      summary: {
        templateColor: "custom1",
        template: "template-id-1",
        fontStyle: "normal",
        note: "cool",
      },
      title: "Hope Template 1",
      billFrom: {
        name: "Hope Philip",
        email: "justhopephilip@gmail.com",
        phone: "09038845894",
        address: "Shomolu, Lagos",
        city: "Lagos",
        country: "Nigeria",
      },
      billTo: {
        name: "Hope Philip",
        email: "justhopephilip@gmail.com",
        phone: "09038845894",
        address: "12 Ibiyemi Street Palmgroove",
        city: "Lagos",
        country: "Nigeria",
      },
      details: {
        currency: "AZN",
        invoiceNumber: "29394849",
        issueDate: "2024-07-02",
        dueDate: "2024-07-14",
      },
      payment: {
        name: "Access Bank",
        accountName: "jod",
        accountNo: "12345495995",
      },
    },
  ],
};

export async function GET() {
  return NextResponse.json(invoice);
}

export async function POST(req: any) {
  try {
    const newInvoice = await req.json();
    invoice.items.push(newInvoice);
    console.log("Received POST data:", newInvoice);
    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to parse request body" },
      { status: 400 }
    );
  }
}
