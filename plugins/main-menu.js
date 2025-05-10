let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let user = global.db.data.users[userId]
    let name = conn.getName(userId)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length
    
    let txt = `
ׄ    ִ ⏝︶ ׄ   ⋆   ׄ ︶⏝ ִ    ׄ  

> _Hola @${userId.split('@')[0]}, bienvenido/a al menú de @${botname}_

╭ׅ✿╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴✧╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴
│</> *Cliente ›* @${userId.split('@')[0]}
│➮ *Modo ›* Publico
│☕︎ *Bot ›* ${(conn.user.jid == global.conn.user.jid ? 'Principal 🅥' : 'Prem Bot 🅑')}
│𖢺 *Activa ›* ${uptime}
│
│○ *Usuarios ›* ${totalreg}
│○ *Comandos ›* ${totalCommands}
│○ *Baileys ›* Multi Device
╰✿╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴✧╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─͜╴✧╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜

Crea un *Sub-Bot* con tu número utilizando */qr* o */code*

╭ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─͜  𓇼 *INFO-BOT* 𓇼̼ᩘ  ִ.
┃✿ᩧ̼ ❫❯ */menu › /help*
> _*Ver la lista de comandos de la Bot.*_
┃❀ᩧ̼ ❫❯ */uptime › /runtime*
> _*Ver tiempo activo o en linea de la Bot.*_
┃✿ᩧ̼ ❫❯ */sc › /script*
> _*Link del repositorio oficial de la Bot*_
┃❀ᩧ̼ ❫❯ */staff › /colaboradores*
> _*Ver la lista de desarrolladores de la Bot.*_
┃✿ᩧ̼ ❫❯ */serbot › /serbot code*
> _*Crea una sesión de Sub-Bot.*_
┃❀ᩧ̼ ❫❯ */bots › /sockets*
> _*Ver la lista de Sub-Bots activos.*_
┃✿ᩧ̼ ❫❯ */creador*
> _*Contacto del creador de la Bot.*_
┃❀ᩧ̼ ❫❯ */status › /estado*
> _*Ver el estado actual de la Bot.*_
┃✿ᩧ̼ ❫❯ */links › /grupos*
> _*Ver los enlaces oficiales de la Bot.*_
┃❀ᩧ̼ ❫❯ */infobot*
> _*Ver la información completa de la Bot.*_
┃✿ᩧ̼ ❫❯ */sug › /newcommand* + _<sugerencia>_
> _*Sugiere un nuevo comando.*_
┃❀ᩧ̼ ❫❯ */ping › /p*
> _*Ver la velocidad de respuesta del Bot.*_
┃✿ᩧ̼ ❫❯ */reporte › /reportar* + _<error>_
> _*Reporta alguna falla o problema de la Bot.*_
┃❀ᩧ̼ ❫❯ */sistema › /system*
> _*Ver estado del sistema de alojamiento.*_
┃✿ᩧ̼ ❫❯ */speed › /speedtest*
> _*Ver las estadísticas de velocidad de la Bot.*_
┃❀ᩧ̼ ❫❯ */views › /usuarios*
> _*Ver la cantidad de usuarios registrados en el sistema.*_
┃✿ᩧ̼ ❫❯ */funciones › /totalfunciones*
> _*Ver todas las funciones de la Bot.*_
┃❀ᩧ̼ ❫❯ */ds › /fixmsgespera*
> _*Eliminar archivos de sesión innecesarios.*_
┃✿ᩧ̼ ❫❯ */editautoresponder* + _<prompt>_
> _*Configurar un Prompt personalizado de la Bot.*_
╰ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴  ֢ ⋱࣭ ᩴ   ⋮֔    ᩴ ⋰ ֢ ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴╯ׅ

╭ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─͜  𓇼 *BUSCADORES* 𓇼̼ᩘ  ִ.
┃✿ᩧ̼ ❫❯ */tiktoksearch › /tiktoks* + _<query>_
> _*Buscador de videos de tiktok.*_
┃❀ᩧ̼ ❫❯ */tweetposts* + _<query>_
> _*Buscador de posts de Twitter/X.*_
┃✿ᩧ̼ ❫❯ */ytsearch › /yts* + _<query>_
> _*Realiza búsquedas de Youtube.*_
┃❀ᩧ̼ ❫❯ */githubsearch* + _<user|repository>_
> _*Buscador de usuarios/repositorios de GitHub.*_
┃✿ᩧ̼ ❫❯ */cuevana › /cuevanasearch* + _<query>_
> _*Buscador de películas/series por Cuevana.*_
┃❀ᩧ̼ ❫❯ */google* + _<query>_
> _*Realiza búsquedas por Google.*_
┃✿ᩧ̼ ❫❯ */pin › /pinterest* + _<query>_
> _*Buscador de imagenes de Pinterest.*_
┃❀ᩧ̼ ❫❯ */imagen › /image* + _<query>_
> _*buscador de imagenes de Google.*_
┃✿ᩧ̼ ❫❯ */infoanime* + _<anime>_
> _*Buscador de información de anime/manga.*_
┃❀ᩧ̼ ❫❯ */hentaisearch › /searchhentai* + _<tag>_
> _*Buscador de capítulos hentai.*_
┃✿ᩧ̼ ❫❯ */xnxxsearch › /xnxxs* + _<query>_
> _*Buscador de vídeos de Xnxx.*_
┃❀ᩧ̼ ❫❯ */xvsearch › /xvideossearch* + _<query>_
> _*Buscador de vídeos de Xvideos.*_
┃✿ᩧ̼ ❫❯ */pornhubsearch › /phsearch* + _<query>_
> _*Buscador de videos de Pornhub.*_
┃❀ᩧ̼ ❫❯ */npmjs* + _<query>_
> _*Buscandor de npmjs.*_
╰ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴  ֢ ⋱࣭ ᩴ   ⋮֔    ᩴ ⋰ ֢ ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴╯ׅ

╭ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─͜  𓇼 *DESCARGAS* 𓇼̼ᩘ  ִ.
┃✿ᩧ̼ ❫❯ */tiktok › /tt* + _<url|query>_
> _*Descarga videos de TikTok.*_
┃❀ᩧ̼ ❫❯ */mediafire › /mf* + _<url>_
> _*Descargar un archivo de MediaFire.*_
┃✿ᩧ̼ ❫❯ */pinvid › /pinvideo* + _<url>_
> _*Descargar vídeos de Pinterest.*_
┃❀ᩧ̼ ❫❯ */mega › /mg* + _<url>_
> _*Descargar un archivo de MEGA.*_
┃✿ᩧ̼ ❫❯ */play › /play2 › /mp3 › /mp4* + _<url|query>_
> _*Descarga música/video de YouTube.*_
┃❀ᩧ̼ ❫❯ */ytmp3 › /ytmp4* + _<url>_
> _*Descarga música/video de YouTube mediante url.*_
┃✿ᩧ̼ ❫❯ */fb › /facebook* + _<url>_
> _*Descarga videos de Facebook.*_
┃❀ᩧ̼ ❫❯ */twitter › /x* + _<url>_
> _*Descargar un video de Twitter/X*_
┃✿ᩧ̼ ❫❯ */ig › /instagram* + _<url>_
> _*Descarga contenido de Instagram.*_
┃❀ᩧ̼ ❫❯ */tts › /tiktoks* + _<query>_
> _*Buscar videos de tiktok*_
┃✿ᩧ̼ ❫❯ */terabox › /tb* + _<url>_
> _*Descargar archivos por Terabox.*_
┃❀ᩧ̼ ❫❯ */ttimg › /ttmp3* + _<url>_
> _*Descarga fotos/audios de tiktok.*_
┃✿ᩧ̼ ❫❯ */gitclone* + _<url>_
> _*Descarga un repositorio de github.*_
┃❀ᩧ̼ ❫❯ */xvideosdl* + _<url>_
> _*Descarga videos porno de (Xvideos).*_
┃✿ᩧ̼ ❫❯ */xnxxdl* + _<url>_
> _*Descarga videos porno de (xnxx).*_
┃❀ᩧ̼ ❫❯ */apk › /modapk* + _<query>_
> _*Descarga un apk de Aptoide.*_
┃✿ᩧ̼ ❫❯ */tiktokrandom › /ttrandom*
> _*Descarga un video aleatorio de tiktok.*_
┃❀ᩧ̼ ❫❯ */npmdl › /npmdownloader* + _<query>_
> _*Descarga paquetes de NPMJs.*_
╰ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴  ֢ ⋱࣭ ᩴ   ⋮֔    ᩴ ⋰ ֢ ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴╯ׅ

╭ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─͜  𓇼 *ECONOMIA* 𓇼̼ᩘ  ִ.
┃✿ᩧ̼ ❫❯ */work › /w › /trabajar*
> _*Trabaja para ganar ${moneda}.*_
┃❀ᩧ̼ ❫❯ */slut › /protituirse*
> _*Trabaja como prostituta y gana ${moneda}.*_
┃✿ᩧ̼ ❫❯ */coinflip › /cf › /suerte* + _<cantidad>_
> _*Apuesta tus ${moneda} a cara o cruz.*_
┃❀ᩧ̼ ❫❯ */crime › /crimen*
> _*Intenta cometer un crime para ganar ${moneda}.*_
┃✿ᩧ̼ ❫❯ */roulette › /ruleta › /rt* + _<cantidad> <color>_
> _*Apuesta ${moneda} al color rojo o negro.*_
┃❀ᩧ̼ ❫❯ */casino › /apostar* + _<cantidad>_
> _*Apuesta tus ${moneda} en el casino.*_
┃✿ᩧ̼ ❫❯ */slot* + _<cantidad>_
> _*Apuesta tus ${moneda} en la ruleta y prueba tu suerte.*_
┃❀ᩧ̼ ❫❯ */wallet › /cartera* + _<mention>_
> _*Ver tus ${moneda} en la cartera.*_
┃✿ᩧ̼ ❫❯ */bank › /banco* + _<mention>_
> _*Ver tus ${moneda} en el banco.*_
┃❀ᩧ̼ ❫❯ */deposit › /depositar › /d* + _<cantidad|all>_
> _*Deposita tus ${moneda} al banco.*_
┃✿ᩧ̼ ❫❯ */withdraw › /retirar › /with* + _<cantidad|all>_
> _*Retira tus ${moneda} del banco.*_
┃❀ᩧ̼ ❫❯ */transfer › /pay* + _<cantidad> <mention>_
> _*Transfiere ${moneda} o XP a otros usuarios.*_
┃✿ᩧ̼ ❫❯ */mine › /minar › /miming*
> _*Trabaja como minero y recolecta recursos.*_
┃❀ᩧ̼ ❫❯ */buy › /buyall* + _<cantidad|all>_
> _*Compra ${moneda} con tu XP.*_
┃✿ᩧ̼ ❫❯ */daily › /diario*
> _*Reclama tu recompensa diaria.*_
┃❀ᩧ̼ ❫❯ */cofre*
> _*Reclama un cofre diario lleno de recursos.*_
┃✿ᩧ̼ ❫❯ */weekly › /semanal*
> _*Reclama tu regalo semanal.*_
┃❀ᩧ̼ ❫❯ */monthly › /mensual*
> _*Reclama tu recompensa mensual.*_
┃✿ᩧ̼ ❫❯ */steal › /robar › /rob* + _<mention>_
> _*Intenta robarle ${moneda} a alguien.*_
┃❀ᩧ̼ ❫❯ */robarxp › /robxp* + _<mention>_
> _*Intenta robar XP a un usuario.*_
┃✿ᩧ̼ ❫❯ */economyboard › /eboard › /baltop*
> _*Ver el ranking de usuarios con más ${moneda}.*_
┃❀ᩧ̼ ❫❯ */adventure › /aventura*
> _*Aventúrate en un nuevo reino y recolecta recursos.*_
┃✿ᩧ̼ ❫❯ */heal › /curar*
> _*Cura tu salud para volverte aventurar.*_
┃❀ᩧ̼ ❫❯ */hunt › /cazar › /berburu*
> _*Aventúrate en una caza de animales.*_
┃✿ᩧ̼ ❫❯ */inv › /inventario*
> _*Ver tu inventario con todos tus ítems.*_
┃❀ᩧ̼ ❫❯ */explorar › /mazmorra*
> _*Explorar mazmorras para ganar ${moneda}.*_
┃✿ᩧ̼ ❫❯ */halloween*
> _*Reclama tu dulce o truco (Solo en Halloween).*_
┃❀ᩧ̼ ❫❯ */christmas › /navidad*
> _*Reclama tu regalo navideño (Solo en Navidad).*_
╰ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴  ֢ ⋱࣭ ᩴ   ⋮֔    ᩴ ⋰ ֢ ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴╯ׅ

╭ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─͜  𓇼 *GACHA* 𓇼̼ᩘ  ִ.
┃✿ᩧ̼ ❫❯ */rollwaifu › /rw › /roll*
> _*Waifu o husbando aleatorio.*_
┃❀ᩧ̼ ❫❯ */claim › /c › /reclamar* + _<mention waifu>_
> _*Reclamar un personaje.*_
┃✿ᩧ̼ ❫❯ */harem › /waifus › /claims*
> _*Ver tus personajes reclamados.*_
┃❀ᩧ̼ ❫❯ */charimage › /waifuimage › /wimage* + _<waifu>_
> _*Ver una imagen de un personaje.*_
┃✿ᩧ̼ ❫❯ */charinfo › /winfo › /waifuinfo* + _<waifu>_
> _*Ver información de un personaje.*_
┃❀ᩧ̼ ❫❯ */givechar › /givewaifu › /regalar* + _<mention> <waifu>_
> _*Regalar un personaje a otro usuario.*_
┃✿ᩧ̼ ❫❯ */vote › /votar* + _<waifu>_
> _*Votar por un personaje para subir su valor.*_
┃❀ᩧ̼ ❫❯ */waifusboard › /waifustop › /topwaifus*
> _*Ver el top de personajes con mayor valor.*_
╰ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴  ֢ ⋱࣭ ᩴ   ⋮֔    ᩴ ⋰ ֢ ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴╯ׅ

╭ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─͜  𓇼 *STICKERS* 𓇼̼ᩘ  ִ.
┃✿ᩧ̼ ❫❯ */sticker › /s*
> _*Crea stickers de (imagen/video)*_
┃❀ᩧ̼ ❫❯ */setmeta* + _<packname> | <author>_
> _*Estable un pack y autor para los stickers.*_
┃✿ᩧ̼ ❫❯ */delmeta*
> _*Elimina tu pack de stickers.*_
┃❀ᩧ̼ ❫❯ */pfp › /getpic* + _<mention>_
> _*Obtén la foto de perfil de un usuario.*_
┃✿ᩧ̼ ❫❯ */qc* + _<text|mention>_
> _*Crea stickers con texto o de un usuario.*_
┃❀ᩧ̼ ❫❯ */toimg › /img*
> _*Convierte stickers en imagen.*_
┃✿ᩧ̼ ❫❯ */brat › /ttp › /attp*︎ + _<text>_
> _*Crea stickers con texto.*_
┃❀ᩧ̼ ❫❯ */emojimix* + _<emoji1+emoji2>_
> _*Fuciona 2 emojis para crear un sticker.*_
┃✿ᩧ̼ ❫❯ */wm › /take* + _<packname> | <author>_
> _*Cambia el nombre de los stickers.*_
╰ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴  ֢ ⋱࣭ ᩴ   ⋮֔    ᩴ ⋰ ֢ ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴╯ׅ

╭ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─͜  𓇼 *HERRAMIENTAS* 𓇼̼ᩘ  ִ.
┃✿ᩧ̼ ❫❯ */calcular › /cal* + _<ecuacion>_
> _*Calcular todo tipo de ecuaciones.*_
┃❀ᩧ̼ ❫❯ */tiempo › /clima* + _<pais|ciudad>_
> _*Ver el clima de un pais/ciudad.*_
┃✿ᩧ̼ ❫❯ */horario*
> _*Ver el horario global de los países.*_
┃❀ᩧ̼ ❫❯ */fake › /fakereply* + _<mention> <text>_
> _*Crea un mensaje falso de un usuario.*_
┃✿ᩧ̼ ❫❯ */enhance › /remini › /hd*
> _*Mejora la calidad de una imagen.*_
┃❀ᩧ̼ ❫❯ */letra* + _<text>_
> _*Cambia la fuente de las letras.*_
┃✿ᩧ̼ ❫❯ */read › /readviewonce › /ver*
> _*Ver imágenes de una sola vista.*_
┃❀ᩧ̼ ❫❯ */whatmusic › /shazam*
> _*Descubre el nombre de canciones o vídeos.*_
┃✿ᩧ̼ ❫❯ */ss › /ssweb* + _<url>_
> _*Ver el estado de una página web.*_
┃❀ᩧ̼ ❫❯ */length › /tamaño*
> _*Cambia el tamaño de imágenes y vídeos.*_
┃✿ᩧ̼ ❫❯ */say › /decir* + _<text>_
> _*Repetir un mensaje.*_
┃❀ᩧ̼ ❫❯ */todoc › /toducument*
> _*Crea documentos de (audio, imágenes y vídeos).*_
┃✿ᩧ̼ ❫❯ */translate › /traducir › /trad* + _<idioma> <text>_
> _*Traduce palabras en otros idiomas.*_
╰ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴  ֢ ⋱࣭ ᩴ   ⋮֔    ᩴ ⋰ ֢ ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴╯ׅ

╭ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─͜  𓇼 *PERFIL* 𓇼̼ᩘ  ִ.
┃✿ᩧ̼ ❫❯ */reg › /verificar › /register* + _<nombre.edad>_
> _*Registra tu nombre y edad en el bot.*_
┃❀ᩧ̼ ❫❯ */unreg*
> _*Elimina tu registro del bot.*_
┃✿ᩧ̼ ❫❯ */profile › /perfil* + _<mention>_
> _*Muestra tu perfil o la de un usuario.*_
┃❀ᩧ̼ ❫❯ */marry* + _<mention>_
> _*Propón matrimonio a otro usuario.*_
┃✿ᩧ̼ ❫❯ */divorce*
> _*Divorciarte de tu pareja.*_
┃❀ᩧ̼ ❫❯ */setgenre › /setgenero* + _<hombre|mujer>_
> _*Establece tu género en el perfil del bot.*_
┃✿ᩧ̼ ❫❯ */delgenre › /delgenero*
> _*Elimina tu género del perfil del bot.*_
┃❀ᩧ̼ ❫❯ */setbirth › /setnacimiento* + _<dia/mes/año|mes/dia>_
> _*Establece tu fecha de nacimiento en el perfil del bot.*_
┃✿ᩧ̼ ❫❯ */delbirth › /delnacimiento*
> _*Elimina tu fecha de nacimiento del perfil del bot.*_
┃❀ᩧ̼ ❫❯ */setdescription › /setdesc* + _<text>_
> _*Establece una descripción en tu perfil del bot.*_
┃✿ᩧ̼ ❫❯ */deldescription › /deldesc*
> _*Elimina la descripción de tu perfil del bot.*_
┃❀ᩧ̼ ❫❯ */lboard › /lb* + _<pagina>_
> _*Top de usuarios con más (experiencia y nivel).*_
┃✿ᩧ̼ ❫❯ */level › /lvl* + _<mention>_
> _*Ver tu nivel y experiencia actual.*_
┃❀ᩧ̼ ❫❯ */comprarpremium › /premium*
> _*Compra un pase premium para usar el bot sin límites.*_
┃✿ᩧ̼ ❫❯ */confesiones › /confesar* + _<mention> <mensaje>_
> _*Confiesa tus sentimientos a alguien de manera anonima.*_
╰ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴  ֢ ⋱࣭ ᩴ   ⋮֔    ᩴ ⋰ ֢ ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴╯ׅ

╭ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─͜  𓇼 *GRUPOS* 𓇼̼ᩘ  ִ.
┃✿ᩧ̼ ❫❯ */hidetag* + _<text>_
> _*Envia un mensaje mencionando a todos los usuarios.*_
┃❀ᩧ̼ ❫❯ */groupinfo › /gp*
> _*Ver la Informacion del grupo.*_
┃✿ᩧ̼ ❫❯ */listonline › /linea*
> _*Ver la lista de los usuarios en linea.*_
┃❀ᩧ̼ ❫❯ */setwelcome* + _<text>_
> _*Establecer un mensaje de bienvenida personalizado.*_
┃✿ᩧ̼ ❫❯ */setbye* + _<text>_
> _*Establecer un mensaje de despedida personalizado.*_
┃❀ᩧ̼ ❫❯ */link*
> _*El bot envia el link del grupo.*_
┃✿ᩧ̼ ❫❯ */admins › /admin*
> _*Mencionar a los admins para solicitar ayuda.*_
┃❀ᩧ̼ ❫❯ */revoke › /restablecer*
> _*Restablecer el enlace del grupo.*_
┃✿ᩧ̼ ❫❯ */group › /grupo* + _<open|close>_
> _*Cierra o abre el grupo para todos los miembros.*_
┃❀ᩧ̼ ❫❯ */kick* + _<mention>_
> _*Elimina un usuario de un grupo.*_
┃✿ᩧ̼ ❫❯ */add › /añadir › /agregar* + _<numero>_
> _*Invita a un usuario a tu grupo.*_
┃❀ᩧ̼ ❫❯ */promote* + _<mention>_
> _*El bot dara administrador al usuario mencionando.*_
┃✿ᩧ̼ ❫❯ */demote* + _<mention>_
> _*El bot quitara administrador al usuario mencionando.*_
┃❀ᩧ̼ ❫❯ */setgpbaner › /groupimg*
> _*Cambiar la imagen del grupo.*_
┃✿ᩧ̼ ❫❯ */setgpname › /groupname* + _<text>_
> _*Cambiar el nombre del grupo.*_
┃❀ᩧ̼ ❫❯ */setgpdesc › /groupdesc* + _<text>_
> _*Cambiar la descripción del grupo.*_
┃✿ᩧ̼ ❫❯ */warn › /advertir › /warning* + _<mention> <razon>_
> _*Darle una advertencia aún usuario.*_
┃❀ᩧ̼ ❫❯ */unwarn › /delwarn* + _<mention>_
> _*Quitar advertencias.*_
┃✿ᩧ̼ ❫❯ */advlist › /listadv*
> _*Ver lista de usuarios advertidos.*_
┃❀ᩧ̼ ❫❯ */bot* + _<on|off>_
> _*Enciende o apaga el bot en un grupo.*_
┃✿ᩧ̼ ❫❯ */mute* + _<mention>_
> _*El bot elimina los mensajes del usuario.*_
┃❀ᩧ̼ ❫❯ */unmute* + _<mention>_
> _*El bot deja de eliminar los mensajes del usuario.*_
┃✿ᩧ̼ ❫❯ */encuesta › /poll* + _<pregunta|opcion1|opcion2...>_
> _*Crea una encuesta.*_
┃❀ᩧ̼ ❫❯ */delete › /del*
> _*Elimina mensaje de otros usuarios.*_
┃✿ᩧ̼ ❫❯ */fantasmas*
> _*Ver lista de inactivos del grupo.*_
┃❀ᩧ̼ ❫❯ */kickfantasmas*
> _*Elimina a los inactivos del grupo.*_
┃✿ᩧ̼ ❫❯ */invocar › /tagall › /todos* + _<text>_
> _*Invoca a todos los usuarios de un grupo.*_
┃❀ᩧ̼ ❫❯ */setemoji › /setemo* + _<emoji>_
> _*Cambia el emoji que se usa en la invitación de usuarios.*_
┃✿ᩧ̼ ❫❯ */listnum › /kicknum* + _<prefijo>_
> _*Elimine a usuario por el prefijo de país.*_
╰ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴  ֢ ⋱࣭ ᩴ   ⋮֔    ᩴ ⋰ ֢ ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴╯ׅ

╭ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─͜  𓇼 *ANIME* 𓇼̼ᩘ  ִ.
┃✿ᩧ̼ ❫❯ */angry › /enojado* + _<mention>_
> _*Estar enojado con un usuario.*_
┃❀ᩧ̼ ❫❯ */bite* + _<mention>_
> _*Muerde a un usuario.*_
┃✿ᩧ̼ ❫❯ */bleh* + _<mention>_
> _*Sacar la lengua a un usuario.*_
┃❀ᩧ̼ ❫❯ */blush* + _<mention>_
> _*Sonrojate por algo o por un usuario.*_
┃✿ᩧ̼ ❫❯ */bored › /aburrido* + _<mention>_
> _*Estar aburrido con un usuario.*_
┃❀ᩧ̼ ❫❯ */cry* + _<mention>_
> _*Llorar por algo o por un usuario.*_
┃✿ᩧ̼ ❫❯ */cuddle* + _<mention>_
> _*Acurrucarse con un usuario.*_
┃❀ᩧ̼ ❫❯ */dance* + _<mention>_
> _*Baila solo o con un usuario.*_
┃✿ᩧ̼ ❫❯ */drunk* + _<mention>_
> _*Estar borracho con un usuario.*_
┃❀ᩧ̼ ❫❯ */eat › /comer* + _<mention>_
> _*Come algo o con un usuario.*_
┃✿ᩧ̼ ❫❯ */facepalm* + _<mention>_
> _*Darle una palmada en la cara a un usuario.*_
┃❀ᩧ̼ ❫❯ */happy › /feliz* + _<mention>_
> _*Salta de felicidad solo o con un usuario.*_
┃✿ᩧ̼ ❫❯ */hug* + _<mention>_
> _*Dar un abrazo a un usuario.*_
┃❀ᩧ̼ ❫❯ */impregnate › /preg* + _<mention>_
> _*Embarazar a un usuario.*_
┃✿ᩧ̼ ❫❯ */kill* + _<mention>_
> _*Asesina a un usuario.*_
┃❀ᩧ̼ ❫❯ */kiss › /besar › /kiss2* + _<mention>_
> _*Dar un beso a un usuario.*_
┃✿ᩧ̼ ❫❯ */laugh* + _<mention>_
> _*Reírte de algo o de un usuario.*_
┃❀ᩧ̼ ❫❯ */lick* + _<mention>_
> _*Lamer a un usuario.*_
┃✿ᩧ̼ ❫❯ */love › /amor* + _<mention>_
> _*Sentirse enamorado de un usuario.*_
┃❀ᩧ̼ ❫❯ */pat* + _<mention>_
> _*Acaricia a un usuario.*_
┃✿ᩧ̼ ❫❯ */poke* + _<mention>_
> _*Picar a un usuario.*_
┃❀ᩧ̼ ❫❯ */pout* + _<mention>_
> _*Hacer pucheros a un usuario.*_
┃✿ᩧ̼ ❫❯ */punch* + _<mention>_
> _*Dar un puñetazo a un usuario.*_
┃❀ᩧ̼ ❫❯ */run* + _<mention>_
> _*Correr solo o con un usuario.*_
┃✿ᩧ̼ ❫❯ */sad › /triste* + _<mention>_
> _*Expresar tristeza por algo o por un usuario.*_
┃❀ᩧ̼ ❫❯ */scared* + _<mention>_
> _*Estar asustado por algo o por un usuario.*_
┃✿ᩧ̼ ❫❯ */seduce* + _<mention>_
> _*Seducir a un usuario.*_
┃❀ᩧ̼ ❫❯ */shy › /timido* + _<mention>_
> _*Sentir timidez por algo o por un usuario.*_
┃✿ᩧ̼ ❫❯ */slap* + _<mention>_
> _*Dar una bofetada a un usuario.*_
┃❀ᩧ̼ ❫❯ */dias › /days* + _<mention>_
> _*Darle los buenos días a alguien.*_
┃✿ᩧ̼ ❫❯ */noches › /nights* + _<mention>_
> _*Darle las buenas noches a alguien.*_
┃❀ᩧ̼ ❫❯ */sleep* + _<mention>_
> _*Tumbarte a dormir solo o con un usuario.*_
┃✿ᩧ̼ ❫❯ */smoke* + _<mention>_
> _*Fumar solo o con un usuario.*_
┃❀ᩧ̼ ❫❯ */think* + _<mention>_
> _*Pensar en algo o en un usuario.*_
╰ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴  ֢ ⋱࣭ ᩴ   ⋮֔    ᩴ ⋰ ֢ ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴╯ׅ

╭ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─͜  𓇼 *NSFW* 𓇼̼ᩘ  ִ.
┃✿ᩧ̼ ❫❯ */anal* + _<mention>_
> _*Hacer un anal a un usuario.*_
┃❀ᩧ̼ ❫❯ */waifu*
> _*Buscá una waifu aleatorio.*_
┃✿ᩧ̼ ❫❯ */bath* + _<mention>_
> _*Bañarse solo o con un usuario.*_
┃❀ᩧ̼ ❫❯ */blowjob › /mamada › /bj* + _<mention>_
> _*Dar una mamada a un usuario.*_
┃✿ᩧ̼ ❫❯ */boobjob* + _<mention>_
> _*Hacer una rusa a un usuario.*_
┃❀ᩧ̼ ❫❯ */cum* + _<mention>_
> _*Venirse en un usuario.*_
┃✿ᩧ̼ ❫❯ */fap* + _<mention>_
> _*Hacerse una paja solo o con un usuario.*_
┃❀ᩧ̼ ❫❯ */ppcouple › /ppcp*
> _*Genera imagenes para amistades o parejas.*_
┃✿ᩧ̼ ❫❯ */footjob* + _<mention>_
> _*Hacer una paja con los pies a un usuario.*_
┃❀ᩧ̼ ❫❯ */fuck › /coger › /fuck2* + _<mention>_
> _*Follarte a un usuario.*_
┃✿ᩧ̼ ❫❯ */cafe › /coffe* + _<mention>_
> _*Tomate un cafecito solo o con un usuario.*_
┃❀ᩧ̼ ❫❯ */violar › /perra* + _<mention>_
> _*Viola a un usuario.*_
┃✿ᩧ̼ ❫❯ */grabboobs* + _<mention>_
> _*Agarrar tetas a un usuario.*_
┃❀ᩧ̼ ❫❯ */grope* + _<mention>_
> _*Manosear a un usuario.*_
┃✿ᩧ̼ ❫❯ */lickpussy* + _<mention>_
> _*Lamer un coño de un usuario.*_
┃❀ᩧ̼ ❫❯ */rule34 › /r34* + _<tag>_
> _*Buscar imagenes en Rule34*_
┃✿ᩧ̼ ❫❯ */sixnine › /69* + _<mention>_
> _*Haz un 69 con un usuario.*_
┃❀ᩧ̼ ❫❯ */spank › /nalgada* + _<mention>_
> _*Dar una nalgada a un usuario.*_
┃✿ᩧ̼ ❫❯ */suckboobs* + _<mention>_
> _*Chupar tetas a un usuario.*_
┃❀ᩧ̼ ❫❯ */undress › /encuerar* + _<mention>_
> _*Desnudar a un usuario.*_
┃✿ᩧ̼ ❫❯ */yuri › /tijeras* + _<mention>_
> _*Hacer tijeras con un usuario.*_
╰ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴  ֢ ⋱࣭ ᩴ   ⋮֔    ᩴ ⋰ ֢ ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴╯ׅ

╭ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─͜  𓇼 *JUEGOS* 𓇼̼ᩘ  ִ.
┃✿ᩧ̼ ❫❯ */amistad › /amigorandom*
> _*Hacer amigos con un juego.*_
┃❀ᩧ̼ ❫❯ */chaqueta › /jalamela* + _<mention>_
> _*Hacerte una chaqueta o a un usuario.*_
┃✿ᩧ̼ ❫❯ */chiste*
> _*La bot te cuenta un chiste.*_
┃❀ᩧ̼ ❫❯ */consejo*
> _*La bot te da un consejo.*_
┃✿ᩧ̼ ❫❯ */doxeo › /doxear* + _<mention>_
> _*Simular un doxeo falso a un usuario.*_
┃❀ᩧ̼ ❫❯ */facto*
> _*La bot te lanza un facto.*_
┃✿ᩧ̼ ❫❯ */formarpareja*
> _*Forma una pareja aleatoria.*_
┃❀ᩧ̼ ❫❯ */formarpareja5*
> _*Forma 5 parejas diferentes aleatorias.*_
┃✿ᩧ̼ ❫❯ */frase*
> _*La bot te da una frase.*_
┃❀ᩧ̼ ❫❯ */huevo* + _<mention>_
> _*Agarrale el huevo a alguien.*_
┃✿ᩧ̼ ❫❯ */chupalo* + _<mention>_
> _*Hacer que un usuario te la chupe.*_
┃❀ᩧ̼ ❫❯ */aplauso* + _<mention>_
> _*Aplaudirle a alguien.*_
┃✿ᩧ̼ ❫❯ */marron* + _<mention>_
> _*Burlarte del color de piel de un usuario.*_
┃❀ᩧ̼ ❫❯ */suicidar*
> _*Suicidate (es un juego).*_
┃✿ᩧ̼ ❫❯ */iq › /iqtest* + _<mention>_
> _*Calcular el iq de alguna persona.*_
┃❀ᩧ̼ ❫❯ */meme*
> _*La bot te envía un meme aleatorio.*_
┃✿ᩧ̼ ❫❯ */morse* + _<text>_
> _*Convierte un texto a codigo morse.*_
┃❀ᩧ̼ ❫❯ */nombreninja*
> _*Busca un nombre ninja aleatorio.*_
┃✿ᩧ̼ ❫❯ */paja › /pajeame* + _<mention>_
> _*La bot te hace una paja o a un usuario.*_
┃❀ᩧ̼ ❫❯ */personalidad* + _<mention>_
> _*La bot busca tu personalidad o la de un usuario.*_
┃✿ᩧ̼ ❫❯ */piropo*
> _*Lanza un piropo.*_
┃❀ᩧ̼ ❫❯ */pregunta* + _<pregunta>_
> _*Hazle una pregunta a la bot.*_
┃✿ᩧ̼ ❫❯ */ship › /pareja* + _<mention>_
> _*La bot te da la probabilidad de enamorarte de una persona.*_
┃❀ᩧ̼ ❫❯ */sorteo*
> _*Empieza un sorteo.*_
┃✿ᩧ̼ ❫❯ */top* + _<cantidad>_
> _*Empieza un top de personas.*_
┃❀ᩧ̼ ❫❯ */formartrio* + _<mention1> <mention2>_
> _*Forma un trio aleatorio.*_
┃✿ᩧ̼ ❫❯ */ahorcado*
> _*Diviertete con la bot jugando el juego ahorcado.*_
┃❀ᩧ̼ ❫❯ */mates › /matematicas*
> _*Responde las preguntas de matemáticas para ganar recompensas.*_
┃✿ᩧ̼ ❫❯ */ppt* + _<piedra|papel|tijera>_
> _*Juega piedra papel o tijeras con la bot.*_
┃❀ᩧ̼ ❫❯ */sopa › /buscarpalabra*
> _*Juega el famoso juego de sopa de letras.*_
┃✿ᩧ̼ ❫❯ */pvp › /suit* + _<mention>_
> _*Juega un pvp contra otro usuario.*_
┃❀ᩧ̼ ❫❯ */ttt*
> _*Crea una sala de juego Ta Te Ti.*_
╰ׅ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴  ֢ ⋱࣭ ᩴ   ⋮֔    ᩴ ⋰ ֢ ╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴╯ׅ

©  Made ᑲᥡ wirk ✌︎
    `.trim()

  await conn.sendMessage(m.chat, { 
      text: txt,
      contextInfo: {
          mentionedJid: [m.sender, userId],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: channelRD.id,
              newsletterName: channelRD.name,
              serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
              title: botname,
              body: textbot,
              thumbnailUrl: banner,
              sourceUrl: redes,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: m })

}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']

export default handler

function clockString(ms) {
    let seconds = Math.floor((ms / 1000) % 60)
    let minutes = Math.floor((ms / (1000 * 60)) % 60)
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
    return `${hours}h ${minutes}m ${seconds}s`
}
