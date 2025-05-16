import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'

// ✿━━━━━━✿•°:°•✿━━━━━━✿ XD

global.botNumber = ''

global.owner = [
  ['573171514640', '𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖR͟ꪮ𝑙ᦔ𓆪‌', true],
  ['573171514640' '𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖR͟ꪮ𝑙ᦔ𓆪‌', true]
]

global.mods = []
global.suittag = ['573171514640']
global.prems = []

global.libreria = 'Baileys'
global.baileys = 'V 6.7.16'
global.languaje = 'Español'
global.vs = '1.1.0'
global.nameqr = '👹😈Harold bot oficial 🤖🖤'
global.namebot = '👹😈Harold bot oficial 🤖🖤'
global.sessions = 'Sessions'
global.jadi = 'JadiBots'
global.yukiJadibts = true

global.packname = '👹😈Harold bot oficial 🤖🖤 '
global.botname = '👹😈Harold bot oficial 🤖🖤'
global.wm = '💫 ᴘʀᴏᴄᴇssᴇᴅ  👹😈Harold bot oficial 🤖🖤 💫'
global.author = '🖤By 𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖR͟ꪮ𝑙ᦔ𓆪‌👹'
global.dev = '🌼 Wirk Dev 🌼'
global.textbot = '👹😈Harold bot oficial 🤖🖤 • 𝖯𝗈𝖽𝖾𝗋𝖾𝗌 𓆩‌۫᷼ ִֶָღܾ݉͢𝐇ꪖR͟ꪮ𝑙ᦔ𓆪'‌    
global.etiqueta = '😈 @Harold 😈'

global.moneda = 'Money💸'
global.welcom1 = '⌗BIENVENIDO (A)'
global.welcom2 = '⌗ BIENVENIDA (O)'
global.banner = 'https://files.catbox.moe/6r4w92.jpg'
global.avatar = 'https://files.catbox.moe/j8oy7u.jpg

global.gp1 = 'https://chat.whatsapp.com/IpKoOk7j2ja2y9xgyPk7F2'  
global.comunidad1 = '
global.channel = 'https://whatsapp.com/channel/0029Vb9ulag2f3EERNCFMz40'
global.channel2 = global.channel
global.md = 'https://github.com/The Harold bot oficial' 
global.correo = 'haroldmediana2010@gmail.com'
global.cn = 

global.catalogo = fs.readFileSync('./src/catalogo.jpg')
global.estilo = {
  key: {
    fromMe: false,
    participant: '0@s.whatsapp.net',
    ...(false ? { remoteJid: '5219992095479-1625305606@g.us' } : {})
  },
  message: {
    orderMessage: {
      itemCount: -999999999,
      status: 1,
      surface: 1,
      message: global.packname,
      orderTitle: '👹😈Harold bot oficial 🤖🖤',
      thumbnail: global.catalogo,
      sellerJid: '0@s.whatsapp.net'
    }
  }
}
global.ch = {
  ch1: 'https://whatsapp.com/channel/0029Vb9ulag2f3EERNCFMz40'
}

global.cheerio = cheerioy
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment

global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    const emot = {
      level: '🌟 Nivel',
      coin: '💸 Coin',
      exp: '🌻 Exp',
      bank: '🏦 Banco',
      diamond: '💎 Diamante',
      health: '❤️ Salud',
      kyubi: '🌀 Magia',
      joincount: '💰 Token',
      emerald: '♦️ Esmeralda',
      stamina: '⚡ Energía',
      role: '⚜️ Rango',
      premium: '🎟️ Premium',
      pointxp: '📧 Puntos Exp',
      gold: '👑 Oro',
      iron: '⛓️ Hierro',
      coal: '🌑 Carbón',
      stone: '🪨 Piedra',
      potion: '🥤 Poción'
    }
    const results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
    return results.length ? emot[results[0][0]] : ''
  }
}

global.rpgg = {
  emoticon(string) {
    string = string.toLowerCase()
    const emott = {
      level: '🌟',
      coin: '💸',
      exp: '✨',
      bank: '🏦',
      diamond: '💎',
      health: '❤️',
      kyubi: '🌀',
      joincount: '💰',
      emerald: '♦️',
      stamina: '⚡',
      role: '⚜️',
      premium: '🎟️',
      pointxp: '📧',
      gold: '👑',
      iron: '⛓️',
      coal: '🌑',
      stone: '🪨',
      potion: '🥤'
    }
    const results = Object.keys(emott).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
    return results.length ? emott[results[0][0]] : ''
  }
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("✿ Archivo 'settings.js' actualizado ✿"))
  import(`${file}?update=${Date.now()}`)
})
