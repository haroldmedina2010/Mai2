import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import fetch from 'node-fetch'
import { promisify } from 'util' // Added for potential future use or clarification if needed
import ws from 'ws' // Added to reference ws.CLOSED

const { proto } = (await import('@whiskeysockets/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

// Make sure global.opts is defined somewhere, perhaps in index.js or config.js
// Example: global.opts = {}

// Make sure global.db.data is initialized before this handler runs
// Example: global.db = { data: { users: {}, chats: {}, settings: {}, stats: {} } }

// Make sure global.plugins is loaded before this handler runs
// Example: global.plugins = {} // Populated by loading plugin files

// Make sure global.owner, global.mods, global.prems, global.prefix are defined

export async function handler(chatUpdate) {
    this.msgqueque = this.msgqueque || []
    this.uptime = this.uptime || Date.now()
    if (!chatUpdate) return
    this.pushMessage(chatUpdate.messages).catch(console.error)
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    if (!m) return;

    // Ensure database is loaded
    if (global.db.data == null) await global.loadDatabase()

    try {
        m = smsg(this, m) || m // Process message using smsg
        if (!m) return // If smsg returns null, skip

        // Initialize message properties
        m.exp = 0
        m.coin = false

        // --- Database Initialization for User/Chat/Settings ---
        try {
            let user = global.db.data.users[m.sender]
            if (typeof user !== 'object') global.db.data.users[m.sender] = {}
            if (user) {
                // Initialize user properties if they don't exist
                if (!isNumber(user.exp)) user.exp = 0
                if (!isNumber(user.coin)) user.coin = 10
                if (!isNumber(user.joincount)) user.joincount = 1
                if (!isNumber(user.diamond)) user.diamond = 3
                if (!isNumber(user.lastadventure)) user.lastadventure = 0
                if (!isNumber(user.lastclaim)) user.lastclaim = 0
                if (!isNumber(user.health)) user.health = 100
                if (!isNumber(user.crime)) user.crime = 0
                if (!isNumber(user.lastcofre)) user.lastcofre = 0
                if (!isNumber(user.lastdiamantes)) user.lastdiamantes = 0
                if (!isNumber(user.lastpago)) user.lastpago = 0
                if (!isNumber(user.lastcode)) user.lastcode = 0
                if (!isNumber(user.lastcodereg)) user.lastcodereg = 0
                if (!isNumber(user.lastduel)) user.lastduel = 0
                if (!isNumber(user.lastmining)) user.lastmining = 0
                if (!('muto' in user)) user.muto = false
                if (!('premium' in user)) user.premium = false
                if (!user.premium) user.premiumTime = 0 // Initialize premiumTime if not premium
                if (!('registered' in user)) user.registered = false
                if (!('genre' in user)) user.genre = ''
                if (!('birth' in user)) user.birth = ''
                if (!('marry' in user)) user.marry = ''
                if (!('description' in user)) user.description = ''
                if (!('packstickers' in user)) user.packstickers = null
                if (!user.registered) {
                    if (!('name' in user)) user.name = m.name // Assuming m.name is available from smsg
                    if (!isNumber(user.age)) user.age = -1
                    if (!isNumber(user.regTime)) user.regTime = -1
                }
                if (!isNumber(user.afk)) user.afk = -1
                if (!('afkReason' in user)) user.afkReason = ''
                if (!('role' in user)) user.role = 'Nuv'
                if (!('banned' in user)) user.banned = false
                if (!('useDocument' in user)) user.useDocument = false
                if (!isNumber(user.level)) user.level = 0
                if (!isNumber(user.bank)) user.bank = 0
                if (!isNumber(user.warn)) user.warn = 0
                // Ensure antispam is initialized
                if (!isNumber(user.antispam)) user.antispam = 0
                 if (!isNumber(user.antispam2)) user.antispam2 = 0 // Assuming antispam2 exists
                if (!isNumber(user.spam)) user.spam = 0 // Initialize spam timestamp
            } else {
                 // Create new user entry with default values
                global.db.data.users[m.sender] = {
                    exp: 0,
                    coin: 10,
                    joincount: 1,
                    diamond: 3,
                    lastadventure: 0,
                    health: 100,
                    lastclaim: 0,
                    lastcofre: 0,
                    lastdiamantes: 0,
                    lastcode: 0,
                    lastduel: 0,
                    lastpago: 0,
                    lastmining: 0,
                    lastcodereg: 0,
                    muto: false,
                    registered: false,
                    genre: '',
                    birth: '',
                    marry: '',
                    description: '',
                    packstickers: null,
                    name: m.name, // Assuming m.name is available
                    age: -1,
                    regTime: -1,
                    afk: -1,
                    afkReason: '',
                    banned: false,
                    useDocument: false,
                    bank: 0,
                    level: 0,
                    role: 'Nuv',
                    premium: false,
                    premiumTime: 0,
                    antispam: 0, // Initialize antispam for new users
                    antispam2: 0, // Initialize antispam2 for new users
                    spam: 0 // Initialize spam timestamp for new users
                }
            }

            let chat = global.db.data.chats[m.chat]
            if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}
            if (chat) {
                // Initialize chat properties if they don't exist
                if (!('isBanned' in chat)) chat.isBanned = false
                if (!('sAutoresponder' in chat)) chat.sAutoresponder = ''
                if (!('welcome' in chat)) chat.welcome = true
                if (!('autolevelup' in chat)) chat.autolevelup = false
                if (!('autoAceptar' in chat)) chat.autoAceptar = false
                if (!('autosticker' in chat)) chat.autosticker = false
                if (!('autoRechazar' in chat)) chat.autoRechazar = false
                if (!('autoresponder' in chat)) chat.autoresponder = false
                if (!('detect' in chat)) chat.detect = true
                if (!('antiBot' in chat)) chat.antiBot = false
                if (!('antiBot2' in chat)) chat.antiBot2 = false
                if (!('modoadmin' in chat)) chat.modoadmin = false // Renamed from modoadmin to isAdminMode for clarity? No, keeping original name.
                if (!('antiLink' in chat)) chat.antiLink = true
                if (!('reaction' in chat)) chat.reaction = false
                if (!('nsfw' in chat)) chat.nsfw = false
                if (!('antifake' in chat)) chat.antifake = false
                if (!('delete' in chat)) chat.delete = false
                if (!isNumber(chat.expired)) chat.expired = 0
                if (!('antiLag' in chat)) chat.antiLag = false
                if (!('per' in chat)) chat.per = []
            } else {
                 // Create new chat entry with default values
                global.db.data.chats[m.chat] = {
                    isBanned: false,
                    sAutoresponder: '',
                    welcome: true,
                    autolevelup: false,
                    autoresponder: false,
                    delete: false,
                    autoAceptar: false,
                    autoRechazar: false,
                    detect: true,
                    antiBot: false,
                    antiBot2: false,
                    modoadmin: false,
                    antiLink: true,
                    antifake: false,
                    reaction: false,
                    nsfw: false,
                    expired: 0,
                    antiLag: false,
                    per: [],
                }
            }

            var settings = global.db.data.settings[this.user.jid] // Use 'var' as in original
            if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
            if (settings) {
                 // Initialize settings properties if they don't exist
                if (!('self' in settings)) settings.self = false
                if (!('restrict' in settings)) settings.restrict = true
                if (!('jadibotmd' in settings)) settings.jadibotmd = true
                if (!('antiPrivate' in settings)) settings.antiPrivate = false
                if (!('autoread' in settings)) settings.autoread = false
                 // Assuming status exists
                 if (!('status' in settings)) settings.status = 0
            } else {
                 // Create new settings entry with default values
                global.db.data.settings[this.user.jid] = {
                    self: false,
                    restrict: true,
                    jadibotmd: true,
                    antiPrivate: false,
                    autoread: false,
                    status: 0
                }
            }
        } catch (e) {
            console.error("Error initializing DB data:", e)
        }
        // --- End Database Initialization ---


        const mainBot = global.conn.user.jid
        const chat = global.db.data.chats[m.chat] || {} // Ensure chat object exists
        const isSubbs = chat.antiLag === true // Assuming antiLag controls subscription like feature
        const allowedBots = chat.per || [] // Assuming 'per' is the list of allowed bot JIDs
        if (!allowedBots.includes(mainBot)) allowedBots.push(mainBot) // Ensure main bot is always allowed
        const isAllowed = allowedBots.includes(this.user.jid) // Check if current bot is allowed

        // Skip if antiLag is enabled and this bot is not allowed
        if (isSubbs && !isAllowed) return

        // Skip if nyimak mode is enabled
        if (opts['nyimak']) return
        // Skip if self mode is enabled and message is not from self
        if (!m.fromMe && opts['self']) return
        // Skip if swonly mode is enabled and message is not in status chat
        if (opts['swonly'] && m.chat !== 'status@broadcast') return

        // Ensure m.text is a string
        if (typeof m.text !== 'string') m.text = ''

        let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender] // Get user data

        // Determine user roles
        const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isOwner = isROwner || m.fromMe
        const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || (_user ? _user.premium == true : false) // Check premium from user data

        // Queque logic (moved earlier as it affects message processing order)
        if (opts['queque'] && m.text && !(isMods || isPrems)) {
            let queque = this.msgqueque, time = 1000 * 5 // 5 seconds delay
            const previousID = queque[queque.length - 1]
            queque.push(m.id || m.key.id) // Add current message ID to queque
            setInterval(async function () {
                // Remove previous message from queque once processed
                if (queque.indexOf(previousID) === -1) clearInterval(this)
                await delay(time) // Wait before processing the next message
            }, time)
        }

        // Skip if message is from Baileys internal process (usually takes care of itself)
        if (m.isBaileys) {
            return
        }

        // Grant EXP for the message
        m.exp += Math.ceil(Math.random() * 10)

        // Get group metadata, participants, user, and bot information
        const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
        const participants = (m.isGroup ? groupMetadata.participants : []) || []
        const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} // User in group context
        const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {} // Bot in group context
        const isRAdmin = user?.admin == 'superadmin' || false
        const isAdmin = isRAdmin || user?.admin == 'admin' || false // User is admin in group
        const isBotAdmin = bot?.admin || false // Bot is admin in group

        const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')

        // --- Plugin Iteration and Command Matching ---
        for (let name in global.plugins) {
            let plugin = global.plugins[name]
            if (!plugin) continue
            if (plugin.disabled) continue // Skip disabled plugins

            const __filename = join(___dirname, name)

            // Execute 'all' function for the plugin if it exists
            if (typeof plugin.all === 'function') {
                try {
                    await plugin.all.call(this, m, {
                        chatUpdate,
                        __dirname: ___dirname,
                        __filename
                    })
                } catch (e) {
                    console.error("Error in plugin.all:", e)
                }
            }

            // --- Command Parsing and Matching Logic (Handles Prefix and No Prefix) ---

            const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
            let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix // Determine plugin's prefix

            let usedPrefix = null;
            let command = null;
            let args = [];
            let text = '';
            let noPrefix = m.text; // Default noPrefix is the full text
            let match = null; // Keep track of the prefix match result if any

            // 1. Attempt to match with a prefix
            if (_prefix) { // Only attempt prefix matching if a prefix is defined
                let prefixMatches = (_prefix instanceof RegExp ?
                    [[_prefix.exec(m.text), _prefix]] :
                    Array.isArray(_prefix) ?
                        _prefix.map(p => {
                            let re = p instanceof RegExp ?
                                p :
                                new RegExp(str2Regex(p))
                            return [re.exec(m.text), re]
                        }) :
                        typeof _prefix === 'string' ?
                            [[new RegExp('^' + str2Regex(_prefix)).exec(m.text), new RegExp('^' + str2Regex(_prefix))]] : // Ensure prefix is at the start
                            null // No valid prefix definition
                );

                if (prefixMatches) {
                    let foundPrefixMatch = prefixMatches.find(p => p && p[0] && p[0][0]); // Find the first successful prefix match
                    if (foundPrefixMatch) {
                        match = foundPrefixMatch;
                        usedPrefix = match[0][0]; // The actual matched prefix string
                        noPrefix = m.text.slice(usedPrefix.length); // Text after the prefix
                        let parts = noPrefix.trim().split` `.filter(v => v);
                        command = (parts[0] || '').toLowerCase(); // First word after prefix is the command
                        args = parts.slice(1); // Rest are arguments
                        text = args.join` `; // Joined arguments as text
                    }
                }
            }

            let candidateCommand = command; // Use command found by prefix if any

            // 2. If no prefix match, consider the message text itself for a non-prefixed command
            if (usedPrefix === null) {
                 let rawParts = m.text.trim().split` `.filter(v => v);
                 candidateCommand = (rawParts[0] || '').toLowerCase(); // First word is candidate command
                 // args and text will be set later if this candidateCommand is accepted
                 // noPrefix remains m.text in this case
            }

             // Check if the candidate command is accepted by the plugin
             let isAccept = false;
             if (candidateCommand) { // Only check if there's a potential command word
                 isAccept = plugin.command instanceof RegExp ?
                     plugin.command.test(candidateCommand) :
                     Array.isArray(plugin.command) ?
                         plugin.command.some(cmd => cmd instanceof RegExp ?
                             cmd.test(candidateCommand) :
                             cmd === candidateCommand) :
                     typeof plugin.command === 'string' ?
                         plugin.command === candidateCommand :
                     false;
             }


            // --- If the command is accepted, process the plugin ---
            if (isAccept) {
                // Set the final command, args, text based on whether a prefix was used or not
                if (usedPrefix === null) {
                     // If accepted as non-prefixed, parse args/text from raw text
                    let rawParts = m.text.trim().split` `.filter(v => v);
                    command = (rawParts[0] || '').toLowerCase();
                    args = rawParts.slice(1);
                    text = args.join` `;
                    noPrefix = m.text; // Full text is noPrefix in this case
                     // usedPrefix remains null
                } else {
                     // If accepted with prefix, args/text/command are already parsed
                     // usedPrefix is already set
                     let parts = m.text.slice(usedPrefix.length).trim().split` `.filter(v => v);
                     command = (parts[0] || '').toLowerCase();
                     args = parts.slice(1);
                     text = args.join` `;
                     noPrefix = m.text.slice(usedPrefix.length);
                }

                global.comando = command; // Set global command variable

                 // --- Baileys ID Check (Anti-spam/flood? Original code had this) ---
                 // This check seems specific to certain message ID formats. Keep it as is.
                 if ((m.id.startsWith('NJX-') || (m.id.startsWith('BAE5') && m.id.length === 16) || (m.id.startsWith('B24E') && m.id.length === 20))) {
                     console.log("[HANDLER] Ignoring message with potentially internal Baileys ID:", m.id);
                     return // Skip processing this message
                 }


                // --- Banned User/Chat Checks ---
                // Ensure user/chat data is accessed safely
                const userDb = global.db.data.users[m.sender] || {};
                const chatDb = global.db.data.chats[m.chat] || {};

                // Check for banned user (unless it's the unban command or owner)
                if (userDb.banned && !isROwner && !['owner-unbanuser.js'].includes(name)) {
                     // Original code checks antispam > 2 for banned users before replying.
                     // Let's just reply and return if banned and not owner/unban cmd.
                     // The antispam logic might be separate.
                     m.reply(`《✦》Estas baneado/a, no puedes usar comandos en este bot!\n\n${userDb.bannedReason ? `✰ *Motivo:* ${userDb.bannedReason}` : '✰ *Motivo:* Sin Especificar'}\n\n> ✧ Si este Bot es cuenta oficial y tiene evidencia que respalde que este mensaje es un error, puedes exponer tu caso con un moderador.`);
                     // Original also increments antispam here, maybe keep that?
                     // userDb.antispam = (userDb.antispam || 0) + 1; // Re-initialize if needed
                     return; // Stop processing this command
                }
                // Check for banned chat (unless it's the unban chat command or owner exec)
                 // Original code seems to have slightly redundant/complex banned checks.
                 // Let's simplify: If chat is banned AND user is not owner/rowner AND plugin is not unbanchat/exec, return.
                if (chatDb.isBanned && !isROwner && !['grupo-unbanchat.js', 'owner-exec.js', 'owner-exec2.js', 'grupo-delete.js'].includes(name)) {
                     // No reply in original code, just return.
                     return; // Stop processing this command
                }

                // --- Antispam Check (Simplified from original, assuming separate spam counter) ---
                // Original code checks `user.antispam > 2` before the banned reply, and `user.antispam2 && isROwner`?
                // And a separate 3-second spam check using `user.spam`.
                // Let's keep the 3-second spam check as it's a common mechanism.
                // The `user.antispam` seems to be a separate counter possibly for detecting spam patterns over time.
                // The `user.antispam > 2` check might be blocking users temporary or permanently.
                // Let's keep the 3-second check and assume other spam handling is elsewhere or needs review.
                // if (userDb.antispam > ?) { /* handle based on intended antispam logic */ }
                // if (userDb.antispam2 && isROwner) return; // Unclear what antispam2 does for ROwner. Keeping original.
                if (userDb.antispam2 && isROwner) return

                let spamTime = userDb.spam || 0; // Get last spam timestamp, default to 0
                const spamDelay = 3000; // 3 seconds
                if (new Date - spamTime < spamDelay && !isOwner && !isROwner && !isPrems) { // Apply spam check to non-owners/premiums
                     // console.log(`[ SPAM ] ${m.sender}`); // Optional: log spam
                     return; // Ignore message due to spam
                }
                 // Update spam timestamp after a successful command execution starts
                 if (!isOwner && !isROwner && !isPrems) { // Don't update for owners/premiums
                     global.db.data.users[m.sender].spam = new Date * 1;
                 }


                // --- Admin Mode Check ---
                // If admin mode is enabled in a group, only allow ROwner, Owner, or Admin to use commands.
                // Original check: `if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && mini) return`
                // 'mini' was a complex check. Let's simplify: In adminMode, only allow commands from ROwner, Owner, or Admin in groups.
                let adminMode = chatDb.modoadmin;
                if (adminMode && m.isGroup && !isROwner && !isOwner && !isAdmin) {
                    // Optional: Reply indicating admin mode is on
                    // m.reply('🔒 Admin mode is enabled in this group. Only admins can use commands.');
                    return; // Block command execution
                }


                // --- Plugin Role and Permission Checks ---
                // These checks happen *after* adminMode and banned checks
                if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) {
                    fail('owner', m, this); // Calls dfail with type 'owner'
                    continue; // Skip to the next plugin
                }
                if (plugin.rowner && !isROwner) {
                    fail('rowner', m, this);
                    continue;
                }
                if (plugin.owner && !isOwner) {
                    fail('owner', m, this);
                    continue;
                }
                if (plugin.mods && !isMods) {
                    fail('mods', m, this);
                    continue;
                }
                if (plugin.premium && !isPrems) {
                    fail('premium', m, this);
                    continue;
                }
                if (plugin.group && !m.isGroup) {
                    fail('group', m, this);
                    continue;
                } else if (m.isGroup) { // These checks only apply in groups
                    if (plugin.botAdmin && !isBotAdmin) {
                        fail('botAdmin', m, this);
                        continue;
                    }
                    if (plugin.admin && !isAdmin) {
                        fail('admin', m, this);
                        continue;
                    }
                }
                if (plugin.private && m.isGroup) {
                    fail('private', m, this);
                    continue;
                }
                // Restrict check (original logic: if restrict is OFF, skip admin tags. This seems backwards)
                // Let's interpret it as: if restrict is ON, and plugin has admin tag, and user isn't allowed, FAIL.
                 if (opts['restrict'] && plugin.tags && plugin.tags.includes('admin') && !isAdmin && !isOwner && !isROwner && !isMods) {
                      fail('restrict', m, this);
                      continue;
                 }
                // Check registration requirement
                if (plugin.register == true && (_user ? _user.registered == false : true)) { // Check if user exists and is registered
                    fail('unreg', m, this);
                    continue;
                }


                m.isCommand = true // Mark message as a command
                let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 // Default EXP gain
                if (xp > 200) console.log('Plugin', name, 'has too high EXP', xp) // Warn for high EXP
                // Don't add exp here yet, add in finally block after successful execution

                // Check coin requirement
                // Assuming 'moneda' is a global variable for coin currency name
                if (!isPrems && plugin.coin && (_user ? global.db.data.users[m.sender].coin < plugin.coin * 1 : true)) { // Check if user exists and has enough coins
                    conn.reply(m.chat, `❮✦❯ Se agotaron tus ${global.moneda || 'Coin'}`, m);
                    continue; // Skip to the next plugin
                }

                // Check level requirement
                if (plugin.level && (_user ? _user.level < plugin.level : true)) { // Check if user exists and meets level requirement
                    conn.reply(m.chat, `❮✦❯ Se requiere el nivel: *${plugin.level}*\n\n• Tu nivel actual es: *${_user ? _user.level : 0}*\n\n• Usa este comando para subir de nivel:\n*${global.prefix || '.'}levelup*`, m); // Use global prefix or '.'
                    continue; // Skip to the next plugin
                }

                // Prepare extra data for the plugin function
                let extra = {
                    match: match, // The result of the prefix regex match
                    usedPrefix: usedPrefix, // The prefix used (or null)
                    noPrefix: noPrefix, // The text after the prefix (or full text if no prefix)
                    _args: args, // Array of arguments
                    args: args, // Array of arguments (keeping both for compatibility)
                    command: command, // The command string (lower cased)
                    text: text, // Joined arguments
                    conn: this, // The WhatsApp connection object
                    participants: participants,
                    groupMetadata: groupMetadata,
                    user: user, // User info in group (if applicable)
                    bot: bot, // Bot info in group (if applicable)
                    isROwner: isROwner,
                    isOwner: isOwner,
                    isRAdmin: isRAdmin,
                    isAdmin: isAdmin, // User is admin in group
                    isBotAdmin: isBotAdmin, // Bot is admin in group
                    isPrems: isPrems,
                    chatUpdate: chatUpdate,
                    __dirname: ___dirname,
                    __filename: __filename
                }

                // --- Execute the plugin function ---
                try {
                    await plugin.call(this, m, extra); // Call the plugin function
                    m.exp += xp; // Add EXP after successful execution
                    if (!isPrems && plugin.coin) {
                        m.coin = plugin.coin * 1; // Set coin cost if not premium
                    }
                } catch (e) {
                    m.error = e; // Store error in message object
                    console.error("Error executing plugin:", name, e);
                    // Reply with error message
                    if (e) {
                        let text = format(e);
                        // Replace API Keys in error message
                        for (let key of Object.values(global.APIKeys || {})) { // Use global.APIKeys with a fallback
                            text = text.replace(new RegExp(key, 'g'), 'ADMINISTRADOR');
                        }
                         // Original code just replies the formatted text.
                         // Consider adding a prefix or context to the error message.
                         // Example: m.reply(`⚠️ Error executing command:\n\n\`\`\`${text}\`\`\``);
                         m.reply(text); // Keeping original behavior
                    }
                } finally {
                    // Execute 'after' function for the plugin if it exists
                    if (typeof plugin.after === 'function') {
                        try {
                            await plugin.after.call(this, m, extra);
                        } catch (e) {
                            console.error("Error in plugin.after:", e);
                        }
                    }
                    // Deduct coin cost and send message
                    if (m.coin && _user) { // Only deduct if coin cost is set and user exists
                         if (global.db.data.users[m.sender].coin >= m.coin) { // Ensure user has enough coins before deducting
                            global.db.data.users[m.sender].coin -= m.coin;
                            conn.reply(m.chat, `❮✦❯ Utilizaste ${+m.coin} ${global.moneda || 'Coin'}`, m); // Use global.moneda or default
                         } else {
                            // This case should ideally be caught by the coin requirement check earlier
                            // But as a fallback, inform the user they don't have enough coins
                            console.warn(`[WARN] User ${m.sender} tried to use command ${command} but didn't have enough coins in finally block.`);
                            // Optionally inform user again:
                            // conn.reply(m.chat, `❮✦❯ No tienes suficientes ${global.moneda || 'Coin'} para usar este comando. Necesitas ${m.coin}.`, m);
                         }
                    }
                }
                break; // Stop searching plugins once a command is found and executed
            }
            // --- End Command Matching and Plugin Execution ---
        } // End of plugin loop
    } catch (e) {
        console.error("Error in handler processing:", e);
    } finally {
        // --- Final Processing Steps ---

        // Remove message from queque if it was added
        if (opts['queque'] && m.text) {
            const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
            if (quequeIndex !== -1)
                this.msgqueque.splice(quequeIndex, 1)
        }

        // Update user stats (exp and coin)
        let userDb = global.db.data.users[m.sender]
        if (m && userDb) { // Ensure message and userDb exist
             // EXP is added during plugin execution (m.exp += xp) or in try block.
             // Coin deduction is handled in the finally block of plugin execution.
             // No need to add/deduct exp/coin here again.
        }

        // Update plugin usage stats
        let stats = global.db.data.stats
        if (m && m.plugin && stats) { // Only update stats if a plugin was executed
            let now = +new Date
            let stat = stats[m.plugin] || (stats[m.plugin] = {
                total: 0,
                success: 0,
                last: 0,
                lastSuccess: 0
            });
            stat.total += 1
            stat.last = now
            if (m.error == null) { // Check if there was no error during execution
                stat.success += 1
                stat.lastSuccess = now
            }
        }

        // Handle muted users (delete message)
        if (m && userDb && userDb.muto == true) {
             let bang = m.key.id;
             let cancellazzione = m.key.participant || m.sender; // Use participant for groups, sender for private
             try {
                 await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: cancellazzione }});
                 console.log(`[MUTE] Deleted message from muted user: ${cancellazzione}`);
             } catch (e) {
                 console.error(`[MUTE] Failed to delete message from muted user ${cancellazzione}:`, e);
                 // If deletion fails, perhaps consider blocking or other action?
             }
         }


        // Print message details (assuming lib/print.js exists and is updated)
        try {
            if (!opts['noprint']) {
                const printMessage = (await import(`./lib/print.js`)).default;
                await printMessage(m, this);
            }
        } catch (e) {
            console.error("Error importing or running print.js:", e)
        }

        // Autoread messages
        let settingsREAD = global.db.data.settings[this.user.jid] || {}
        if (opts['autoread'] || settingsREAD.autoread) { // Check both opts and DB setting
            await this.readMessages([m.key]).catch(e => console.error("Error reading message:", e));
        }

        // Reaction logic (re-implemented based on original snippet)
        // Assumes db.data.chats[m.chat].reaction exists
        if (global.db.data.chats[m.chat]?.reaction && m.text) { // Ensure reaction setting is true and text exists
            // Check if text contains specific patterns (cion, dad, aje, etc.)
            if (m.text.match(/(ción|dad|aje|oso|izar|mente|pero|tion|age|ous|ate|and|but|ify|ai|yuki|a|s)/gi)) {
                let emot = pickRandom(["🍟", "😃", "😄", "😁", "😆", "🍓", "😅", "😂", "🤣", "🥲", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "🌺", "🌸", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🌟", "🤓", "😎", "🥸", "🤩", "🥳", "😏", "💫", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😶‍🌫️", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🫣", "🤭", "🤖", "🍭", "🤫", "🫠", "🤥", "😶", "📇", "😐", "💧", "😑", "🫨", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😮‍💨", "😵", "😵‍💫", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👺", "🧿", "🌩", "👻", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🫶", "👍", "✌️", "🙏", "🫵", "🤏", "🤌", "☝️", "🖕", "🙏", "🫵", "🫂", "🐱", "🤹‍♀️", "🤹‍♂️", "🗿", "✨", "⚡", "🔥", "🌈", "🩷", "❤️", "🧡", "💛", "💚", "🩵", "💙", "💜", "🖤", "🩶", "🤍", "🤎", "💔", "❤️‍🔥", "❤️‍🩹", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "🚩", "👊", "⚡️", "💋", "🫰", "💅", "👑", "🐣", "🐤", "🐈"]);
                // Only react if message is NOT from self
                if (!m.fromMe) {
                    this.sendMessage(m.chat, { react: { text: emot, key: m.key } }).catch(e => console.error("Error sending reaction:", e));
                }
            }
        }

        function pickRandom(list) { return list[Math.floor(Math.random() * list.length)] }
    }
} // End of handler function

