import axios from 'axios';

let handler = async (m, { conn, text, args }) => {
  try {
    if (!text) return conn.reply(m.chat, `❀ Ejemplo: .ytvdoc https://youtube.com/watch?v=Hx920thF8X4`, m);

    if (!/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(args[0])) {
      return conn.reply(m.chat, `⚠️ Link inválido. Asegúrate de que sea de YouTube.`, m);
    }

    m.react('🌿');

    // Llamada a la API SiputZX para obtener el enlace de descarga
    const { data } = await axios.get(`https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(text)}`);
    if (!data || !data.status || data.status !== "success") throw 'No se pudo obtener el video desde la API.';

    const videoUrl = data.result.url; // URL del video descargable

    // Obtener tamaño del video
    const size = await getSize(videoUrl);
    const maxSize = 1_073_741_824; // 1 GB máximo

    if (size && size > maxSize) {
      return conn.reply(m.chat, `⛔ El video pesa más de 1 GB (${await formatSize(size)}). Intenta con uno más ligero.`, m);
    }

    // Crear mensaje de respuesta
    const caption = `*「🌱 Video Descargado」*

❐ *Título:* ${data.result.title}
❐ *Duración:* ${data.result.duration}
❐ *Tamaño estimado:* ${await formatSize(size)}
❐ *Canal:* ${data.result.channel}
❐ *URL:* ${text}

_Enviado con ternura por Mai ッ_`;

    // Descargar el video
    const { data: stream } = await axios.get(videoUrl, { responseType: 'stream' });

    // Enviar el video como documento
    await conn.sendMessage(m.chat, {
      document: stream,
      fileName: `${data.result.title}.mp4`,
      mimetype: 'video/mp4',
      caption
    }, { quoted: m });

    m.react('✅');

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, `❌ Error al descargar:\n${e}`, m);
  }
};
handler.help = ['ytvdoc'];
handler.command = ['ytvdoc', 'ytmp4doc'];
handler.tags = ['downloader'];
handler.diamond = true;

export default handler;

// Función para obtener tamaño del archivo
async function getSize(url) {
  let { headers } = await axios.head(url);
  return headers['content-length'] ? parseInt(headers['content-length']) : null;
}

// Función para formatear tamaño
function formatSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}
