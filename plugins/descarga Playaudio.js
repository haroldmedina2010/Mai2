import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/;

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, '❗ Por favor, ingresa el nombre o enlace de la música a descargar.', m);
    }

    let videoIdMatch = text.match(youtubeRegexID);
    let ytResult = await yts(videoIdMatch ? `https://youtu.be/${videoIdMatch[1]}` : text);

    let videoInfo;
    if (videoIdMatch) {
      const videoId = videoIdMatch[1];
      videoInfo = ytResult.all.find(item => item.videoId === videoId) || ytResult.videos.find(item => item.videoId === videoId);
    } else {
      videoInfo = ytResult.videos[0];
    }

    if (!videoInfo) {
      return m.reply('✧ No se encontraron resultados para tu búsqueda.');
    }

    let { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;

    const vistas = formatViews(views);
    const canal = author?.name || 'Desconocido';

    const infoMessage = `*╭┈┈⊰ 𝖸𝗈𝗎𝖳𝗎𝖻𝖾 ▶️ ⊱┈┈╮*

┃ 🌸 *Título:* ${title}
┃ 🌼 *Canal:* ${canal}
┃ ✨ *Vistas:* ${vistas}
┃ ⏰ *Duración:* ${timestamp || 'Desconocido'}
┃ 🧁 *Publicado:* ${ago || 'Desconocido'}
┃ 🔗 *Enlace:* ${url}
╰┈┈┈♡ ⚘ Powered By Wirk ♡`;

    const thumb = (await conn.getFile(thumbnail)).data;

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: global.botname || "Bot",
          body: global.dev || "Desarrollado por Wirk",
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

    if (['play', 'mp3', 'ytmp3', 'playaudio'].includes(command)) {
      try {
        const api = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)).json();
        const audioUrl = api?.result?.download?.url;
        const audioTitle = api?.result?.title;

        if (!audioUrl) throw new Error('Enlace de audio no generado.');

        await conn.sendMessage(m.chat, {
          audio: { url: audioUrl },
          fileName: `${audioTitle}.mp3`,
          mimetype: 'audio/mpeg',
          ptt: true
        }, { quoted: m });
      } catch (e) {
        return conn.reply(m.chat, '⚠ No se pudo enviar el audio. Puede que sea muy pesado o la API falló.', m);
      }
    } else if (['play2', 'ytv', 'ytmp4', 'mp4'].includes(command)) {
      try {
        const response = await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`);
        const json = await response.json();

        await conn.sendFile(m.chat, json.data.url, `${json.title}.mp4`, title, m);
      } catch (e) {
        return conn.reply(m.chat, '⚠️ No fue posible enviar el video. Puede que sea muy pesado o la API falló.', m);
      }
    } else {
      return conn.reply(m.chat, '✧︎ Comando no reconocido.', m);
    }

  } catch (error) {
    return m.reply(`⚠︎ Ocurrió un error: ${error.message}`);
  }
};

handler.command = handler.help = ['play', 'mp3', 'ytmp3', 'playaudio', 'ytv', 'ytmp4', 'mp4'];
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