// --- dfail function (remains mostly the same, uses global.comando) ---
global.dfail = (type, m, conn) => { // Removed unused usedPrefix and command parameters

    let edadaleatoria = ['10', '28', '20', '40', '18', '21', '15', '11', '9', '17', '25'].getRandom()
    let user2 = m.pushName || 'Anónimo'
    let verifyaleatorio = ['registrar', 'reg', 'verificar', 'verify', 'register'].getRandom()

    // Ensure global.comando is set before calling dfail. It is set within the handler now.
    const commandName = global.comando || 'comando'; // Use global.comando or a default

    const msg = {
        rowner: `꒰ ✨ ᴄʀᴇᴀᴛᴏʀ ❗ ꒱\n\n≡ 🌸 \`Comando\` : » *${commandName}* solo para los creadores del bot.`,
        owner: `꒰ 🍀 ᴅᴇᴠ ❗ ꒱\n\n≡ 🍃 \`Comando\` : » *${commandName}* solo para los desarrolladores del bot.`,
        mods: `꒰ 🌸 ᴍᴏᴅ ❗ ꒱\n\n≡ 🍄 \`Comando\` : » *${commandName}* solo para moderadores del bot.`,
        premium: `꒰ 🌷 ᴘʀᴇᴍɪᴜᴍ ❗ ꒱\n\n≡ 🌸 \`Comando\` : » *${commandName}* solo para usuarios premium.`,
        group: `꒰ 🐾 ɢʀᴜᴘᴏ ❗ ꒱\n\n≡ 🌷 \`Comando\` : » *${commandName}* solo en grupos.`,
        private: `꒰ 🍡 ᴄʜᴀᴛ ᴘʀɪᴠᴀᴅᴏ ❗ ꒱\n\n≡ 🌸 \`Comando\` : » *${commandName}* solo en el chat privado del bot.`,
        admin: `꒰ 🌼 ᴀᴅᴍɪɴ ❗ ꒱\n\n≡ 🌻 \`Comando\` : » *${commandName}* solo para administradores del grupo.`,
        botAdmin: `꒰ 🌱 ʙᴏᴛ ᴀᴅᴍɪɴ ❗ ꒱\n\n≡ 🧸 \`Comando\` : » Necesito ser administrador para ejecutar *${commandName}*.`,
        unreg: `꒰ 🍥 ᴜɴʀᴇɢ ❗ ꒱\n\n≡ 🌸 \`Comando\` : » *${commandName}* solo para usuarios registrados. Regístrate usando:\n> » *${global.prefix || '.'}${verifyaleatorio} ${user2}.${edadaleatoria}*`, // Use global.prefix or '.'
        restrict: `꒰ 🌱 ᴄᴀʀᴀᴄᴛᴇʀɪsᴛɪᴄᴀ ᴅᴇsᴀᴄᴛɪᴠᴀ ❗ ꒱\n\n≡ 🌿 \`Comando\` : » Esta característica está desactivada.`
    }[type];

    if (msg) {
         m.reply(msg).then(_ => m.react('✖️')).catch(e => console.error("Error replying dfail message:", e)); // Add error handling for reply
    } else {
        console.warn(`[dfail] Unknown fail type: ${type} for command ${commandName}`);
    }
}

