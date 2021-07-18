interface ICustomerAPI {
  customer_id: number;
  customer_name: string;
  customer_region: string;
  invoices_count: number;
  total_margin: number;
  total_revenue: number;
}

interface IInvoiceLine {
  product_id: number;
  product_name: string;
  product_category: string;
  unit_price: number;
  quantity: number;
  total_line: number;
  total_margin: number;
}

interface IInvoice {
  id: number;
  customer_id: number;
  customer_name: string;
  date: string;
  invoice_lines: InvoiceLine[];
  total_invoice: number;
  total_margin: number;
  region: string;
}
