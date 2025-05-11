// Créditos Del Código A FzTeis

import axios from 'axios';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(jid, medias, options = {}) {
  if (typeof jid !== "string") {
    throw new TypeError(`jid must be string, received: ${jid} (${jid?.constructor?.name})`);
  }

  for (const media of medias) {
    if (!media.type || (media.type !== "image" && media.type !== "video")) {
      throw new TypeError(`media.type must be "image" or "video", received: ${media.type} (${media.type?.constructor?.name})`);
    }
    if (!media.data || (!media.data.url && !Buffer.isBuffer(media.data))) {
      throw new TypeError(`media.data must be object with url or buffer, received: ${media.data} (${media.data?.constructor?.name})`);
    }
  }

  if (medias.length < 2) {
    throw new RangeError("Minimum 2 media");
  }

  const caption = options.text || options.caption || "";
  const delay = !isNaN(options.delay) ? options.delay : 500;
  delete options.text;
  delete options.caption;
  delete options.delay;

  const album = baileys.generateWAMessageFromContent(
    jid,
    {
      messageContextInfo: {},
      albumMessage: {
        expectedImageCount: medias.filter(media => media.type === "image").length,
        expectedVideoCount: medias.filter(media => media.type === "video").length,
        ...(options.quoted
          ? {
              contextInfo: {
                remoteJid: options.quoted.key.remoteJid,
                fromMe: options.quoted.key.fromMe,
                stanzaId: options.quoted.key.id,
                participant: options.quoted.key.participant || options.quoted.key.remoteJid,
                quotedMessage: options.quoted.message,
              },
            }
          : {}),
      },
    },
    {}
  );

  await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id });

  for (let i = 0; i < medias.length; i++) {
    const { type, data } = medias[i];
    const img = await baileys.generateWAMessage(
      album.key.remoteJid,
      { [type]: data, ...(i === 0 ? { caption } : {}) },
      { upload: conn.waUploadToServer }
    );
    img.message.messageContextInfo = {
      messageAssociation: { associationType: 1, parentMessageKey: album.key },
    };
    await conn.relayMessage(img.key.remoteJid, img.message, { messageId: img.key.id });
    await baileys.delay(delay);
  }

  return album;
}

const pins = async (query) => {
  try {
    const res = await axios.get(`https://api.dorratz.com/v2/pinterest?q=${encodeURIComponent(query)}`);
    if (res.data && res.data.status && res.data.result) {
      return res.data.result.map(url => ({
        image_large_url: url,
        image_medium_url: url,
        image_small_url: url
      }));
    }
    return [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`*[ ℹ️ ] Ingresa un texto.*\n\n*[ 💡 ] Ejemplo:* .pinterest Gatos`);

  try {
    m.react('🕒');
    const results = await pins(text);
    if (!results || results.length === 0) return conn.reply(m.chat, `No se encontraron resultados para "${text}".`, m);

    const maxImages = Math.min(results.length, 10);
    const medias = [];

    for (let i = 0; i < maxImages; i++) {
      medias.push({
        type: 'image',
        data: { url: results[i].image_large_url || results[i].image_medium_url || results[i].image_small_url }
      });
    }

    await sendAlbumMessage(m.chat, medias, {
      caption: `◜ Pinterest Search ◞\n\n≡ 🔎 \`Búsqueda :\` "${text}"\n≡ 📄 \`Resultados :\` ${maxImages}`,
      quoted: m
    });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Error al obtener imágenes de Pinterest.', m);
  }
};

handler.help = ['pinterest'];
handler.customPrefix = /p|@|./i;
handler.command = ['pinterest', 'pin', 'in', 'interest'];
handler.tags = ['buscador'];

export default handler;
