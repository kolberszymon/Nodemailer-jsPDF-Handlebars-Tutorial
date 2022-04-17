const { jsPDF } = require("jspdf");
const QRCode = require("qrcode");

// Creating a document
const pdf = new jsPDF({
  orientation: "portrait", // should it be portrait or landscape?
  unit: "cm", // unit of measure while adding stuff
  format: "a4", // format can be string or array [x, y] in above units
});

const createPDF = async () => {
  // Create qrCode
  let qrCode = await QRCode.toDataURL("qrcode data");

  // Inserting text
  pdf.setTextColor(114, 213, 231);
  pdf.setFontSize(50);
  pdf.text("Ticket", 1.5, 3.5);

  // Inserting qrCode
  pdf.addImage(qrCode, "JPEG", 14, 1, 5, 5);

  // Adding lines
  pdf.setLineWidth(0.05);
  pdf.line(9, 7, 9, 27);
  pdf.line(1, 14, 20, 14);

  // Adding informations
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(25);
  pdf.text("Order Date", 12, 10);
  pdf.setFontSize(18);
  pdf.text("20.05.2022", 12, 11);

  const pdfOutput = pdf.output("datauristring");

  return pdfOutput;
};

createPDF();

module.exports = { createPDF };
