import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return m.reply(`✨ Ingresa un nombre para buscar en YouTube.\n\nEjemplo: *${usedPrefix + command} Shakira - Acróstico*`);

  try {
    await m.react("🔍");

    const searchApi = `https://delirius-apiofc.vercel.app/search/ytsearch?q=${encodeURIComponent(text)}`;
    const searchResponse = await fetch(searchApi);
    const searchData = await searchResponse.json();

    if (!searchData?.data || searchData.data.length === 0) {
      await m.react("❌");
      return m.reply(`❌ No encontré resultados en YouTube para: *"${text}"*`);
    }

    const video = searchData.data[0];
    const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}`;

    const infoMessage = `
✦.──『 *YouTube Play* 』──.✦

𔖲𔖮𔖭 *Nombre:* ${video.title}
𔖲𔖮𔖭 *Autor:* ${video.author.name}
𔖲𔖮𔖭 *Duración:* ${video.duration}
𔖲𔖮𔖭 *Vistas:* ${video.views}
𔖲𔖮𔖭 *Url:* ${videoUrl}

☁️ *Espera un momento mientras preparo tu audio...*

☕ *Made By Wirk*
`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: video.image },
      caption: infoMessage,
      contextInfo: {
        forwardingScore: 999999999,
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

    // Descargar con la nueva API más rápida
    const dlApi = `https://api.vreden.my.id/api/ytmp3?url=${encodeURIComponent(videoUrl)}`;
    const dlRes = await fetch(dlApi);
    const dlJson = await dlRes.json();

    if (!dlJson?.result?.url) {
      await m.react("❌");
      return m.reply("⚠️ No se pudo obtener el audio del video.");
    }

    await conn.sendMessage(m.chat, {
      audio: { url: dlJson.result.url },
      mimetype: 'audio/mpeg',
      ptt: true,
      fileName: `🎵 ${video.title}.mp3`,
      contextInfo: {
        forwardingScore: 9999999,
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

handler.command = ['play', 'playaudio', 'mp3'];
handler.help = ['play <texto>', 'playaudio <texto>'];
handler.tags = ['media'];

export default handler;
