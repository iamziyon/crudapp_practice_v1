import express from 'express'
import mongoose from 'mongoose'
import { Album } from './models/albumModel.js'
const app = express()

// access json data type
app.use(express.json())
// use form data type
app.use(express.urlencoded({ extended: false }))

// app.get('/', (req, res) => {
//   res.send('hello there')
// })

// get albums
app.get('/albums', async (req, res) => {
  try {
    const albums = await Album.find({})
    res.status(200).json(albums)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/albums/:id', async (req, res) => {
  try {
    const { id } = req.params
    const album = await Album.findById(id)
    if (!album) {
      return res.status(404).json(`Couldn't find an album with the ID ${id}`)
    }
    res.status(200).json(album)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// create album
app.post('/albums', async (req, res) => {
  try {
    const album = await Album.create(req.body)
    res.status(200).json(album)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.put('/albums/:id', async (req, res) => {
  try {
    const { id } = req.params
    const album = await Album.findByIdAndUpdate(id, req.body)
    if (!album) {
      return res
        .status(404)
        .json({ message: `Couldn't find an album with the id ${id}` })
    }
    const updatedAlbum = await Album.findById(id)
    res.status(200).json(updatedAlbum)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.delete('/albums/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletedAlbum = await Album.findByIdAndDelete(id)
    if (!deletedAlbum) {
      return res
        .status(404)
        .json({ message: `Couldn't find an Album with the ID ${id}` })
    }
    res.status(200).json(deletedAlbum)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// connect to database and listen on port 3000
mongoose
  .connect(
    'mongodb+srv://nirvatone:3gO0wKpBCCXWAoe0@crudapiv1.xwaocwq.mongodb.net/?retryWrites=true&w=majority&appName=crudapiv1'
  )
  .then(() => {
    console.log('connected to mongoDB')
    app.listen(3000, () => {
      console.log(`listening on port 3000`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
