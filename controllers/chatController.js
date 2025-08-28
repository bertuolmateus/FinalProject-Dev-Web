const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Array global para armazenar mensagens
let mensagens = [
  { usuario: 'Bot', texto: 'Olá! Como posso ajudar?', data: new Date() }
];

exports.getChatPage = (req, res) => {
  res.render('chat', { user: req.session.user, mensagens });
};

exports.enviarMensagem = (req, res) => {
  const { mensagem, etapa } = req.body;

  if (!mensagem || mensagem.trim() === '') {
    mensagens.push({
      usuario: 'Bot',
      texto: 'Por favor, digite uma mensagem válida.',
      data: new Date()
    });
    return res.redirect('/chat');
  }

  if (!req.session.nfe) req.session.nfe = {};

  if (etapa === 'inicial') {
    mensagens.push({ usuario: 'Bot', texto: 'Olá! Como posso ajudar?', data: new Date() });
  } 
  else if (etapa === 'apresentacao') {
    req.session.nfe.apresentacao = mensagem;
    mensagens.push({ usuario: req.session.user.nome, texto: mensagem, data: new Date() });
    mensagens.push({ usuario: 'Bot', texto: 'Certo, vamos emitir sua nota. Qual o seu CNPJ?', data: new Date() });
  } 
  else if (etapa === 'cnpjUsuario') {
    req.session.nfe.cnpjUsuario = mensagem;
    mensagens.push({ usuario: req.session.user.nome, texto: mensagem, data: new Date() });
    mensagens.push({ usuario: 'Bot', texto: 'Informe o nome/razão social do destinatário:', data: new Date() });
  } 
  else if (etapa === 'nomeDestinatario') {
    req.session.nfe.nomeDestinatario = mensagem;
    mensagens.push({ usuario: req.session.user.nome, texto: mensagem, data: new Date() });
    mensagens.push({ usuario: 'Bot', texto: 'Agora o endereço do destino:', data: new Date() });
  } 
  else if (etapa === 'enderecoDestinatario') {
    req.session.nfe.enderecoDestinatario = mensagem;
    mensagens.push({ usuario: req.session.user.nome, texto: mensagem, data: new Date() });
    mensagens.push({ usuario: 'Bot', texto: 'E o CNPJ do destinatário?', data: new Date() });
  } 
  else if (etapa === 'cnpjDestinatario') {
    req.session.nfe.cnpjDestinatario = mensagem;
    mensagens.push({ usuario: req.session.user.nome, texto: mensagem, data: new Date() });
    mensagens.push({ usuario: 'Bot', texto: 'Gerando NF-e...', data: new Date() });

    // Gerar PDF
    const doc = new PDFDocument();
    const pdfPath = path.join(__dirname, '../public/nfe.pdf');
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.fontSize(25).text('Nota Fiscal Eletrônica', { align: 'center' });
    doc.moveDown();
    doc.text(`Emitente: ${req.session.user.nome}`);
    doc.text(`CNPJ: ${req.session.nfe.cnpjUsuario}`);
    doc.moveDown();
    doc.text(`Destinatário: ${req.session.nfe.nomeDestinatario}`);
    doc.text(`CNPJ do destinatário: ${req.session.nfe.cnpjDestinatario}`);
    doc.text(`Endereço: ${req.session.nfe.enderecoDestinatario}`);
    doc.end();

    req.session.nfe = {}; 
    mensagens.push({ usuario: 'Bot', texto: 'NF-e gerada com sucesso!', data: new Date() });
    mensagens = []; // limpa as mensagens após gerar a NF-e
    return res.redirect('/chat');
  } 
  else {
    mensagens.push({ usuario: req.session.user.nome, texto: mensagem, data: new Date() });
    mensagens.push({ usuario: 'Bot', texto: 'Desculpe, não entendi. Por favor, tente novamente.', data: new Date() });
  }

  res.redirect('/chat');
};
