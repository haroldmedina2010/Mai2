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
  let img = await (await fetch(`${pp}`)).buffer();

  let chat = global.db.data.chats[m.chat];
  // Asegúrate de que el texto por defecto también sea un poco kawaii si no hay texto personalizado
  let welcomeText = chat.welcome || '¡Esperamos que disfrutes tu estadía aquí! (｡･ω･｡)ﾉ♡';
  let byeText = chat.bye || '¡Esperamos verte de nuevo pronto! 😿';
  let groupSize = participants.length;

  if (m.messageStubType == 27) groupSize++;
  else if (m.messageStubType == 28 || m.messageStubType == 32) groupSize--;

  const dev = '『 Mai 🌻 』';
  const redes = '©️ Mai By Wirk';

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `🌸✨💖 Holiii, bienvenid@! 💖✨🌸\n\n🧸 ¡Una nueva estrellita ha llegado a nuestro lindo grupito *${groupMetadata.subject}*!\n\n🎉 Un gran abracito de oso para ti, @${m.messageStubParameters[0].split`@`[0]}!\n\n${chat.welcome ? `🎀 *Mensajito especial del grupo:* ${chat.welcome}\n\n` : ''}🐾 ¡Nuestra linda familia crece! Ahora somos ${groupSize} amiguitos! (ฅ´ω`ฅ)\n\n🍭 ¡Esperamos que disfrutes mucho mucho tu estadía y te diviertas con nosotros!\n\n🌟 Para ver todas mis cositas y comandos, solo escribe *#help*~!\n\n📝 Puedes hacer que este mensaje sea aún más lindo usando *.setwelcome*~ desu! ♡`;
    await conn.sendMini(m.chat, '✨ Nueva Estrellita ✨', dev, bienvenida, img, img, redes, fkontak);
  }

  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let despedida = `૮₍ ˃ ⤙ ˂ ₎ა Byeee byeee~! 🥺💔\n\n✨ Oh no... una estrellita nos ha dejado...\n\n🐾 Adiós con mucho cariño a @${m.messageStubParameters[0].split`@`[0]} de nuestro grupito *${groupMetadata.subject}*...\n\n${chat.bye ? `🍓 *Mensajito de despedida:* ${chat.bye}\n\n` : ''}👥 Ahora somos ${groupSize} amiguitos menos... snif snif...\n\n💖 ¡Te deseamos lo mejor en tus próximos rumbos y esperamos que nos visites de nuevo algún día! (｡･ω･｡)ﾉ♡\n\n📝 Puedes hacer este mensaje triste más lindo con *.setbye*~ 😿`;
    await conn.sendMini(m.chat, '😿 Estrellita se fue 😿', dev, despedida, img, img, redes, fkontak);
  }
}
