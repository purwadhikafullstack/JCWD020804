import PDFDocument from 'pdfkit';
import fs from 'fs';

export const createPDF = (filename, transaction) => {
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(filename));

  doc.fontSize(25).fillColor('blue').text('Konfirmasi Booking', 100, 50);
  doc.fontSize(18).fillColor('black').text('Detail Pemesanan:', 100, 100);

  const detailsStartY = 130;
  doc.fontSize(12).fillColor('#333');
  doc.text(`Nama: ${transaction.User.name}`, 100, detailsStartY);
  doc.text(`Check-In: ${transaction.checkIn}`, 100, detailsStartY + 20);
  doc.text(`Check-Out: ${transaction.checkOut}`, 100, detailsStartY + 40);
  doc.text(`Hotel: ${transaction.Room.Property.name}`, 100, detailsStartY + 60);
  doc.text(`Kamar Hotel: ${transaction.Room.name}`, 100, detailsStartY + 80);

  doc
    .moveTo(50, 300)
    .lineTo(550, 300)
    .strokeColor('#666')
    .lineWidth(1)
    .stroke();

  doc
    .fontSize(14)
    .fillColor('black')
    .text('Informasi Check-in dan Check-out:', 100, 320);
  doc
    .fontSize(12)
    .fillColor('#333')
    .text('Check-in mulai pukul 14.00 WIB', 100, 340);
  doc.text('Check-out sebelum pukul 12.00 WIB', 100, 360);

  doc
    .fontSize(14)
    .fillColor('black')
    .text('Peraturan Selama Menginap:', 100, 390);
  doc.fontSize(12).fillColor('#333');
  const rules = [
    'Tidak diperbolehkan merokok di dalam kamar.',
    'Hewan peliharaan tidak diizinkan.',
    'Harap menjaga kebersihan dan ketenangan.',
  ];

  let currentY = 410;
  rules.forEach((rule) => {
    doc.text(`- ${rule}`, 100, currentY);
    currentY += 20;
  });

  doc
    .fontSize(10)
    .fillColor('grey')
    .text(
      'Terima kasih telah melakukan pemesanan dengan kami.',
      100,
      currentY + 20,
    );

  doc.end();
};
