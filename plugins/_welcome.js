import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  const fkontak = {
    "key": {
      "participants": "0@s.whatsapp.net",
      "remoteJid": "status@broadcast",
      "fromMe": false,
      "id": "Halo"
    },
    "message": {
      "contactMessage": {
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:Mai\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
  };

  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg');
  let img = await (await fetch(pp)).buffer();

  let chat = global.db.data.chats[m.chat];
  let welcomeText = chat.welcome || 'Bienvenid@ a nuestro grupito lleno de ternura!';
  let byeText = chat.bye || 'Adiós... te vamos a extrañar un montón.';
  let groupSize = participants.length;

  if (m.messageStubType == 27) groupSize++;
  else if (m.messageStubType == 28 || m.messageStubType == 32) groupSize--;

  const dev = '🌸 𝑴𝒂𝒊 𓂃 ࣪ ˖';
  const redes = '©️ Mai By Wirk ~♡';

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `
╭─❀* 𝑵𝒖𝒆𝒗𝒐 𝑴𝒊𝒆𝒎𝒃𝒓𝒐!! ˎˊ* ❀─╮
🌷 ¡Hola @${m.messageStubParameters[0].split`@`[0]}~!
🫧 Bienvenid@ a *${groupMetadata.subject}*~
${welcomeText}

♧ Ahora somos *${groupSize}* personitas kawaii~
✧ Usa *#help* para descubrir lo que puedo hacer!
✧ Puedes editar este mensaje con *.setwelcome*
╰────────────────────╯`.trim();

    await conn.sendMini(m.chat, '🌸 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 ~ 𝑵𝒚𝒂!! 🌸', dev, bienvenida, img, img, redes, fkontak);
  }

  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let despedida = `
╭─❀ *˗ 𝑯𝒂𝒔𝒕𝒂 𝒑𝒓𝒐𝒏𝒕𝒐~ ˎ* ❀─╮
🌙 @${m.messageStubParameters[0].split`@`[0]} se ha ido de *${groupMetadata.subject}*...
${byeText}

♧ Ahora quedamos *${groupSize}* personitas.
✧ Usa *#help* si necesitas mi ayuda.
✧ Puedes editar este mensaje con *.setbye*
╰────────────────────╯`.trim();

    await conn.sendMini(m.chat, '🌙 𝑺𝒂𝒚𝒐𝒏𝒂𝒓𝒂 ~ 𝑵𝒚𝒂... 🌙', dev, despedida, img, img, redes, fkontak);
  }
}
