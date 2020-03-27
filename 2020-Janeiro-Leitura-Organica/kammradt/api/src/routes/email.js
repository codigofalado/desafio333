const express = require('express')
const sgMail = require('@sendgrid/mail');
const Email = require('./../db/models/email')
const auth = require('./../middlewares/auth-middleware')

sgMail.setApiKey(process.env.SENDGRID_TOKEN);

const router = express.Router()

router.post('/mail', async (request, response) => {
  let { email, name, score } = request.body
  const msg = {
    to: email,
    from: 'vinicius.kammradt1@gmail.com',
    templateId: 'd-60fe9af3640b4709bd684e2a8460328d',
    dynamic_template_data: {
      receiverName: name,
      resultValue: score
    },
  };
  let emailHistory = new Email({ email, name, score })
  try {
    await sgMail.send(msg);
    emailHistory.success = true
    await emailHistory.save()
    return response.send({ message: 'Email sent!' })
  } catch (error) {
    emailHistory.success = false
    await emailHistory.save()
    return response.send({ error: `An error occurred: ${error}` })
  }
})

router.put('/mail/:id', auth, async (request, response) => {
  let emailId = request.params.id
  try {
    let foundEmail = await Email.findById(emailId)
    const msg = {
      to: foundEmail.email,
      from: 'vinicius.kammradt1@gmail.com',
      templateId: 'd-60fe9af3640b4709bd684e2a8460328d',
      dynamic_template_data: {
        receiverName: foundEmail.name,
        resultValue: foundEmail.score
      },
    };
    await sgMail.send(msg);
    foundEmail.success = true
    await foundEmail.save()
    response.send({ message: 'Email sent!' })
  } catch (error) {
    response.status(400).send({ error })
  }
})


router.get('/mail', auth, async (request, response) => {
  try {
    return response.send({ email: await Email.find() })
  } catch (e) {
    return response.send({ error: `An error occurred: ${error}` })
  }
})

module.exports = router