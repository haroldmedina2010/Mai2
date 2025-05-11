import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`✳️ Escribe lo que deseas buscar.\n\n📌 Ejemplo: ${usedPrefix + command} akame`);

  m.react('🔍');

  try {
    const { data } = await axios.get(`https://api.dorrat.com/v2/pinterest?q=${encodeURIComponent(text)}`);
    
    if (!data.result || !Array.isArray(data.result) || data.result.length === 0)
      return m.reply('❌ No se encontraron resultados.');

    const url = data.result[Math.floor(Math.random() * data.result.length)];

    await conn.sendMessage(m.chat, {
      image: { url },
      caption: `✨ *Resultado de:* _${text}_`
    }, { quoted: m });

    m.react('✅');

  } catch (e) {
    console.error(e);
    m.reply('⚠️ Ocurrió un error al obtener la imagen.');
  }
};

handler.command = ['pinterest', 'pin'];
handler.help = ['pinterest <texto>'];
handler.tags = ['buscador'];

export default handler;