// Add getRandom method to Array prototype if it doesn't exist
if (!Array.prototype.getRandom) {
    Array.prototype.getRandom = function() {
        return this[Math.floor(Math.random() * this.length)];
    }
}


// --- Watch file for changes and reload handler ---
let file = global.__filename(import.meta.url, true) // Assuming global.__filename exists
watchFile(file, async () => {
    unwatchFile(file)
    console.log(chalk.magenta("Se actualizo 'handler.js'"))
    try {
        // Dynamically import the updated handler
        const updatedHandler = await import(`${file}?update=${Date.now()}`);
        // Replace the global handler function
        global.handler = updatedHandler.handler;
        console.log(chalk.green("Handler updated successfully."));

        // Signal connected bots to reload their handlers (if using multi-bot)
        if (global.conns && global.conns.length > 0) {
            const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
            for (const userr of users) {
                // Assuming subreloadHandler method exists on connection object
                if (typeof userr.subreloadHandler === 'function') {
                    userr.subreloadHandler(false).catch(e => console.error(`Error reloading handler for ${userr.user.jid}:`, e));
                } else {
                    console.warn(`subreloadHandler method not found on connection object for ${userr.user.jid}`);
                }
            }
            console.log(chalk.green("Signaled connected bots to reload handler."));
        }

    } catch (e) {
        console.error(chalk.red("Failed to update handler.js:"), e);
        // Optionally revert to previous handler or handle the error
    }
});
