const express = require('express')
const Text = require('./../db/models/text')
const auth = require('./../middlewares/auth-middleware')

const router = express.Router()

router.post('/texts', auth, async (request, response) => {
  let currentUser = request.user
  let newText = request.body
  try {
    let myText = new Text({
      title: newText.title,
      text: newText.text,
      size: newText.text.split(' ').length,
      owner: currentUser._id
    })
    let savedText = await myText.save()
    return response.send(savedText)
  } catch (error) {
    return response.status(400).send({ error: `An error occurred: ${error}` })
  }
})

router.get('/texts', auth, async (request, response) => {
  let currentUser = request.user
  await currentUser.populate('texts').execPopulate()
  return response.send({ text: currentUser.texts })
})

router.get('/texts/:id', auth, async (request, response) => {
  let _id = request.params.id
  try {
    let foundText = await Text.findOne({ _id, owner: request.user._id })
    if (!foundText)
      return response.status(404).send()
    return response.send(foundText)
  } catch (error) {
    return response.status(500).send()
  }
})

router.put('/texts/:id', auth, async (request, response) => {
  let _id = request.params.id
  let newTextInfo = request.body
  try {
    let foundText = await Text.findOne({ _id, owner: request.user._id })
    if (!foundText)
      return response.status(404).send()

    foundText.title = newTextInfo.title
    foundText.text = newTextInfo.text
    foundText.size = newTextInfo.text.split(' ').length
    let updatedText = await foundText.save()
    return response.send(updatedText)
  } catch (error) {
    return response.status(404).send({ error: `An error occurred: ${error}` })
  }
})

router.delete('/texts/:id', auth, async (request, response) => {
  let _id = request.params.id
  try {
    let deleted = await Text.findOneAndDelete({ _id, owner: request.user._id })
    if (!deleted)
      return response.status(404).send()
    return response.send({ message: `The Text with title: ${deleted.title} and id: ${deleted.id} was successfully deleted!` })
  } catch (error) {
    return response.status(404).send({ error: `There are no Text with the given id: ${_id}` })
  }
})

router.get('/texts-random', async (request, response) => {
  try {
    let allTexts = await Text.find()
    let randomText = allTexts[Math.floor(Math.random() * allTexts.length)];
    return response.send(randomText)
  } catch (error) {
    return response.send({ error: `An error occurred: ${error}` })
  }
})

module.exports = router