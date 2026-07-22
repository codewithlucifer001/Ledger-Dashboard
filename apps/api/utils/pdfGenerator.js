const PDFDocument = require('pdfkit');

exports.generateInvoicePDF = (invoice, client, user, stream) => {
  const doc = new PDFDocument({ margin: 50 });

  doc.pipe(stream);

  // Header
  doc.fontSize(20).text(user.businessName || user.name, { align: 'left' });
  doc.fontSize(10).text(`Invoice #: ${invoice.invoiceNumber}`, { align: 'right' });
  doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, { align: 'right' });
  doc.moveDown();

  // Client Details
  doc.fontSize(12).text(`Billed To: ${client.name}`);
  if (client.company) doc.text(client.company);
  doc.text(client.email);
  doc.moveDown();

  // Table Headers
  doc.fontSize(10).text('Description', 50, doc.y, { width: 250 });
  doc.text('Qty/Hrs', 300, doc.y, { width: 70, align: 'right' });
  doc.text('Unit Price', 370, doc.y, { width: 70, align: 'right' });
  doc.text('Total', 440, doc.y, { width: 70, align: 'right' });
  doc.moveDown();

  // Items
  invoice.items.forEach((item) => {
    const itemTotal = item.hoursOrQty * item.unitPrice;
    doc.text(item.description, 50, doc.y, { width: 250 });
    doc.text(item.hoursOrQty.toString(), 300, doc.y, { width: 70, align: 'right' });
    doc.text(`$${item.unitPrice.toFixed(2)}`, 370, doc.y, { width: 70, align: 'right' });
    doc.text(`$${itemTotal.toFixed(2)}`, 440, doc.y, { width: 70, align: 'right' });
    doc.moveDown(0.5);
  });

  doc.moveDown();
  doc.fontSize(12).text(`Total Amount: $${invoice.totalAmount.toFixed(2)}`, { align: 'right' });

  doc.end();
};