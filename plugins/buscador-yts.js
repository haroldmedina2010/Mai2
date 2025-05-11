import yts from 'yt-search'

var handler = async (m, { text, conn, args, command, usedPrefix }) => {

if (!text) return conn.reply(m.chat, `🌿✨ *Eeep... dime algo para buscar, porfi.*\n\nEjemplo:\n${usedPrefix + command} lofi para dormir`, m)

conn.reply(m.chat, `☁️🌸 *Buscando entre las hojitas de YouTube... dame un momentito, ¿sí?*`, m)

let results = await yts(text)
let tes = results.all

let teks = results.all.map(v => {
  if (v.type === 'video') {
    return `╭──────୨୧🌼
│ *🌷 Título:* ${v.title}
│ *🍃 Canal:* ${v.author.name}
│ *⌛ Duración:* ${v.timestamp}
│ *📅 Subido:* ${v.ago}
│ *👁️ Vistas:* ${v.views}
│ *🔗 Enlace:* ${v.url}
╰─────────────୨୧`
  }
}).filter(v => v).join('\n\n🌸───────────────🌸\n\n')

conn.sendFile(m.chat, tes[0].thumbnail, 'ytsearch.jpg', `☁️✨ *Aquí tienes lo que encontré:*\n\n${teks}`, fkontak, m)

}
handler.help = ['ytsearch']
handler.tags = ['buscador']
handler.command = ['ytbuscar', 'ytsearch', 'yts']
handler.register = true
handler.coin = 1

export default handler
