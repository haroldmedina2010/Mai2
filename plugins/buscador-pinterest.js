import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`✳️ Escribe lo que deseas buscar.\n\n📌 Ejemplo: ${usedPrefix + command} akame`);

  m.react('🖼️');

  try {
    const { data } = await axios.get(`https://api.dorrat.com/v2/pinterest?q=${encodeURIComponent(text)}`);
    
    if (!data.result || !Array.isArray(data.result) || data.result.length === 0)
      return m.reply('❌ No se encontraron resultados.');

    const imgUrl = data.result[Math.floor(Math.random() * data.result.length)];

    // Descargar la imagen como buffer
    const res = await axios.get(imgUrl, { responseType: 'arraybuffer' });

    await conn.sendMessage(m.chat, {
      image: Buffer.from(res.data),
      caption: `✨ *Resultado para:* _${text}_`
    }, { quoted: m });

    m.react('✅');

  } catch (err) {
    console.error(err);
    m.reply('⚠️ Ocurrió un error al obtener o enviar la imagen.');
  }
};

handler.command = ['pinterest', 'pin'];
handler.help = ['pinterest <texto>'];
handler.tags = ['buscador'];

export default handler;
