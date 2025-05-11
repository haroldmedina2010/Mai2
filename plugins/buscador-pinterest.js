import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`✳️ Ingresa una palabra clave para buscar.\n\n📌 Ejemplo: ${usedPrefix + command} anime`);
  }

  m.react('🔎');

  try {
    const res = await axios.get(`https://api.dorrat.com/v2/pinterest?q=${encodeURIComponent(text)}`);
    const results = res.data.result;

    if (!results || !results.length) {
      return m.reply('❌ No se encontraron resultados en Pinterest.');
    }

    const img = results[Math.floor(Math.random() * results.length)];

    await conn.sendFile(m.chat, img, 'pinterest.jpg', `✅ *Resultado para:* _${text}_`, m);
    m.react('✅');

  } catch (e) {
    console.error(e);
    m.reply('❌ Hubo un error al obtener resultados de Pinterest.\nEs posible que la API esté fallando.');
  }
};

handler.command = ['pinterest', 'pin'];
handler.help = ['pinterest <texto>'];
handler.tags = ['buscador'];

export default handler;
