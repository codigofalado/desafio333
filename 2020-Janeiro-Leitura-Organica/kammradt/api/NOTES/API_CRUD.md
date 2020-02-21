# :recycle: Creating the CRUD

| Summary                                                               |
| -                                                                     |
| [Creating the basic API file](#Creating-the-basic-API-file)           | 
| [Creating routes](#Creating-routes)                                   |
| [Creating a GET route](#Creating-a-GET-route)                         |
| [Organizing our files and project](#Organizing-our-files-and-project) |
| [Creating a real GET route](#Creating-a-real-GET-route)               |
| [Refactoring the code](#Refactoring-the-code)                         |
| [Route to CREATE a Text](#Route-to-CREATE-a-Text)                     |
| [Route to GET one Text](#Route-to-GET-one-Text)                       |
| [Route to UPDATE a Text](#Route-to-UPDATE-a-Text)                     |
| [Route to DELETE a Text](#Route-to-DELETE-a-Text)                     |
| [Route to GET a random Text](#Route-to-GET-a-random-Text)             | 


## Creating the basic API file

Lets start by installing our Back-end framework that will be used. We used `Vue.js` to create beautiful pages, and we will use `ExpressJS` to create our server. `Express` will help us access our database in a easy way based on what is `requested` by our front-end. 

1. Run `npm install express` in the terminal inside our project folder.
2. Run `npm install nodemon` in the terminal inside our project folder.
3. Run `npm install cors` in the terminal inside our project folder.

> 1. Express is a javascript library that help us creating APIs similars to what we have seen on Github, for example.  
Using it, will be possible to do something like:
`GET www.site.com.br/api/getTexts` and receive a list of ours Texts from the Database.
> 2. Nodemon is just a small library to help us during the process of development. Remember that when we were using `Vue.js`, file changes were reloaded automatically to the page? This will do the same but for our API.
> 3. The package will help us control who can access our API by creating some CORs rules, this will allow only some URLs to communicate with our endpoints.


Now, we are going to start our real project. Let's create a file that will work as the start of our API.  
We can create an `index.js` file in our `src` folder.
> src/index.js
```javascript
const express  = require('express') // 1.
const cors = require('cors') // 2

const app = express() // 3.
const port = process.env.PORT || 3000 // 4.

app.use(cors({
  origin: 'http://localhost:8080' // 2.1
}))

app.listen(port, () => { // 5.
    console.log(`Server is ON and running on port ${port}`)
})
```

> 1. Importing our Express library.
> 2. Importing the CORs library.
> 2.1 Now we are saying that only that origin can call and use our API. This address would probably be one of our clients or maybe our Front-end.
> 3. Creating a variable for our app by using the express library.
> 4. We will use the default port on our real server (`80`) or in development it will `3000`.
> 5. We will tell the app to use the port (`80` or `3000`), and if everything is OK, we will receive a message in the console.


Now, we can configure our `package.json`.

```javascript
  "scripts": {
    "start": "node src/index.js", // 2.
    "dev": "nodemon src/index.js" // 1.
  },
```

> 1. `npm run dev` will start a development server.
> 2. `npm run start` will run a real server that will only be used after we finish our app.

So, just to verify if everything is ok, we can run `npm run dev`.


## Creating routes
Now, we can start building some routes to make available. But first, what is a route?  
We can call a route every "link" in our API that does something. So, for example:  
This is a route to get information about kammradt's repositories: "`https://api.github.com/users/kammradt/repos`".  
It is really common to call it and `endpoint` too.  


### Creating a GET route
Lets start by creating a fake route just for testing propouses. Using our `index.js` file:
```javascript
... // After imports and etc... 

app.get('/', (request, response) => {   // 1.
    let responseMessage = {
      message: 'Hello!' // 2.
    }
    return response.send(responseMessage) // 3.
})

app.listen(port, () => {
    console.log(`Server is ON and running on port ${port}`)
})
```

> 1. We are registering a route using our `app` variable. The route will be using the `GET` verb. The first parameters is the `path` to this route, the literal `URL`. In this case, will be at the root, the first one, `'/'`. In this case, we will access it by:  
`localhost:3000`
> 2. We are creating a reponse object to send when this route is accessed. In ths case, will be a simple object with a `message` inside it, the value `'Hello!'`. In the future, it will be probably our `Text`s and more complex stuff.
> 3. In the end, we will send our variable to the user with method `.send()` with the wanted value inside.

### Organizing our files and project
Lets start building a real structure. We can start by creating a folder inside `db` that will hold all our `models`. At this moment, we will have only one, that is our `Text`.
So, we will have:
> src/db/models/text.js
```javascript
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
        required: true,
        min: [600, 'Text size must be equal or bigger than 600'],
        max: [1000, 'Text size must be equal or less than 1000!']
    }
})

module.exports = Text
```

And now our `src/db/mongoose.js` will be a little bit more clean, like this:
```javascript
const moongose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/database-texts'

moongose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true
})
```
> The ideia is that, will file will only be the connection, and if we want to create other `models`, we should do it inside the `models` folder. 

We can also organize our `index.js` file:

```javascript
const express = require('express')
const cors = require('cors')
const Text = require('./db/models/text') // 1.
require('./db/mongoose') // 2.

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
  origin: 'http://localhost:8080'
}))

app.use(express.json()) // 3.

app.get('/', (request, response) => { 
  let responseMessage = {
    message: 'Hello!'
  }
  return response.send(responseMessage) 
})

app.listen(port, () => {
  console.log(`Server is ON and running on port ${port}`)
})
``` 
> 1. First, we are importing our `Text` model that we created with mongoose and is in the `text.js` file.
> 2. We are also importing the Database file `mongoose`, but we are not saving it in any variable. We are just importing it to make sure the connection inside it is created. Remeber that we will manipulate our database only using our `models`, like the `Text` one that we imported.
> 3. We will display and receive a lot of `json`s during the creation of the API. So, just to make sure everything works well, we will tell express to use it. 

### Creating a real GET route
Now, we will create a route that will display all our `Text`s. This will be really easy:
```javascript
app.get('/texts', (request, response) => { // 1.

  Text.find().then(result => { // 2.
    return response.send({ texts: result}) // 3.
  })

})
```
> 1. We changed the route to math the name of the model that we are interacting, so things make a little more sense. IN this case, we will use:  
`GET "localhost:3000/texts"`
> 2. We are using the method `.find()` to get all `Text`s in the database. It will return a list of it.
> 3. We are sending back to the person that went to that endpoints a object like this:  
> ```javascript
> {
>   text: [
>     {
>       id: 1,
>       title: 'Title 1',
>       text: 'Text 1...'
>     },
>     {
>       id: 2,
>       title: 'Title 2',
>       text: 'Text 2...'
>     } ...
>   ]
> }
> ```

#### Refactoring the code
We can actually make this code look a little bit more easy and clena, by using what we learned before with `async/await`. Lets make it:
```javascript
app.get('/texts', async (request, response) => { // 1.
  let listOfTexts = await Text.find() // 2.
  return response.send({ text: listOfTexts })
})
```
> 1. Now, we added the `async` keyword in front the function that will be called when a user enters in the `/texts` endpoint. After that, we are able to use `await` instead of calling `.then()` eeru time.
> 2. Now, we can remove the `.then()` and just `await` for the database finish finding all `Text`s. After that, we just send it back as we did before.

## Route to CREATE a Text
The most important part is to be able to create a new Text. This is really easy and we can do it as follow:
```javascript
app.post('/texts', async (request, response) => { // 1.
  let newText = request.body // 2.
  try {
    let myText = new Text({ // 3.
      title: newText.title,
      text: newText.text,
      size: newText.text.split(' ').length
    })
    let savedText = await myText.save() // 4.
    return response.send(savedText) // 5.
  } catch (error) {
    return response.status(400).send({ error: `An error occurred: ${error}` }) // 6.
  }
})
```
> 1. Now we will use the POST verb to create a new `Text`.
> 2. We will get the new `Text` information from the `request body` and save it into `newText`. Ther body of a request is literally some text that we send together in the `request body`. We can also send information using the url. For example: In the GithubAPI case, we send the URL with the name of the user on it, and the GithubAPI uses it to find in their database information about the given user.
> 3. We will use the data received to create a `new Text object`. This variable will look similar to:
> ```javascript
> {
>   title: 'Harry potter and the best Javascript course ever!',
>   text: 'Some really long text...'
> }
> ```
> 4. Now, we can save it and also verfy if there are any errors. If there are errors, the `catch` clause will return an error message to the one who send the request.
> 5. We will send the created `Text` to who send the request. At this moment, we will send more information in the response, such as the `size` that we calculated in the server. This is a really important point: At this moment, we are doing simple stuff, but in real world apps, the back-end will be a powerfull machine, capable of doing really complex calculus and accessing huge databases, and now some pros of splitting back-end and front-end are a more clear to understand. 
> 6. We will return the errors and a `code 400` to notify that it was a `Bad Request` and something is wrong.


## Route to GET one Text
The ideia is to make available a route that users can use to find a single `Text` in our database by its ID. We can do it by using methods that we learned about our database, like the method `.findById(id)`. It will be really easy as follow: 

```javascript
app.get('/texts/:id', async (request, response) => { // 1.
  let id = request.params.id // 2.
  try {
    let foundText = await Text.findById(id) // 3.
    return response.send(foundText) // 4.
  } catch (error) { // 5.
    return response.status(404).send({ error: `There are no Text with the given id: ${id}` }) // 6.
  }
})
```
> 1. We are creating a route with the following path `/texts/${someId}`, that will be id given by the user/Front-end during the request.
> 2. We are getting the id that was used in the url. For example, if the following link was used: `https://localhost/texts/2fF34a` the value inside our `id` variable would be `'2fF34a'`    
> 3. We are using the method that we learned before, `.findById(id)` and we are using it with the id that we received in the request.   
> 4. If everything was OK, we will send back the `Text` that we found in our database to the person that made the request. 
> 5. Its possible to occurr an `error`, like request having an `ID` that does not exist in our database. So, if this happens we will do something.
> 6. It is a good idea to advise who send the request, with a message and the correct status. 

## Route to UPDATE a Text
It is a good idea have a route to edit information about a previously created Text. Maybe during the creation, the client send some wong information or something else. We can do it by the following:

```javascript
app.put('/texts/:id', async (request, response) => { // 1.
  let id = request.params.id // 2.
  let newTextInfo = request.body // 3.
  try {
    let foundText = await Text.findById(id) // 4.
    foundText.title = newTextInfo.title // 5. 
    foundText.text = newTextInfo.text   // 5.
    foundText.size = newTextInfo.text.split(' ').length // 5.

    let updatedText = await foundText.save() // 6.
    return response.send(updatedText) // 7.
  } catch (error) { 
    return response.status(404).send({ error: `An error occurred: ${error}` }) // 8.
  }
})
```

> 1. When we want to update information, we use the PUT verb. 
> 2. We are getting the `ID` from the URL.
> 3. We are getting the request body with the new information that will be used to update the `Text` with the `ID` from the url. The body will be really similar to our `Text` model:
> ```javascript
> PUT: `http://localhost:3000/texts/12h312nj`
>
> BODY:
> {
>   title: 'My new title',
>   text: 'A really long text ...'
> }
> ```
> 4. We will try to find the `Text` that the request wants to update. This part is really similar to the [GET Route](#Route-to-GET-one-Text)
> 5. We are now setting the new information in the `Text` that we found. This is really similar to what we learned in [this part: Updating data](#Updating-data)
> 6. Now that our `Text` object has the new information, we will save it. 
> 7. We are now returning the updated version of the `Text`, so who requested knows everything was fine and the `Text` was updated.
> 8. If some error occurred, we will send a message saying what wrong happened.

## Route to DELETE a Text
The idea now is to delete something that we do not want anymore. The process will be really easy as follow:
```javascript
app.delete('/texts/:id', async (request, response) => {
  let id = request.params.id 
  try {
    let deleted = await Text.findByIdAndDelete(id) // 1.
    return response.send({message: `The Text with title: ${deleted.title} and id: ${deleted.id} was successfully deleted!`}) // 2. 
  } catch (error) {
    return response.status(404).send({ error: `There are no Text with the given id: ${id}` })
  }
})
```
> 1. We will try to find the and delete the `Text` that the request wants to delete.
> 2. It is a good ideia to inform in the response that the `Text` was deleted successfully.


## Route to GET a random Text
To add a little bit o fun and dynamism to our front-end, maybe it is a good idea make available a route that return a random text, so users always receive a different text ou even change the current one if they do not want it.
We can create an endpoint for that as follow:
```javascript
app.get('/texts-random', async (request, response) => { // 1.
  try {
    let allTexts = await Text.find() // 2.
    let randomText = allTexts[Math.floor(Math.random() * allTexts.length)]; // 3.
    return response.send(randomText)
  } catch (error) {
    return response.send({ error: `An error occurred: ${error}` })
  }
})
```

> 1. This endpoint will use the **GET** verb and will be really simple, no parameters are necessary.
> 2. We will first find all texts that we have in our database, with no filters at all.
> 3. After that, if we generate a random number using the max value as the length of our array, it will be possible to access itself later at a random position and retrieve our random text with success.
