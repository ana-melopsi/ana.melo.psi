const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
// Caminho literal da sua pasta no Windows
const publicPath = "C:\\Users\\troll\\OneDrive\\Documentos\\site_teste_ana\\public";

// Dados estruturados do consultório da Ana
const profileData = {
    name: "Ana Clara Tavares de Melo Rodrigues",
    professionalName: "Ana Melo",
    title: "Psicóloga Clínica",
    approach: "Perspectiva Psicanalítica",
    email: "anamelo5@outlook.com",
    whatsapp: "https://wa.me/12996198047",
    instagram: "https://www.instagram.com/ana.melopsi/",
    address: "R. Raul Rios, 200 - Parque Primavera, Cachoeira Paulista - SP, 12630-000",
    mapsLink: "https://maps.app.goo.gl/9ZpZ7",
    bio: "Atendimento clínico orientado pela perspectiva psicanalítica, com ênfase na escuta do sujeito, manejo da transferência e elaboração do sofrimento psíquico. Atuação voltada a crianças, adolescentes e adultos, acolhendo as demandas substituídas e os entraves estruturais na constituição psíquica.",
    specialties: [
        "Atendimento clínico a crianças, adolescentes e adultos, focado na elaboração do sofrimento psíquico.",
        "Psicologia escolar e educacional, atuando junto à comunidade escolar e famílias.",
        "Intervenção precoce e análise de risco para o desenvolvimento infantil."
    ]
};

const server = http.createServer((req, res) => {
    // Configura os cabeçalhos para evitar qualquer bloqueio de CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Rota da API de dados
    if (req.url === '/api/profile') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify(profileData));
    }

    // Tratamento de arquivos estáticos (HTML e Imagens)
    let filePath = path.join(publicPath, req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    if (extname === '.png') contentType = 'image/png';
    if (extname === '.jpg' || extname === '.jpeg') contentType = 'image/jpeg';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            // Se não achar o arquivo ou imagem, joga de volta para o index.html (padrão SPA)
            fs.readFile(path.join(publicPath, 'index.html'), (err, htmlContent) => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(htmlContent, 'utf-8');
            });
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(` Motor nativo rodando perfeitamente na porta ${PORT}!`);
    console.log(` Acesse o site no seu navegador: http://localhost:${PORT}`);
    console.log(`==================================================`);
});