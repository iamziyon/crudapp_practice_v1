import mongoose from 'mongoose'
const { Schema } = mongoose

const albumSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter an Album title!'],
    },
    artist: {
      type: String,
      required: [true, 'Please enter the Artist name!'],
    },
    releaseDate: String,
    image: String,
  },
  {
    timestamps: true,
  }
)

const Album = mongoose.model('Album', albumSchema)

export { Album }
