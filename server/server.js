const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors'); // Importe o módulo cors

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors()); // Use o middleware cors para habilitar CORS

// Configuração do middleware de proxy
app.use('/api', createProxyMiddleware({
  target: 'https://inboxes.com',
  changeOrigin: true,
}));

// Exemplo de rota personalizada
app.get('/custom-route', (req, res) => {
  res.send('Resposta do servidor Express');
});

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});