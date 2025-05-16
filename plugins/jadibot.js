import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fsPromises } from "fs";
const fs = { ...fsPromises, existsSync };
import path, { join } from 'path';
import ws from 'ws';

let handler = async (m, { conn, command, usedPrefix, args, text, isOwner }) => {
  const isCommand1 = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command);
  const isCommand2 = /^(stop|pausarai|pausarbot)$/i.test(command);
  const isCommand3 = /^(bots|sockets|socket)$/i.test(command);

  async function reportError(e) {
    await m.reply(`⚠️ Ocurrió un error.`);
    console.log(e);
  }

  switch (true) {
    case isCommand1: {
      let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
      let uniqid = `${who.split`@`[0]}`;
      const sessionPath = `./${jadi}/${uniqid}`;

      if (!fs.existsSync(sessionPath)) {
        await conn.sendMessage(m.chat, {
          text: `❌ Usted no tiene una sesión activa.\n\nCree una usando:\n${usedPrefix + command}\n\nO use:\n*${usedPrefix + command}* \`\`\`(ID)\`\`\` si ya tiene una.`,
        }, { quoted: m });
        return;
      }

      if (global.conn.user.jid !== conn.user.jid) {
        return conn.sendMessage(m.chat, {
          text: `⚠️ Use este comando desde el *Bot Principal*.\n\nhttps://wa.me/${global.conn.user.jid.split`@`[0]}?text=${usedPrefix + command}`,
        }, { quoted: m });
      } else {
        await conn.sendMessage(m.chat, { text: `✅ Tu sesión como *Sub-Bot* ha sido eliminada.` }, { quoted: m });
      }

      try {
        await fs.rm(sessionPath, { recursive: true, force: true });
        await conn.sendMessage(m.chat, { text: `🧹 Se ha cerrado sesión y borrado todos los datos.` }, { quoted: m });
      } catch (e) {
        reportError(e);
      }
      break;
    }

    case isCommand2: {
      if (global.conn.user.jid === conn.user.jid) {
        conn.reply(m.chat, `⚠️ Este comando solo es válido para *Sub-Bots*. Contacte al número principal.`, m);
      } else {
        await conn.reply(m.chat, `🛑 ${botname} ha sido desactivado.`, m);
        conn.ws.close();
      }
      break;
    }

    case isCommand3: {
      const users = [...new Set(global.conns.filter(c => c.user && c.ws && c.ws.readyState !== ws.CLOSED))];

      function convertirMsADiasHorasMinutosSegundos(ms) {
        const segundos = Math.floor(ms / 1000) % 60;
        const minutos = Math.floor(ms / (1000 * 60)) % 60;
        const horas = Math.floor(ms / (1000 * 60 * 60)) % 24;
        const días = Math.floor(ms / (1000 * 60 * 60 * 24));
        return `${días ? `${días} días, ` : ''}${horas ? `${horas} horas, ` : ''}${minutos ? `${minutos} minutos, ` : ''}${segundos ? `${segundos} segundos` : ''}`;
      }

      const message = users.map((v, index) => `
╭┈┈୨୧┈┈┈┈┈┈┈♡┈┈┈┈┈୨୧┈╮
🌸 *Sub-Bot #${index + 1}* 🌸

✧ 📎 *Link:* wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}estado
✧ 🧑‍💻 *Usuario:* ${v.user.name || 'Sub-Bot'}
✧ ⏱️ *Conexión:* ${v.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : 'Desconocido... nya~ 💀'}

╰┈┈┈┈♡┈┈┈┈┈┈┈୨୧┈┈┈┈┈┈╯
`).join('\n');

      const replyMessage = message.length === 0
        ? `✖️ *No hay Sub-Bots disponibles por ahora...*\n⌛ *Intenta nuevamente en un ratito, okay?*`
        : message;

      const totalUsers = users.length;

      const responseMessage = `
╭─꒰ঌ🌷 *SUB-BOTS ACTIVOS* 🌷໒꒱─╮

\`\`\`
Cada Sub-Bot funciona de forma independiente.
El número principal no se responsabiliza por mal uso.
\`\`\`

🌟 *Total conectados:* ${totalUsers || '0'}

${replyMessage}

╰─꒰ঌ🌺 *Comunidad Oficial* 🌺໒꒱─╯
🔗 https://chat.whatsapp.com/KqkJwla1aq1LgaPiuFFtEY
`.trim();

      await conn.sendMessage(m.chat, {
        text: responseMessage,
        mentions: conn.parseMention(responseMessage),
      }, { quoted: m });

      break;
    }
  }
};

handler.tags = ['serbot'];
handler.help = ['sockets', 'deletesesion', 'pausarai'];
handler.command = ['deletesesion', 'deletebot', 'deletesession', 'deletesesaion', 'stop', 'pausarai', 'pausarbot', 'bots', 'sockets', 'socket'];

export default handler;
