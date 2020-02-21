# :art: Refactoring and Best practices

| Summary                                                      |
| -                                                            |
| [Splitting routes](#Splitting-routes)                        |
| [Using environment variables](#Using-environment-variables)  |

## Splitting routes
At this moment, we can verify that there are two main kinds of routes. There are the endpoints related to `Text`s and for sending `Emails`.  
Maybe we could have more routes or even more methods on each one, so it is a good idea to split each group ou routes on its on file. It will be more organized and easy to find the wanted endpoints.
We can start by creating a folder called `routes` inside our `src` folder, and two files inside it, `texts` and `email`.  

--- 
Now, we can verify what is realted to `Text`s routes and migrate to this file:
> src/routes/text.js    
```javascript
const express = require('express') // 1.
const Text = require('./../db/models/text') // 2.

const router = express.Router() // 3.

router.post('/texts', async (request, response) => {})        // 4.                 
router.get('/texts', async (request, response) => {})         // 4.       
router.get('/texts/:id', async (request, response) => {})     // 4.            
router.put('/texts/:id', async (request, response) => {})     // 4.          
router.delete('/texts/:id', async (request, response) => {})  // 4.             
router.get('/texts-random', async (request, response) => {})  // 4.            

module.exports = router // 5.
```

> 1. We are importing the express library as we did before.
> 2. We are importing our `Text` model as we were doing before in the `index.js`.  
**NOTE:** the PATH `('./../db/models/text')` changed, make sure to use it correctly.
> 3. To be able to split our multiple endpoints in different files, we can not register our routes/endpoints using the app directly as we did before. For example:
> ```javascript
> app.get('/example', async (request, response) => { ... })
> // Note that we are registering the route directly in the app variable
> ```
> 3. Now, we will create a `Router object`, that is able to hold multiple endpoints inside it. The only difference is that we will register our endpoints using the `Router` object instead of the app. Verify the next topic.  
> 4. Now we changed all endpoints to use the `Router` object instead of the app variable.   
> **NOTE:** We did not delete the code inside the endpoints, I just removed it form the example above to be easier to read.
> 5. This part is really important: at the end of the file we will `export` the `Router` object, and after this, we will be able to `import` it in the main file. The last step is to register this `Router` object in the app variable.  
> Just a quick reminder: **Before**, we were creating the routes directly in our `app` variable. **Now**, we splitted the routes in another file and added all of them to a `Router` object. In the end, we will `export` the `Router` object and `import` it on the main file to register **this router object** in our `app` variable. 

> src/routes/mail.js  

We will do the same process in our email related routes and put all of them in a separeted file: 
```javascript
const express = require('express') // 1.
const sgMail = require('@sendgrid/mail'); //2.

const router = express.Router() // 3.

sgMail.setApiKey('your-api-generated-key'); // 4.

router.post('/mail', async (request, response) => {}) //5.

module.exports = router // 6.
```

> 1. We are importing the express library as we did before
> 2. We are importing the library that allow us to send emails.
> 3. We are creating the router object to be able to register the enpoints/routes to it. We did the same in the other file.
> 4. We are adding our account key to be able to use the library. 
> 5. We changed from `app.post(..)` to `router.post(...)` as we did before.  
> **NOTE:** We did not delete the code inside the endpoints, I just removed it form the example above to be easier to read.
> 6. We are exporting the router variable to import it in the main file. We will register it in the `app` variable the same way we did to the `Text` router. 

### NOW: Changing the `index.js` to use the new routes files
We need to import the files taht we created and register the routes that were previously in just one file. It will be really easy to do that:
```javascript
const express = require('express') // 1.
const cors = require('cors') // 1.
require('./db/mongoose') // 1.

const app = express() // 1.
const port = process.env.PORT || 3000 // 1.

const textsRoute = require('./routes/text') // 2.
const emailsRoute = require('./routes/email') // 2.

app.use(cors({ origin: 'http://localhost:8080' })) // 1.

app.use(express.json()) // 1.

app.use(textsRoute) // 3.
app.use(emailsRoute) // 3.

app.listen(port, () => {
  console.log(`Server is ON and running on port ${port}`) // 1.
})
```

> 1. Exacly the same as before.
> 2. We are importing the files that we created and saving them into `textsRoute` and `emailsRoute`. The content of these files is the `router object` that we exported with all our endpoints. Now, we just need to tell our `app` to use them.
> 3. As said, **before** we were registering the routes directly in the `app` variable. **Now**, to be more organized, we created separetd files, each one has their related routes/endpoints. We are importing them into the variables, and now we are registering those objects instead of each individual route in the `app` variable.
> This is jsut a good practice and a way of organizing files, the advantage is that everytime we need to change something related to `Text`s, we just go to that file and do what we need. This is easier than having a `index.js` with multiple lines and different endpoints together.  

## Using environment variables

Environment variables are literally what they say: They are variables that are available in our enrionment/server and we can use they for specific tasks. At this point, we will use just one to safely store our `key` from **SendGrid**. It is really commom to storage credentials and similar stuff outside the code, using environment variable or another approach.  
Just a quick remember: We already used some environment variables in our `index.js`:
```javascript
const port = process.env.PORT || 3000 // 1.
```

> 1. Note that we are getting the current process, then the environment and the `PORT`. Now, we will learn how to add new values to this `env` variable.

This will be really easy to do as follow:  

1. Install the necessary package to do that: `npm run dotenv`
2. Create a file named `.env` (outside `src`) that will hold our variables at the root of project: `touch .env`

> .env
```env
SENDGRID_TOKEN=AAABBBBBCCCCDEEEEE
```

Now we will adapt our code, lets start by creating a new folder inside `src` called `env`, and a new file inside it called `env.js`:

> src/env/env.js
```javascript
const dotenv = require('dotenv'); // 1.

dotenv.config(); // 2.
```
> 1. We are importing the lib that we installed previously.
> 2. When we run the `.config()` method from the `dotenv` lib that we imported, it will read the values that we wrote inside `.env` and let them available to use similar to what we have done with `process.env.PORT`.

Now, we just need to make sure that our configuration file (`src/env/env.js`) runs, so we will import it into our `index.js` file.

```javascript
const express = require('express') // 1.
const cors = require('cors') // 1.
require('./db/mongoose') // 1.
require('./env/env') // 2.

const app = express() // 1.
```

> 1. Old lines of code
> 2. The ideia is the same as we did before with our database connection by importing it. We will `require('./env/env')` it so we are sure that the config is loaded and done.

Now, at the end, lets change the code to use the environment variable instead of having the API key inside the code:

> src/index
```javascript
const express = require('express') // 1.
const sgMail = require('@sendgrid/mail'); // 1.

sgMail.setApiKey(process.env.SENDGRID_TOKEN); // 1.

const router = express.Router() // 1. 
```

> 1. Old lines of code
> 2. The ideia is the same as we did before with the port. No we can access our API key by using the `process.env.NAME_OF_ENV_VARIABLE`.
