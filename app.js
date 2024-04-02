import express from 'express'
import mongoose from 'mongoose'
const app = express()

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
