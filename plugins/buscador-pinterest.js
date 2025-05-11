import axios from 'axios';

async function sendAlbumMessage(conn, jid, medias, options = {}) {
  if (!Array.isArray(medias) || medias.length < 2) throw new Error("Se necesitan mínimo 2 imágenes para crear un álbum");

  const caption = options.caption || '';
  const quoted = options.quoted;

  for (let i = 0; i < medias.length; i++) {
    const media = medias[i];
    await conn.sendMessage(jid, {
      image: { url: media },
      caption: i === 0 ? caption : null
    }, { quoted });
    await new Promise(res => setTimeout(res, 600)); // pequeña pausa
  }
}

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('*[ ⚠️ ] Ingresa una palabra para buscar en Pinterest*\n\nEj: .pinterest anime');

  try {
    m.react('⏳');
    const res = await axios.get(`https://api.dorratz.com/v2/pinterest?q=${encodeURIComponent(text)}`);
    const result = res.data.result;

    if (!result || result.length < 2) {
      return conn.reply(m.chat, `No se encontraron suficientes resultados para: "${text}".`, m);
    }

    const medias = result.slice(0, 10); // Máximo 10 imágenes
    await sendAlbumMessage(conn, m.chat, medias, {
      caption: `◜ Pinterest Search ◞\n\n🔎 *Búsqueda:* "${text}"\n📷 *Resultados:* ${medias.length}`,
      quoted: m
    });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (e) {
    console.error(e);
    m.reply('*[ ❌ ] Error al buscar en Pinterest.*');
  }
};

handler.command = ['pinterest', 'pin', 'interest'];
handler.help = ['pinterest <texto>'];
handler.tags = ['buscador'];

export default handler;
