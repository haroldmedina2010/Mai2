import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) throw ' Ingrese el nombre de una película a buscar!'
  try {
    let res = await fetch(`https://nightapi-2a6l.onrender.com/api/movies/search?query=${encodeURIComponent(text)}`)
    let json = await res.json()

    if (json.status && json.result) {
      let result = json.result
      let caption = `🎬 *INFORMACIÓN DE LA PELÍCULA*\n\n`
      caption += `📝 *Título:* ${result.title || 'No disponible'}\n`
      caption += `📅 *Año:* ${result.year || 'No disponible'}\n`
      caption += `⭐ *Calificación:* ${result.rating || 'No disponible'}\n`
      caption += `⏰ *Duración:* ${result.runtime || 'No disponible'}\n`
      caption += `🎭 *Géneros:* ${result.genres?.join(', ') || 'No disponible'}\n`
      caption += `📝 *Sinopsis:* ${result.plot || 'No disponible'}\n`
      caption += `👥 *Actores:* ${result.actors?.join(', ') || 'No disponible'}\n`
      caption += `🎥 *Director:* ${result.director || 'No disponible'}`

      if (result.poster) {
        await conn.sendFile(m.chat, result.poster, 'movie.jpg', caption, m)
      } else {
        m.reply(caption)
      }
    } else {
      throw '[ ❌ ] No se encontró información de la película'
    }
  } catch (error) {
    console.error(error)
    throw '[ ❌ ] Error al buscar la película'
  }
}

handler.help = ['movie <título>']
handler.tags = ['buscador']
handler.command = ['movie', 'pelicula']
handler.register = true

export default handler
