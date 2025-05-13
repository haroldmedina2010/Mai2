import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return m.reply(`✨ Ingresa un nombre para buscar en YouTube.\n\nEjemplo: *${usedPrefix + command} Shakira - Acróstico*`);

  try {
    await m.react("🕛");

    // Buscar video
    const searchRes = await fetch(`https://delirius-apiofc.vercel.app/search/ytsearch?q=${encodeURIComponent(text)}`);
    const searchJson = await searchRes.json();
    const video = searchJson?.data?.[0];
    if (!video) {
      await m.react("❌");
      return m.reply(`❌ No encontré resultados en YouTube para: *"${text}"*`);
    }

    const ytUrl = `https://www.youtube.com/watch?v=${video.videoId}`;

    // Mostrar información con imagen
    await conn.sendMessage(m.chat, {
      image: { url: video.image },
      caption: `
✦.──『 *YouTube Play* 』──.✦

𔖲𔖮𔖭 *Nombre:* ${video.title}
𔖲𔖮𔖭 *Autor:* ${video.author.name}
𔖲𔖮𔖭 *Duración:* ${video.duration}
𔖲𔖮𔖭 *Vistas:* ${video.views}
𔖲𔖮𔖭 *Url:* ${ytUrl}

☕ *Made By Wirk*
`.trim(),
      contextInfo: {
        forwardingScore: 0,
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

    // Descargar audio con nueva API
    const dlRes = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${encodeURIComponent(ytUrl)}`);
    const dlJson = await dlRes.json();

    const audioUrl = dlJson?.result?.download?.url || dlJson?.result?.url;
    if (!audioUrl) {
      await m.react("❌");
      return m.reply("❌ No se pudo obtener el enlace del audio.");
    }

    // Enviar el audio rápido como PTT
    await conn.sendMessage(m.chat, {
      audio: { url: audioUrl },
      mimetype: 'audio/mpeg',
      ptt: true,
      fileName: `🎵 ${video.title}.mp3`,
      contextInfo: {
        forwardingScore: 0,
        isForwarded: true
      }
    }, { quoted: m });

    await m.react("✅");

  } catch (e) {
    console.error(e);
    await m.react("❌");
    return m.reply(`❌ Error al procesar tu solicitud:\n${e.message}`);
  }
};

handler.command = ['play', 'playaudio', 'mp3'];
handler.help = ['play <texto>'];
handler.tags = ['media'];

export default handler;
