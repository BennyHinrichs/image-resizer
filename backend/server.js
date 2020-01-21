import express from 'express'
import path from 'path'
import formidableMiddleware from 'express-formidable'
import upload, { uploadEvents } from './upload'

const app = express()
const port = process.env.PORT || 5000;

app.post('/upload', formidableMiddleware({}, uploadEvents), upload)

app.use(express.static(path.join(__dirname, '../frontend/build')))

app.use(express.static(path.join(__dirname, 'uploads')))

app.get('/uploads/:file', (req, res) => {
  res.sendFile(path.join(`${__dirname}/uploads/${req.params.file}`))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(port, () => console.log(`Server up on port ${port}`))