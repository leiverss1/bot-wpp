const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const ID_INSTANCIA = "3E2929B6A512101409FA2A9B2850D0B6"; // Seu ID da Z-API
const TOKEN = "4AF3476D44BFDCC01B555BE6"; // Seu Token da Z-API

app.post("/webhook", async (req, res) => {
  const msg = req.body;
  console.log("Mensagem recebida:", msg);

  const texto = msg?.message?.text?.body;
  const telefone = msg?.message?.from;

  if (texto && telefone) {
    try {
      await axios.post(
        `https://api.z-api.io/instances/${ID_INSTANCIA}/token/${TOKEN}/send-text`,
        {
          phone: telefone,
          message: "Oi, eu sou a Dany 💁‍♀️! Como posso te ajudar com o SB2 hoje?"
        }
      );
    } catch (erro) {
      console.error("Erro ao responder:", erro.response?.data || erro.message);
    }
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 Dany está rodando no Glitch!"));
