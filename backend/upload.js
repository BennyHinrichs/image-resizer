import path from 'path'
import sizeOf from 'image-size'
import jimp from 'jimp'

const logoPath = path.join(`${__dirname}/snowball-logo.png`)
const logoSize = 512
const calcPos = (size, logoSize = logoSize) => (size - logoSize) / 2
const response = {}

export const uploadEvents = [
  {
    event: 'fileBegin',
    action: (req, res, next, name, file) => file.path = path.join(__dirname + '/uploads/' + file.name)
  },{
    event: 'file',
    action: (req, res, next, name, file) => {
      const { dir, base } = path.parse(path.relative(__dirname, file.path))
      response[file.name] = `/${dir}/${base}`
    }
  },{
    event: 'end',
    action: (req, res) => {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.write(JSON.stringify(response))
      res.end()
    }
  }
]

export default (req, res) => {
  const { resizePercent } = req.fields
  const { file } = req.files
  // console.log('file:', file)
  console.log('resizePercent:', resizePercent)

  sizeOf(file.path, async (err, {width, height}) => {
    const factor = resizePercent / 100
    const newWidth = width * factor
    const newHeight = height * factor
    console.log('image:', file.name)
    console.log('initial dimensions:', width, height)
    console.log('processed dimensions:', newWidth, newHeight)

    const image = await jimp.read(file.path)
    const logo = await jimp.read(logoPath)

    logo.opacity(.5)
    if (newWidth >= logoSize && newHeight >= logoSize) {
      image.scale(factor)
      image.blit(logo, calcPos(newWidth), calcPos(newHeight))
    } else if (width >= logoSize && height >= logoSize) {
      image.blit(logo, calcPos(width), calcPos(height))
      image.scale(factor)
    } else if (width < height) {
      logo.scale(width / logoSize)
      // doesn't actually center the logo
      image.blit(logo, calcPos(width), 0)
    } else {
      logo.scale(height / logoSize)
      // doesn't actually center the logo
      image.blit(logo, 0, calcPos(height))
    }
    await image.writeAsync(file.path)
  })
}