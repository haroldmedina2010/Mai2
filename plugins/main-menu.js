let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let user = global.db.data.users[userId]
    let name = conn.getName(userId)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length
    
    let txt = `
*🌸ི⏝︶ 𖦆 ︶⏝︶ ⸜(｡˃ ᵕ ˂ )⸝🌺*

💖✨ ¡Holis @${userId.split('@')[0]}! ✨💖
_🪴 Bienvenido/a al menú de @${botname}~_
*¡Espero que tengas un día súper lindo! ꒰ᐢ. .ᐢ꒱₊˚⊹*

╭ ─ ─ ─ ─ ʚ ♡ ɞ ─ ─ ─ ─ ╮
🌸꒱  *Usuario ›* @${userId.split('@')[0]}
🍡꒱  *Modo ›* Publico
 ☕︎꒱  *Bot ›* ${(conn.user.jid == global.conn.user.jid ? 'Principal 🅥' : 'Prem Bot 🅑')}
🎀꒱  *Activa ›* ${uptime}
⋆┄┄┄┄┄┄┄┄┄┄┄┄┄⋆
🧸꒱  *Usuarios Totales ›* ${totalreg}
🍭꒱  *Comanditos ›* ${totalCommands}
💌꒱  *Baileys ›* Multi Device
╰ ─ ─ ─ ─ ʚ ♡ ɞ ─ ─ ─ ─ ╯

¡Puedes tener tu propio *Sub-Bot*! Usa */qr* o */code* ✨

꒰ ‧₊˚ ☁️ *INFO-BOT * 🌷‧₊˚ ꒱
୨୧ ꒱  */menu › /help*
> _¡Mira todos mis lindos comandos!_
୨୧ ꒱  */uptime › /runtime*
> _¿Cuánto tiempo llevo despierto/a?_
୨୧ ꒱  */sc › /script*
> _El lugarcito donde nací 🏠_
୨୧ ꒱  */staff › /colaboradores*
> _Las personitas que me crearon 😇_
୨୧ ꒱  */serbot › /serbot code*
> _¡Crea tu propio mini-bot conmigo!_
୨୧ ꒱  */bots › /sockets*
> _Mira los Sub-Bots que andan por aquí_
୨୧ ꒱  */creador*
> _Habla con mi creador_
୨୧ ꒱  */status › /estado*
> _¿Cómo me siento hoy?_
୨୧ ꒱  */links › /grupos*
> _Mis grupitos oficiales_
୨୧ ꒱  */infobot*
> _Toda mi información secreta (¡shhh!)_
୨୧ ꒱  */sug › /newcommand* + _<sugerencia>_
> _¿Tienes una idea genial? ¡Cuéntame!_
୨୧ ꒱  */ping › /p*
> _¡Mide qué tan rápido soy!_
୨୧ ꒱  */reporte › /reportar* + _<error>_
> _Si algo no va bien, dímelo para arreglarlo_
୨୧ ꒱  */sistema › /system*
> _Mira dónde vivo yo_
୨୧ ꒱  */speed › /speedtest*
> _Mi velocidad secreta 🤫_
୨୧ ꒱  */views › /usuarios*
> _¿Cuántos amigos tengo registrados?_
୨୧ ꒱  */funciones › /totalfunciones*
> _Todas las cosas que puedo hacer_
୨୧ ꒱  */ds › /fixmsgespera*
> _Ayúdame a limpiar un poquito_
୨୧ ꒱  */editautoresponder* + _<prompt>_
> _Personaliza mis respuestas~_
╰ ─ ─ ─ ─ ୨ ♡ ୧ ─ ─ ─ ─ ╯

꒰ ‧₊˚ ☁️ *BUSCADORES Mágicos* 🌷‧₊˚ ꒱
୨୧ ꒱  */tiktoksearch › /tiktoks* + _<query>_
> _Encuentra videos divertidos de TikTok!_
୨୧ ꒱  */tweetposts* + _<query>_
> _Busca cositas en Twitter/X_
୨୧ ꒱  */ytsearch › /yts* + _<query>_
> _Encuentra videos en YouTube 🎶_
୨୧ ꒱  */githubsearch* + _<user|repository>_
> _Busca tesoros en GitHub 💎_
୨୧ ꒱  */cuevana › /cuevanasearch* + _<query>_
> _Encuentra películas y series en Cuevana 🎬_
୨୧ ꒱  */google* + _<query>_
> _Pregúntale a San Google_
୨୧ ꒱  */pin › /pinterest* + _<query>_
> _Encuentra imágenes bonitas en Pinterest_
୨୧ ꒱  */imagen › /image* + _<query>_
> _Busca imágenes en Google_
୨୧ ꒱  */infoanime* + _<anime>_
> _Información sobre tu anime favorito 🍜_
୨୧ ꒱  */hentaisearch › /searchhentai* + _<tag>_
> _(⁄⁄>⁄ ▽ ⁄<⁄⁄) busca cap... capítulos..._
୨୧ ꒱  */xnxxsearch › /xnxxs* + _<query>_
> _(｡>﹏<｡) busca videitos..._
୨୧ ꒱  */xvsearch › /xvideossearch* + _<query>_
> _(>///<) busca más videitos..._
୨୧ ꒱  */pornhubsearch › /phsearch* + _<query>_
> _(๑• . •๑) Busca videos de Pornhub_
୨୧ ꒱  */npmjs* + _<query>_
> _Busca paquetes de npmjs_
╰ ─ ─ ─ ─ ୨ ♡ ୧ ─ ─ ─ ─ ╯

꒰ ‧₊˚ ☁️ *DESCARGAS Kawaii* 🌷‧₊˚ ꒱
୨୧ ꒱  */tiktok › /tt* + _<url|query>_
> _Descarga videos de TikTok rápido!_
୨୧ ꒱  */mediafire › /mf* + _<url>_
> _Descarga archivos de MediaFire_
୨୧ ꒱  */pinvid › /pinvideo* + _<url>_
> _Descarga videos de Pinterest_
୨୧ ꒱  */mega › /mg* + _<url>_
> _Descarga archivos de MEGA_
୨୧ ꒱  */play › /play2 › /mp3 › /mp4* + _<url|query>_
> _Descarga música o videos de YouTube 🎶_
୨୧ ꒱  */ytmp3 › /ytmp4* + _<url>_
> _Descarga música o videos de YouTube con link_
୨୧ ꒱  */fb › /facebook* + _<url>_
> _Descarga videos de Facebook_
୨୧ ꒱  */twitter › /x* + _<url>_
> _Descarga videos de Twitter/X_
୨୧ ꒱  */ig › /instagram* + _<url>_
> _Descarga fotos y videos de Instagram_
୨୧ ꒱  */tts › /tiktoks* + _<query>_
> _Encuentra videos de tiktok_
୨୧ ꒱  */terabox › /tb* + _<url>_
> _Descarga archivos de Terabox_
୨୧ ꒱  */ttimg › /ttmp3* + _<url>_
> _Descarga fotos o audios de tiktok_
୨୧ ꒱  */gitclone* + _<url>_
> _Clona un repositorio de github_
୨୧ ꒱  */xvideosdl* + _<url>_
> _(๑˃́ᗩ˂̀) Descarga videos porno de Xvideos_
୨୧ ꒱  */xnxxdl* + _<url>_
> _(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄) Descarga videos porno de xnxx_
୨୧ ꒱  */apk › /modapk* + _<query>_
> _Busca y descarga apks de Aptoide_
୨୧ ꒱  */tiktokrandom › /ttrandom*
> _Un video de tiktok al azar ✨_
୨୧ ꒱  */npmdl › /npmdownloader* + _<query>_
> _Descarga paquetes de NPMJs_
╰ ─ ─ ─ ─ ୨ ♡ ୧ ─ ─ ─ ─ ╯

꒰ ‧₊˚ ☁️ *ECONOMÍA Tierna* 🌷‧₊˚ ꒱
୨୧ ꒱  */work › /w › /trabajar*
> _¡A ganar ${moneda} con esfuerzo!_
୨୧ ꒱  */slut › /protituirse*
> _(>///<) Un trabajo... especial_
୨୧ ꒱  */coinflip › /cf › /suerte* + _<cantidad>_
> _Cara o cruz, ¿tendrás suerte?_
୨୧ ꒱  */crime › /crimen*
> _(눈_눈) Intenta un crimen..._
୨୧ ꒱  */roulette › /ruleta › /rt* + _<cantidad> <color>_
> _Apuesta en la ruleta mágica_
୨୧ ꒱  */casino › /apostar* + _<cantidad>_
> _Prueba suerte en el casino ✨_
୨୧ ꒱  */slot* + _<cantidad>_
> _Apostando en la máquina tragamonedas_
୨୧ ꒱  */wallet › /cartera* + _<mention>_
> _Mira cuántas ${moneda} tienes_
୨୧ ꒱  */bank › /banco* + _<mention>_
> _Tus ahorros en el banco 🏦_
୨୧ ꒱  */deposit › /depositar › /d* + _<cantidad|all>_
> _Guarda tus ${moneda} en el banco_
୨୧ ꒱  */withdraw › /retirar › /with* + _<cantidad|all>_
> _Saca tus ${moneda} del banco_
୨୧ ꒱  */transfer › /pay* + _<cantidad> <mention>_
> _Comparte tus ${moneda} o XP con amigos_
୨୧ ꒱  */mine › /minar › /miming*
> _¡A minar para encontrar tesoros! ⛏️_
୨୧ ꒱  */buy › /buyall* + _<cantidad|all>_
> _Cambia tu XP por ${moneda}_
୨୧ ꒱  */daily › /diario*
> _Tu regalito diario 🎁_
୨୧ ꒱  */cofre*
> _Un cofre lleno de sorpresas diarias!_
୨୧ ꒱  */weekly › /semanal*
> _Tu regalo de la semana ✨_
୨୧ ꒱  */monthly › /mensual*
> _Tu recompensa del mes 🎉_
୨୧ ꒱  */steal › /robar › /rob* + _<mention>_
> _(¬_¬ ) Intenta robar ${moneda}..._
୨୧ ꒱  */robarxp › /robxp* + _<mention>_
> _(〃＞皿＜) Intenta robar XP..._
୨୧ ꒱  */economyboard › /eboard › /baltop*
> _Quién tiene más ${moneda}?_
୨୧ ꒱  */adventure › /aventura*
> _Embárcate en una aventura! 🗺️_
୨୧ ꒱  */heal › /curar*
> _Cura tus heridas para seguir aventurando ❤️‍🩹_
୨୧ ꒱  */hunt › /cazar › /berburu*
> _¡A cazar animalitos (virtuales)!_
୨୧ ꒱  */inv › /inventario*
> _Mira todas tus cositas ✨_
୨୧ ꒱  */explorar › /mazmorra*
> _Explora mazmorras secretas! 🗝️_
୨୧ ꒱  */halloween*
> _Dulce o truco! (Solo en Halloween)_
୨୧ ꒱  */christmas › /navidad*
> _Tu regalo navideño! (Solo en Navidad) 🎄_
╰ ─ ─ ─ ─ ୨ ♡ ୧ ─ ─ ─ ─ ╯

꒰ ‧₊˚ ☁️ *GACHA Suavecito* 🌷‧₊˚ ꒱
୨୧ ꒱  */rollwaifu › /rw › /roll*
> _Encuentra tu waifu o husbando ideal!_
୨୧ ꒱  */claim › /c › /reclamar* + _<mention waifu>_
> _Adopta un personaje_
୨୧ ꒱  */harem › /waifus › /claims*
> _Mira los personajes que has adoptado_
୨୧ ꒱  */charimage › /waifuimage › /wimage* + _<waifu>_
> _Una fotito de tu personaje favorito 📸_
୨୧ ꒱  */charinfo › /winfo › /waifuinfo* + _<waifu>_
> _Toda la info de un personaje_
୨୧ ꒱  */givechar › /givewaifu › /regalar* + _<mention> <waifu>_
> _Regala un personaje a un amigo!_
୨୧ ꒱  */vote › /votar* + _<waifu>_
> _Vota por tu personaje preferido_
୨୧ ꒱  */waifusboard › /waifustop › /topwaifus*
> _Los personajes más valiosos ✨_
╰ ─ ─ ─ ─ ୨ ♡ ୧ ─ ─ ─ ─ ╯

꒰ ‧₊˚ ☁️ *STICKERS Adorables* 🌷‧₊˚ ꒱
୨୧ ꒱  */sticker › /s*
> _¡Crea stickers lindos de tus fotos o videos!_
୨୧ ꒱  */setmeta* + _<packname> | <author>_
> _Ponle nombre y autor a tus stickers_
୨୧ ꒱  */delmeta*
> _Elimina tu pack de stickers_
୨୧ ꒱  */pfp › /getpic* + _<mention>_
> _Mira la foto de perfil de alguien 👀_
୨୧ ꒱  */qc* + _<text|mention>_
> _Crea stickers con texto o de un amigo!_
୨୧ ꒱  */toimg › /img*
> _Convierte stickers en imágenes_
୨୧ ꒱  */brat › /ttp › /attp*︎ + _<text>_
> _Stickers con texto animado!_
୨୧ ꒱  */emojimix* + _<emoji1+emoji2>_
> _¡Combina 2 emojis para un sticker único!_
୨୧ ꒱  */wm › /take* + _<packname> | <author>_
> _Cambia el nombre de tus stickers_
╰ ─ ─ ─ ─ ୨ ♡ ୧ ─ ─ ─ ─ ╯

꒰ ‧₊˚ ☁️ *HERRAMIENTAS Mágicas* 🌷‧₊˚ ꒱
୨୧ ꒱  */calcular › /cal* + _<ecuacion>_
> _Resuelve ecuaciones fácilmente!_
୨୧ ꒱  */tiempo › /clima* + _<pais|ciudad>_
> _Mira el clima de un lugar ☀️☁️_
୨୧ ꒱  */horario*
> _Los horarios del mundo_
୨୧ ꒱  */fake › /fakereply* + _<mention> <text>_
> _Crea un mensaje falso divertido!_
୨୧ ꒱  */enhance › /remini › /hd*
> _Mejora la calidad de tus fotos ✨_
୨୧ ꒱  */letra* + _<text>_
> _Cambia la fuente de tus mensajes_
୨୧ ꒱  */read › /readviewonce › /ver*
> _Mira imágenes de una sola vista (sin que se enteren!)_
୨୧ ꒱  */whatmusic › /shazam*
> _Descubre el nombre de esa canción! 🎶_
୨୧ ꒱  */ss › /ssweb* + _<url>_
> _Mira cómo se ve una página web_
୨୧ ꒱  */length › /tamaño*
> _Cambia el tamaño de imágenes y videos_
୨୧ ꒱  */say › /decir* + _<text>_
> _Repite lo que digo!_
୨୧ ꒱  */todoc › /toducument*
> _Convierte audios, imágenes y videos en documentos_
୨୧ ꒱  */translate › /traducir › /trad* + _<idioma> <text>_
> _Habla en otros idiomas! 🌎_
╰ ─ ─ ─ ─ ୨ ♡ ୧ ─ ─ ─ ─ ╯

꒰ ‧₊˚ ☁️ *PERFIL Encantador* 🌷‧₊˚ ꒱
୨୧ ꒱  */reg › /verificar › /register* + _<nombre.edad>_
> _Regístrate para ser mi amigo/a!_
୨୧ ꒱  */unreg*
> _Si ya no quieres ser mi amigo/a... (ಥ﹏ಥ)_
୨୧ ꒱  */profile › /perfil* + _<mention>_
> _Mira tu perfil o el de un amigo!_
୨୧ ꒱  */marry* + _<mention>_
> _¡Propón matrimonio a tu crush! 💍_
୨୧ ꒱  */divorce*
> _Si ya no va más... 💔_
୨୧ ꒱  */setgenre › /setgenero* + _<hombre|mujer>_
> _Cuéntame si eres chico o chica_
୨୧ ꒱  */delgenre › /delgenero*
> _Ya no quieres decir tu género?_
୨୧ ꒱  */setbirth › /setnacimiento* + _<dia/mes/año|mes/dia>_
> _Cuándo es tu cumple? 🎂_
୨୧ ꒱  */delbirth › /delnacimiento*
> _No quieres que sepa tu cumple?_
୨୧ ꒱  */setdescription › /setdesc* + _<text>_
> _Pon una descripción genial en tu perfil!_
୨୧ ꒱  */deldescription › /deldesc*
> _Quita la descripción_
୨୧ ꒱  */lboard › /lb* + _<pagina>_
> _Quién tiene más experiencia y nivel?_
୨୧ ꒱  */level › /lvl* + _<mention>_
> _Mira tu nivel actual ✨_
୨୧ ꒱  */comprarpremium › /premium*
> _Sé premium para usarme sin límites!_
୨୧ ꒱  */confesiones › /confesar* + _<mention> <mensaje>_
> _Dile algo a alguien en secreto~ 🤫_
╰ ─ ─ ─ ─ ୨ ♡ ୧ ─ ─ ─ ─ ╯

꒰ ‧₊˚ ☁️ *GRUPOS Divertidos* 🌷‧₊˚ ꒱
୨୧ ꒱  */hidetag* + _<text>_
> _Envía un mensaje que todos verán!_
୨୧ ꒱  */groupinfo › /gp*
> _La info del grupo ✨_
୨୧ ꒱  */listonline › /linea*
> _Mira quién está en línea ahora_
୨୧ ꒱  */setwelcome* + _<text>_
> _Un mensaje lindo para los nuevos miembros!_
୨୧ ꒱  */setbye* + _<text>_
> _Un mensaje triste para los que se van (;-;)_
୨୧ ꒱  */link*
> _El link para que entren más amigos!_
୨୧ ꒱  */admins › /admin*
> _Llama a los admins si necesitas ayuda_
୨୧ ꒱  */revoke › /restablecer*
> _Cambia el link del grupo_
୨୧ ꒱  */group › /grupo* + _<open|close>_
> _Abre o cierra el grupo_
୨୧ ꒱  */kick* + _<mention>_
> _Saca a alguien del grupo (solo si es necesario!)_
୨୧ ꒱  */add › /añadir › /agregar* + _<numero>_
> _Invita a un amigo al grupo!_
୨୧ ꒱  */promote* + _<mention>_
> _Haz admin a un amigo!_
୨୧ ꒱  */demote* + _<mention>_
> _Quita el admin a alguien_
୨୧ ꒱  */setgpbaner › /groupimg*
> _Cambia la foto del grupo_
୨୧ ꒱  */setgpname › /groupname* + _<text>_
> _Cambia el nombre del grupo_
୨୧ ꒱  */setgpdesc › /groupdesc* + _<text>_
> _Cambia la descripción del grupo_
୨୧ ꒱  */warn › /advertir › /warning* + _<mention> <razon>_
> _Dale una advertencia a alguien_
୨୧ ꒱  */unwarn › /delwarn* + _<mention>_
> _Quita una advertencia_
୨୧ ꒱  */advlist › /listadv*
> _Mira quién tiene advertencias_
୨୧ ꒱  */bot* + _<on|off>_
> _Enciéndeme o apágame en este grupo_
୨୧ ꒱  */mute* + _<mention>_
> _Ya no veré los mensajes de este usuario_
୨୧ ꒱  */unmute* + _<mention>_
> _Volveré a ver los mensajes de este usuario_
୨୧ ꒱  */encuesta › /poll* + _<pregunta|opcion1|opcion2...>_
> _Crea una encuesta divertida!_
୨୧ ꒱  */delete › /del*
> _Elimina mis mensajes_
୨୧ ꒱  */fantasmas*
> _Mira quiénes no hablan mucho (👻)_
୨୧ ꒱  */kickfantasmas*
> _Saca a los que no hablan (｡>ㅅ<｡)_
୨୧ ꒱  */invocar › /tagall › /todos* + _<text>_
> _¡Llama a todos los del grupo!_
୨୧ ꒱  */setemoji › /setemo* + _<emoji>_
> _Cambia el emoji de la invitación_
୨୧ ꒱  */listnum › /kicknum* + _<prefijo>_
> _Saca usuarios por su prefijo de país_
╰ ─ ─ ─ ─ ୨ ♡ ୧ ─ ─ ─ ─ ╯

꒰ ‧₊˚ ☁️ *ANIME y Reacciones Kawaii* 🌷‧₊˚ ꒱
୨୧ ꒱  */angry › /enojado* + _<mention>_
> _(╬ Ò ‸ Ó) ¡Estoy enojado/a!_
୨୧ ꒱  */bite* + _<mention>_
> _(๑•́ ₃ •̀๑) Muerde a un amigo!_
୨୧ ꒱  */bleh* + _<mention>_
> _😛 Saca la lengua!_
୨୧ ꒱  */blush* + _<mention>_
> _(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄) ¡Me sonrojo!_
୨୧ ꒱  */bored › /aburrido* + _<mention>_
> _(｡•́︿•̀｡) Qué aburrido..._
୨୧ ꒱  */cry* + _<mention>_
> _(╥﹏╥) Llorando por ti..._
୨୧ ꒱  */cuddle* + _<mention>_
> _(๑´ cuddle \`๑) Acurruquémonos!_
୨୧ ꒱  */dance* + _<mention>_
> _٩(｡˃ ᵕ ˂ )و ¡A bailar!_
୨୧ ꒱  */drunk* + _<mention>_
> _(っ˘з(˘⌣˘ ) Está medio borracho/a_
୨୧ ꒱  */eat › /comer* + _<mention>_
> _(๑>ڡ<๑) ¡Comamos algo rico!_
୨୧ ꒱  */facepalm* + _<mention>_
> _(－_－) Palmada en la cara_
୨୧ ꒱  */happy › /feliz* + _<mention>_
> _ヽ(✿ﾟ▽ﾟ)ノ ¡Qué feliz estoy!_
୨୧ ꒱  */hug* + _<mention>_
> _(づ｡◕‿‿◕｡)づ ¡Abrazo!_
୨୧ ꒱  */impregnate › /preg* + _<mention>_
> _(ง ื▿ ื)ว ¡Ups!_
୨୧ ꒱  */kill* + _<mention>_
> _(｡>_<｡) ¡Te mato! (en el juego)_
୨୧ ꒱  */kiss › /besar › /kiss2* + _<mention>_
> _( ´ kiss \` ) ¡Besito!_
୨୧ ꒱  */laugh* + _<mention>_
> _ꉂ(ˊᗜˋ*) ¡Jajaja!_
୨୧ ꒱  */lick* + _<mention>_
> _(っ◔﹏◔)っ Lamiendo!_
୨୧ ꒱  */love › /amor* + _<mention>_
> _(｡･ω･｡)ﾉ♡ ¡Te quiero!_
୨୧ ꒱  */pat* + _<mention>_
> _(っ´ω\`)ﾉ(╥ω╥) Palmadita_
୨୧ ꒱  */poke* + _<mention>_
> _👉 Poke!_
୨୧ ꒱  */pout* + _<mention>_
> _(｡>_<｡) Haciendo pucheros_
୨୧ ꒱  */punch* + _<mention>_
> _👊 Puñetazo!_
୨୧ ꒱  */run* + _<mention>_
> _ε=ε=┌(;￣▽￣)┘ ¡A correr!_
୨୧ ꒱  */sad › /triste* + _<mention>_
> _(｡•́ _ •̀｡) Estoy triste_
୨୧ ꒱  */scared* + _<mention>_
> _(>_<) ¡Qué miedo!_
୨୧ ꒱  */seduce* + _<mention>_
> _( ͡° ͜ʖ ͡°) ... seduciendo_
୨୧ ꒱  */shy › /timido* + _<mention>_
> _(⁄ ⁄•⁄ω⁄•⁄ ⁄) Qué tímido/a_
୨୧ ꒱  */slap* + _<mention>_
> _👋 Bofetada!_
୨୧ ꒱  */dias › /days* + _<mention>_
> _☀️ ¡Buenos días!_
୨୧ ꒱  */noches › /nights* + _<mention>_
> _🌙 ¡Buenas noches!_
୨୧ ꒱  */sleep* + _<mention>_
> _(๑˘ ˘ sleepy) A dormir..._
୨୧ ꒱  */smoke* + _<mention>_
> _🚬 Fumando..._
୨୧ ꒱  */think* + _<mention>_
> _🤔 Pensando..._
╰ ─ ─ ─ ─ ୨ ♡ ୧ ─ ─ ─ ─ ╯

꒰ ‧₊˚ ☁️ *NSFW (Solo si eres mayor 😉)* 🌷‧₊˚ ꒱
୨୧ ꒱  */anal* + _<mention>_
> _(*/ω＼*) Anal..._
୨୧ ꒱  */waifu*
> _Busca una waifu aleatoria... ( ͡° ͜ʖ ͡°)_
୨୧ ꒱  */bath* + _<mention>_
> _🛀 A bañarse!_
୨୧ ꒱  */blowjob › /mamada › /bj* + _<mention>_
> _( ͡°⁄ ⁄ ͜⁄ ⁄ʖ⁄ ⁄ ͡°) Mamada..._
୨୧ ꒱  */boobjob* + _<mention>_
> _(*/ω＼*) Rusa..._
୨୧ ꒱  */cum* + _<mention>_
> _(っ´Ι\`)っ ... viniéndose_
୨୧ ꒱  */fap* + _<mention>_
> _( ͡° ͜ʖ ͡°) Haciéndose una paja..._
୨୧ ꒱  */ppcouple › /ppcp*
> _Fotos para parejas o amigos!_
୨୧ ꒱  */footjob* + _<mention>_
> _(*/ω＼*) Paja con los pies..._
୨୧ ꒱  */fuck › /coger › /fuck2* + _<mention>_
> _( ͡° ͜ʖ ͡°) Follarte..._
୨୧ ꒱  */cafe › /coffe* + _<mention>_
> _☕ Un cafecito?_
୨୧ ꒱  */violar › /perra* + _<mention>_
> _(｀ з´) ¡Te violo! (en el juego)_
୨୧ ꒱  */grabboobs* + _<mention>_
> _(っ grab boobs \` ) Agarrando..._
୨୧ ꒱  */grope* + _<mention>_
> _( ͡° ͜ʖ ͡°) Manoseando..._
୨୧ ꒱  */lickpussy* + _<mention>_
> _(っ lick pussy \` ) Lamiendo..._
୨୧ ꒱  */rule34 › /r34* + _<tag>_
> _(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄) Busca imágenes en Rule34_
୨୧ ꒱  */sixnine › /69* + _<mention>_
> _( ͡° ͜ʖ ͡°) Haciendo un 69..._
୨୧ ꒱  */spank › /nalgada* + _<mention>_
> _🍑 Nalgada!_
୨୧ ꒱  */suckboobs* + _<mention>_
> _(っ suck boobs \` ) Chupando..._
୨୧ ꒱  */undress › /encuerar* + _<mention>_
> _(*/ω＼*) Desnudando..._
୨୧ ꒱  */yuri › /tijeras* + _<mention>_
> _( ͡° ͜ʖ ͡°) Tijeras..._
╰ ─ ─ ─ ─ ୨ ♡ ୧ ─ ─ ─ ─ ╯

꒰ ‧₊˚ ☁️ *JUEGOS Divertidos* 🌷‧₊˚ ꒱
୨୧ ꒱  */amistad › /amigorandom*
> _Haz amigos con un juego! 🥰_
୨୧ ꒱  */chaqueta › /jalamela* + _<mention>_
> _(*/ω＼*) ... eso..._
୨୧ ꒱  */chiste*
> _Te cuento un chiste para que rías! 😂_
୨୧ ꒱  */consejo*
> _Un consejito para ti ✨_
୨୧ ꒱  */doxeo › /doxear* + _<mention>_
> _(눈_눈) Doxeo falso!_
୨୧ ꒱  */facto*
> _Un dato interesante!_
୨୧ ꒱  */formarpareja*
> _Encuentra tu pareja ideal (del juego)!_
୨୧ ꒱  */formarpareja5*
> _5 parejas al azar!_
୨୧ ꒱  */frase*
> _Una frase bonita para ti_
୨୧ ꒱  */huevo* + _<mention>_
> _🥚 Agarra el huevo de alguien!_
୨୧ ꒱  */chupalo* + _<mention>_
> _( ͡° ͜ʖ ͡°) Haz que te la chupe..._
୨୧ ꒱  */aplauso* + _<mention>_
> _👏 ¡Aplausos para ti!_
୨୧ ꒱  */marron* + _<mention>_
> _(¬_¬ ) Burlándome del color de piel..._
୨୧ ꒱  */suicidar*
> _(｡>ㅅ<｡) Suicidate... (en el juego)_
୨୧ ꒱  */iq › /iqtest* + _<mention>_
> _Calcula el IQ de alguien_
୨୧ ꒱  */meme*
> _Un meme para hacerte reír!_
୨୧ ꒱  */morse* + _<text>_
> _Traduce texto a código morse_
୨୧ ꒱  */nombreninja*
> _Un nombre ninja genial para ti!_
୨୧ ꒱  */paja › /pajeame* + _<mention>_
> _(*/ω＼*) Te hago una paja..._
୨୧ ꒱  */personalidad* + _<mention>_
> _Descubre tu personalidad!_
୨୧ ꒱  */piropo*
> _Un piropo para alegrarte el día!_
୨୧ ꒱  */pregunta* + _<pregunta>_
> _Pregúntame lo que quieras!_
୨୧ ꒱  */ship › /pareja* + _<mention>_
> _¿Hay amor entre ustedes? ❤️_
୨୧ ꒱  */sorteo*
> _¡Empezamos un sorteo!_
୨୧ ꒱  */top* + _<cantidad>_
> _Un top de personas!_
୨୧ ꒱  */formartrio* + _<mention1> <mention2>_
> _Forma un trio al azar_
୨୧ ꒱  */ahorcado*
> _Juega al ahorcado conmigo!_
୨୧ ꒱  */mates › /matematicas*
> _Demuestra lo bueno que eres en mates!_
୨୧ ꒱  */ppt* + _<piedra|papel|tijera>_
> _Piedra, papel o tijeras conmigo!_
୨୧ ꒱  */sopa › /buscarpalabra*
> _A buscar palabras! 🔎_
୨୧ ꒱  */pvp › /suit* + _<mention>_
> _Un duelo contra otro usuario!_
୨୧ ꒱  */ttt*
> _Juega Ta Te Ti!_
╰ ─ ─ ─ ─ ୨ ♡ ୧ ─ ─ ─ ─ ╯

©  Hecho con 💖 por wirk ✌︎
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
