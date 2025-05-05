import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CartItem } from '../types';

export const generatePDF = (items: CartItem[]): void => {
  const doc = new jsPDF();
  
  // Set document properties
  doc.setProperties({
    title: 'Stationery Shop Order Summary',
    subject: 'Stationery Items Order',
    author: 'StationeryShop',
    creator: 'StationeryShop Web App'
  });
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(33, 37, 41);
  doc.text('StationeryShop Order Summary', 14, 22);
  
  // Add date
  doc.setFontSize(10);
  doc.setTextColor(108, 117, 125);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
  
  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Prepare data for table
  const tableData = items.map(item => [
    item.name,
    item.category,
    `$${item.price.toFixed(2)}`,
    item.quantity,
    `$${(item.price * item.quantity).toFixed(2)}`
  ]);
  
  // Add table
  autoTable(doc, {
    head: [['Item', 'Category', 'Price', 'Quantity', 'Total']],
    body: tableData,
    theme: 'striped',
    startY: 40,
    headStyles: {
      fillColor: [59, 130, 246], // Blue color
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [243, 244, 246], // Light gray
    },
    footStyles: {
      fillColor: [243, 244, 246],
      textColor: 33,
      fontStyle: 'bold',
    },
    foot: [
      ['', '', '', `Total Items: ${totalItems}`, `Subtotal: $${subtotal.toFixed(2)}`]
    ],
    margin: { top: 35, right: 14, bottom: 20, left: 14 },
    styles: {
      font: 'helvetica',
      overflow: 'linebreak',
      cellPadding: 4,
    },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 40 },
      2: { cellWidth: 30, halign: 'right' },
      3: { cellWidth: 30, halign: 'center' },
      4: { cellWidth: 30, halign: 'right' },
    },
  });

  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text('Thank you for shopping with StationeryShop!', 14, doc.internal.pageSize.height - 15);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 15);
  }
  
  // Save or open the PDF
  doc.save('stationery-shop-order.pdf');
};