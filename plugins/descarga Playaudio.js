import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return m.reply(`✨ Ingresa un nombre para buscar en YouTube.\n\nEjemplo: *${usedPrefix + command} Shakira - Acróstico*`);

  try {
    await m.react("🔍"); // Reacción inicial

    // Paso 1: Buscar el video
    const searchApi = `https://delirius-apiofc.vercel.app/search/ytsearch?q=${encodeURIComponent(text)}`;
    const searchResponse = await fetch(searchApi);
    const searchData = await searchResponse.json();

    if (!searchData?.data || searchData.data.length === 0) {
      await m.react("❌");
      return m.reply(`❌ No encontré resultados en YouTube para: *"${text}"*`);
    }

    const video = searchData.data[0]; // Primer resultado

    // Mensaje decorado
    const infoMessage = `
✦.──『 *YouTube Play* 』──.✦

𔖲𔖮𔖭 *Nombre:* ${video.title}
𔖲𔖮𔖭 *Autor:* ${video.author.name}
𔖲𔖮𔖭 *Duración:* ${video.duration}
𔖲𔖮𔖭 *Vistas:* ${video.views}
𔖲𔖮𔖭 *Url:* ${video.url || `https://www.youtube.com/watch?v=${video.videoId}`}

☁️ *Espera un momento mientras preparo tu audio...*

☕ *Made By Wirk*
`.trim();

    // Enviar miniatura con el mensaje decorado
    await conn.sendMessage(m.chat, {
      image: { url: video.image },
      caption: infoMessage,
      contextInfo: {
        forwardingScore: 9999999999,
        isForwarded: true,
        externalAdReply: {
          title: "☕ Mai Bot 🪴",
          body: "💚 Dev 𝖡𝗒 𝖶𝗂𝗋𝗄 🌺",
          thumbnailUrl: video.image,
          mediaUrl: "https://chat.whatsapp.com/KqkJwla1aq1LgaPiuFFtEY",
          mediaType: 2,
          showAdAttribution: true,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    // Paso 2: Descargar el audio
    const downloadApi = `https://api.vreden.my.id/api/ytplaymp3?query=${encodeURIComponent(video.title)}`;
    const downloadResponse = await fetch(downloadApi);
    const downloadData = await downloadResponse.json();

    if (!downloadData?.result?.download?.url) {
      await m.react("❌");
      if (downloadData?.result?.msg) {
        return m.reply(`⚠️ No se pudo obtener el audio:\n${downloadData.result.msg}`);
      }
      return m.reply("⚠️ No se pudo obtener el audio del video.");
    }

    const audioUrl = downloadData.result.download.url;

    await conn.sendMessage(m.chat, {
      audio: { url: audioUrl },
      mimetype: 'audio/mpeg',
      ptt: true,
      fileName: `🎵 ${video.title}.mp3`,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true
      }
    }, { quoted: m });

    await m.react("✅");

  } catch (error) {
    console.error(error);
    await m.react("❌");
    return m.reply(`❌ Error al procesar tu solicitud:\n${error.message}`);
  }
};

// Menú con botones para elegir entre audio o video
handler.command = ['play', 'playaudio', 'mp3'];
handler.help = ['play <texto>', 'playaudio <texto>'];
handler.tags = ['media'];

export default handler;
