const moongose = require('mongoose')

const Text = moongose.model('Text', {
    title: {
        type: String,
        trim: true
    },
    text: {
        type: String,
        required: [true, 'Please, insert some Text!'],
        trim: true
    },
    size: {
        type: Number,
        min: [600, 'Text size must be equal or bigger than 600'],
        max: [1000, 'Text size must be equal or less than 1000!']
    },
    owner: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Text