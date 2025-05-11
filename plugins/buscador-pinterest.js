import cheerio from 'cheerio';
import axios from 'axios';

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('⚠️ Ingresa una palabra clave para buscar en Pinterest.');

  m.react('⏳');

  try {
    const url = 'https://www.pinterest.com/search/pins/?q=' + encodeURIComponent(text);
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const $ = cheerio.load(data);
    const urls = [];

    $('img[src^="https://i.pinimg.com/"]').each((i, el) => {
      let img = $(el).attr('src');
      if (img && !urls.includes(img)) urls.push(img);
    });

    if (!urls.length) return m.reply('❌ No se encontraron imágenes.');

    const resultados = urls.slice(0, 8); // máx 8 para evitar spam

    for (let i = 0; i < resultados.length; i++) {
      await conn.sendFile(m.chat, resultados[i], 'img.jpg', `🔎 *Pinterest resultado ${i + 1}*`, m);
      await new Promise(r => setTimeout(r, 400));
    }

    m.react('✅');

  } catch (e) {
    console.error(e);
    m.reply('❌ Error al buscar imágenes. Pinterest puede estar bloqueando la solicitud.');
  }
};

handler.command = ['pinterest', 'pin'];
handler.help = ['pinterest <texto>'];
handler.tags = ['buscador'];

export default handler;
