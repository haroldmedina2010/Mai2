import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const youtubeRegexID = /(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/;

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, 'Por favor, ingresa el nombre de la música a descargar.', m);
    }

    let videoIdToFind = text.match(youtubeRegexID) || null;
    let ytplay2 = await yts(videoIdToFind === null ? text : 'https://youtu.be/' + videoIdToFind[1]);

    if (videoIdToFind) {
      const videoId = videoIdToFind[1];
      ytplay2 = ytplay2.all.find(item => item.videoId === videoId) || ytplay2.videos.find(item => item.videoId === videoId);
    }
    ytplay2 = ytplay2.all?.[0] || ytplay2.videos?.[0] || ytplay2;

    if (!ytplay2 || ytplay2.length == 0) {
      return m.reply('✧ No se encontraron resultados para tu búsqueda.');
    }

    let { title, thumbnail, timestamp, views, ago, url, author } = ytplay2;
    title = title || 'no encontrado';
    thumbnail = thumbnail || 'no encontrado';
    timestamp = timestamp || 'no encontrado';
    views = views || 'no encontrado';
    ago = ago || 'no encontrado';
    url = url || 'no encontrado';
    author = author || 'no encontrado';

    const vistas = formatViews(views);
    const canal = author.name ? author.name : 'Desconocido';

    const infoMessage = `*╭┈┈⊰ 𝖸𝗈𝗎𝖳𝗎𝖻𝖾 ▶️ ⊱┈┈╮*
┃ *🌸 Título:* ${title}
┃ *🌼 Canal:* ${canal}
┃ *✨ Vistas:* ${vistas}
┃ *⏰ Duración:* ${timestamp}
┃ *🧁 Publicado:* ${ago}
┃ *🔗 Enlace:* ${url}
*╰┈┈┈♡ ⚘ 𝖯𝗈𝗐𝖾𝗋𝖾𝖽 𝖡𝗒 𝖶𝗂𝗋𝗄 ♡*`;

    const thumb = (await conn.getFile(thumbnail))?.data;

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: botname,
          body: dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: "https://chat.whatsapp.com/GHhOeix2sTY32wIO85pNgd",
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    };

    await conn.reply(m.chat, infoMessage, m, JT);

    if (command === 'play' || command === 'mp3' || command === 'ytmp3' || command === 'playaudio') {
      try {
        const api = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)).json();
        const result = api.result.download.url;

        if (!result) throw new Error('⚠ El enlace de audio no se generó correctamente.');

        await conn.sendMessage(m.chat, {
          audio: { url: result },
          fileName: `${api.result.title}.mp3`,
          mimetype: 'audio/mpeg',
          ptt: true
        }, { quoted: m });
      } catch (e) {
        return conn.reply(m.chat, '⚠︎ No se pudo enviar el audio. Intenta más tarde.', m);
      }
    } else if (command === 'play2' || command === 'ytv' || command === 'ytmp4' || command === 'mp4') {
      try {
        const res = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`);
        const json = await res.json();
        if (!json || !json.result?.url) throw new Error('Error en la API de video');

        await conn.sendFile(m.chat, json.result.url, `${title}.mp4`, title, m);
      } catch (e) {
        return conn.reply(m.chat, '⚠️ No fue posible enviar el video. Intenta más tarde.', m);
      }
    } else {
      return conn.reply(m.chat, '✧︎ Comando no reconocido.', m);
    }
  } catch (error) {
    return m.reply(`⚠︎ Ocurrió un error: ${error}`);
  }
};

handler.command = handler.help = ['play', 'mp3', 'ytmp3', 'playaudio', 'ytmp4'];
handler.tags = ['descargas'];
handler.group = false;

export default handler;

function formatViews(views) {
  if (views === undefined) return "No disponible";
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`;
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`;
  return views.toString();
}
