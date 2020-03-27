# :card_file_box: Creating the **Project** and interacting with Database

| Summary                                                                                     | 
| -                                                                                           |
| [Creating a project](#creating-a-project)                                                   |
| [Learning how to perform CRUD with Mongoose](#learning-how-to-perform-crud-with-mongoose)   | 
| [What is **CRUD**?](#what-is-crud)                                                          |
| [**C**reating the basic file](#creating-the-basic-file)                                     | 
| [Adding rules to Text model](#adding-rules-to-text-model)                                   |
| [**R**eading data](#reading-data)                                                           | 
| [**U**pdating data](#updating-data)                                                         |
| [**D**elete data](#delete-data)                                                             |

## Creating a project
1. Create a folder for it: `mkdir myProjectName`
2. CD into it: `cd myProjectName`
3. Initialize it: `npm init -y`
4. Install the `mongodb` library so we can use it with code: `npm i mongoose@5.3.16`

## Learning how to perform CRUD with Mongoose

### **What is CRUD**?
CRUD is a acronym for `CREATE`, `READ`, `UPDATE`, `DELETE`. These are the basic operations that we are going to perform on our Database.  
In this project, we will perform stuff like:  
- **Create** a new `Text` with title and text.
- **Update** a `Text`, by changing the title or the literall text.
- **Delete** a previously created `Text`.
- **Get** all texts that are in our database.
- **Get** a single text that are in our database by its `ID`.

We need to be able to `CREATE` information and insert it on our database. After that, maybe we want to `READ` it and display to our users. If the users want to change it, we need to be able to `UPDATE` our database information, and if they do not like it, we will need to `DELETE` it.

### **Creating the basic file**
1. Open the project with a code editor:  
`cd myProjectName && code .`
2. Create a file named `mongodb.js` for first tests and configuration
3. Add the content for initial configuration:
4. To run, just open the terminal and type `node mongodb.js`

```javascript
const moongose = require('mongoose')

// 1.
const connectionURL = 'mongodb://127.0.0.1:27017/database-texts' 

moongose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true // 2.
})

// 3.
const Text = moongose.model('Text', {
    title: {
        type: String,
    },
    text: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    }
})

// 4.
let myTitle = 'History of super hero!'
let myText = 'My great text about heroes... Really Long...'
let sizeOfText = myText.split(' ').length 

// 5.
const willBeSaved = new Text({
    title: myTitle,
    text: myText,
    size: sizeOfText
})

// 6.
willBeSaved.save()
``` 
> 1. This URL is created by using the URL from the database (`mongodb://127.0.0.1:27017`) and the name that we want to give to our database (`database-texts`). As we say before, a Database can be defined as a place where we storage data in a ceratin way, with some rules and validations. But in fact, we whe look at it, it is just an application running that can write information and manipulate it by modifying files (but in a really organized and structured way). This URL is just a way of connecting to it, like when we access a website by its URL.  
> 2. Just to make sure that our Database will create the correct IDs and Indexes.
> 3. Now we are **defining** a **Model** called Text. So, every time that we need to save a new Text, it will follow the same pattern and fields. This will be really useful for maintaining and organizing our Database. It is called Model because it is literally a Model that will be followed when we want to create a new **Text**. The appeareance is really similar to a Javascript Object or a C Struct, for example.  
> As an example of some rules, we are saying that the **text** and **size** are required, but the title is optional.
> 4. Just creating the variables that we will use to create a Text object and save in our Database. In a real application, problably a user would give this data to us. When talking about an API, the users can make **Requests** to us with some data, and we will use that data to create new `Text`s in ourn database.
> 5. Creating a Text object using our variables. This is possible because we defined a `Text` model with some rules with `mongoose`. This is basically the same as creating a `model/collection` directly in the database, but now with code and faster.
> 6. Now we are calling the method `.save()` on your **Text** object that were created by using our **Model**. Note that this is not a simple object, is a object from the **Text** model.  
  

### **Adding rules to Text model**
We actually can improve our model by adding some extra rules to it, like this: 
```javascript
const Text = moongose.model('Text', {
  title: {
    type: String,
    trim: true // 1.
  },
  text: {
    type: String,
    required: [true, 'Please, insert some Text!'],
    trim: true // 1.
  },
  size: {
    type: Number,
    required: true,
    min: [600, 'Text size must be equal or bigger than 600'], // 2.
    max: [1000, 'Text size must be equal or less than 1000!']  // 2.
  }
})
```
> 1. The trim property will remove extra spaces from our String. For example, if a user is trying to save a title like `'  My title '`, it will actually be saved as `'My Text'`.
> 2.  `min` and `max` will help us control the size. For example, remember that texts have a size rule? So we can apply it here and guarantee that all our saved texts have the minimum and maximum size. 

Creating some rules will help us during the process of creating new `Text`s, because now when we call the `.save()` method, before saving this information in the database, it will first validate using our rules, and it will guarantee that our database is well formatted and when we need information from it, they will be always following the same pattern and `model`.

### **Reading data** 
After creating some objects in your database, maybe it is a good ideia discover how we can find those values and show to our users, for example. This is a simple task, and can be done as follow:

```javascript
willBeSaved.save().then(saved => { // 1.
  console.log(`We saved this Text: ${saved}`) // 2.
  let idOfSavedText = saved.id // 3.
  
  Text.findById(idOfSavedText).then(found => { // 4.
    console.log(`The same Text: ${found}`) // 5.
  }).catch(notFound => {
    console.log(`Failed to find: ${notFound}`) // 6.
  })

}).catch(failed => {
  console.log(`We have erros!: ${failed}`) // 7.
})
```
> 1. Now we are verifying if our object was successfully saved on our database. If everything was fine, we will receive a `saved` object that is a `Text` object with an `ID` and same fields that we give to it previously. At this moment, this information is present in our database.
> 2. This will show our `saved` object. This is a Javascript variable that represents our saved object from the database.
> 3. From this `saved` object, we are getting the ID that the database generated and saving it on `idOfSavedText`. This is an unique identifier that every `Text` that we have will have, and we can find any `Text` if we know its `ID`
> 4. This is the function that does the job of searching a object by id: `Text.findById(...)` and we are gonna use it to find the object that we saved some seconds ago.
> 5. If everything was fine, we will receive the same object as we had before with `saved`.
> 6. If this was a real app, maybe a user was trying to find an object and search for the wrong id, so it will return an error.
> 7. This console will be printed if we had some validation errors or other problem.

To find all `Text`s is also really easy, we can do it with this code:
```javascript
Text.find().then(texts => { // 1.
  console.log(texts) // 2.

  texts.forEach(text => {
    console.log(text.id) // 3.
  })

})
```
> 1. We can use the method `.find()` to get all `Text`s. It will basically find all texts, because we are not using any filters, like .find({title: 'Harry Potter'})
> 2. This will be an `Array` of `Text`s. Example:  
`[{id: 1, title: 'abc'}, {id: 2, title: '123'} ...]`
> 3. We will print just the id of each `Text` that we found in our database.



### **Updating data**
Update information is a really important part, and it is really easy to do it. We can do it like this:
```javascript
const willBeSaved = new Text({
  title: 'A great Title',
  text: 'Long text...',
  size: 2
})

willBeSaved.save().then(saved => {
  console.log(saved.title) // 1.

  saved.title = 'My new Title'
  saved.save().then(updated => {
    console.log(updated.title) // 2.
  })
})
```
Now, if you verify in your Database using compass, or by using code with `.findById()`, you will see that the `title` changed from `A great Title` to `My new title`.  
OBS: Note that you can update any `Text` that is in our database, not only the ones you saved some seconds ago. You can first use a `.find()` to get all `Text`s, after that, verify which one you want to update and get it by using `.findById()`, and in the end, edit the values and call `.save()`.

### **Delete data**
It is also a good ideia know how to remove data if it is not necessary or our user wants to, and we can do it like this:

```javascript
const willBeSaved = new Text({
  title: myTitle,
  text: myText,
  size: sizeOfText
})

willBeSaved.save().then(saved => {
  // 1. 

  // 2.
  Text.findByIdAndDelete(saved.id).then(deleted => {
    console.log(`I deleted this: ${deleted.id}`) 

    Text.findById(deleted.id).then(willBeNull => {
      console.log(willBeNull) // 3.
    })

  })
})
```
> 1. We are first saving a new object in our Database named `saved`. Lets imagine that after some time, the users wants to delete it. Then, we will do the code below 2. Of course this could be an old object saved some time ago and we could also find it using other methods that we learned.
> 2. We will call the method `findByIdAndDelete(id)` and this method will delete the object and also return a copy of it. (But the object is deleted!!! It is just a copy to display a last information of it). If we verify the database, the object is already gone and we just have a variable with the information.
> 3. If we try to find the object that we just deleted by it's `ID`, it will return a `null`, because it was previously deleted. The resoult would be `null` if we use the method to find by `id`, but give a wrong `id`, for example.
