const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

exports.getForm = (req, res) => {
  res.render('nfeForm', { user: req.session.user });
};

exports.postForm = (req, res) => {
  const { cnpjEmitente, nomeDestinatario, cnpjDestinatario, endereco } = req.body;

  const doc = new PDFDocument();
  const pdfPath = path.join(__dirname, '../public/nfe.pdf');
  const writeStream = fs.createWriteStream(pdfPath);
  doc.pipe(writeStream);

  doc.pipe(fs.createWriteStream(pdfPath));
  doc.fontSize(20).text('Nota Fiscal Eletrônica', { align: 'center' });
  doc.moveDown();
  doc.text(`Emitente: ${req.session.user.nome}`);
  doc.text(`CNPJ Emitente: ${cnpjEmitente}`);
  doc.moveDown();
  doc.text(`Destinatário: ${nomeDestinatario}`);
  doc.text(`CNPJ Destinatário: ${cnpjDestinatario}`);
  doc.text(`Endereço: ${endereco}`);
  doc.moveDown();
  doc.text(`Data de Emissão: ${new Date().toLocaleString()}`);
  doc.end();
  
  writeStream.on('finish', () => {
    res.download(pdfPath, 'nfe.pdf');
  });
};
