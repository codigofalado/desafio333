# :speech_balloon: Introduction

| Summary                                                           |
| -                                                                 |
| [What is a Database?](#what-is-a-database)                        |           
| [What is an API?](#what-is-an-api)                                |   
| [HTTP Verbs](#http-verbs)                                         |
| [Installing MongoDB on Ubuntu](#installing-mongodb-on-ubuntu)     | 
| [Installing a client for Mongo](#installing-a-client-for-mongo)   | 

## What is a Database?
A database is a place where you can save information. Simple as that. But the good point is that you can organize the data in a specific way, so everytime you search for information it will be organized in the same way. The same rule applies for when you want to save new information, it will follow all rules that you created.  
When working with database, we use the term `Table` or `Collection` for a group of information and rules that we want to save.  
A `Table/Collection` for `Cakes` would look something like this:  

| Cake    |
| -       | 
| ID      |
| Name    |
| Price   |
| Flavor  |


And after creating some information in the `Table Cake`, it would look something like this:  

| ID | Name        | Price | Flavor                 |
|-   |-            |-      |-                       |
| 1  | Formigueiro | 40.00 | Black and White Choco  |
| 2  | Banoffe     | 70.00 | Banana                 |
| 3  | Nega Maluca | 40.00 | Choco                  |

> When working with javascript, we can imagine a `Cake` being an object like this: 
```javascript
let firstCake = {
  id: 1,
  name: 'cakeName',
  price: 20,
  flavor: 'cakeFlavor'
}
```
> And an example of reading information from the Table `Cake` should be something like this:  
```javascript
let listOfCakes = myDatabase.Cake.All() 
// This is just a fake example, we will learn how to interact with a database later

console.log(listOfCakes)
// Will print somenthing similar to
[
  {
    id: 1,
    name: 'Best cake ever',
    price: 20,
    flavor: 'choco'
  },
  {
    id: 2,
    name: 'A nice cake',
    price: 30,
    flavor: 'apple'
  } 
]
```


## What is an API? 
API is the acronym for Application Programming Interface, which means that it is actually an running application that does something and is available to people to use.  
An easy example of a well know API is the [GithubAPI](https://developer.github.com/v3/): we can use it to `GET` a information about a user's repositories with a simple `call:`
```javascript
const axios = require('axios')

let user = 'kammradt'
axios.get(`https://api.github.com/users/${user}/repos`).then(result => { // 1.
    console.log(result) // 2.
})
```
> 1. We are using a `.get()` method to literally get information from some source. This source of information is the API URL. 
> 2. The information displayed will be a list of repositories from a specific user. 

It is really commom for people or bussiness to create an API and give it to the clients/users to use, because in this way, we can control what we display and show.
*(It is not secure and not a good idea at all give clients or users access to our server or databases)*  
Of course APIs can also be developed to manipulate data, such as creating new information with a `POST` call, or even delete information with a `DELETE` one.  
Our plan is to create an API to manipulate some `Texts`, such as `Creating`, `Listing all`, `Updating` and `Deleting`.

### HTTP verbs
As we saw before, an API is a really interesting way of creating and provide a service or just information. Now, to understand how we can **use**/**consume** an API, we need ot understand a little bit about **HTTP Verbs/calls**.  
When we are accessing a website, we dont even notice, but we are making **HTTP calls**. But, what are they? They are basically how we *request* data from the website server and receive a *response* that is displayed in our browser (such as Chrome or Firefox).  
Most of the time, we receive just HTML responses with the content of the website, because them the browser understand it and can display it to us in a beautiful way.  
But, when we are working with APIs, most of the time we will receive just a bunch of information formatted to be used by other websites. Lets imagine: 

#### Simple example of a Recipes website 
You have a simple website to display all kinds of **Recipes**.  
The website only shows 10 recipes every time and the user can also use a search bar to find other recipes.  We can imagine the structure being something like:   
We have a **Vue.js** front-end that displays beautiful HTML pages (could be any JS framework or just HTML+JS), and when the website is loading, it **calls** a **back-end** using *axios* to perform a **GET** request to retrieve the 10 most famous recipes. But, in our back-end server, we also have a **Database** with more than 10 milion recipes. We keep this recipes storaged in the database because it would be almost impossible to create a variable in the front-end to hold this amount of information. And also, it could cause our website to be really slow and bad to use. We, of course, do not want to lose this information, so we use a good database with a lot of rules to make sure all recipes follow a **Model**. 
To be able to access all the others recipes, we can create an **API** that accepts a **GET** request, that is called everytime the users use the search bar, and the **API** can just return a **JSON** with the recipes that contain the searched phrase/word.
> JSON is a really commom way of sending and receiving data. It is a acronym for: **J**ava**S**cript **O**bject **N**otation. When working with javascript, it is really easy to create an example:  
> ```javascript
> let jsonExample = {
>   recipeTitle: 'The best choco cake',
>   preparationTime: 50,
>   difficulty: 'Easy'
> }
> ```
> As you can see, a JSON is literally a simple Javascript Object variable.

#### Examples of HTTP verbs and CODES
| Verb        | Used to |
| -           | -       | 
| **GET**     | GET information/JSON or some content such as images.                |
| **POST**    | CREATE/SEND new information. During registration, for example.      |
| **PUT**     | UPDATE old information. Such as changing an account password.       |
| **DELETE**  | DELETE information. Such as when you delete a photo from Instxgrxm. |
<br>

When we make request and receive responses, together with the information we send or receive, we also receive a **HTTP STATUS CODE**, that is basically a number that represents a **STATUS**, that coudl be, for example: Success, Error, Not Found, Missing Permission, etc.

| Code 	| Meaning                               	            |
|-    	|-                                      	            |
|  200 	| OK, this is a success                 	            |
|  201 	| CREATED a resource                    	            |
|  400 	| BAD REQUEST, verify the body/params information   	|
|  401 	| UNAUTHORIZED, give a me correct token/information 	|
|  403 	| FORBIDDEN, you should not ask again   	            |
|  404 	| NOT FOUND, try another resource       	            |

## Installing MongoDB on Ubuntu

1. Go to [this link](https://www.mongodb.com/download-center/community)
2. Select your OS version
3. Click on `Download`
4. Click on the `.deb` file to install  
  4.1.  If you receive a message error saying that you need to install some `dependencies`, you can do it easily with `sudo apt install {dependecyName}`.  
  For example: `sudo apt install libcurl3`

Now you can verify if your installation was successfully:
1. Verify if you can start the database: `systemctl start mongod`
2. Verify if it was started: `systemctl status mongod`

## Installing a client for Mongo
A database client is just a program that can diretcly connect to the Database and interact with it. It is common to use it during the process of development and also after that to verify if everything is OK with our database. At this moment, we will install a client that is compatible with **MondoDB**, called **Compass**. 

1. Go to [this link](https://www.mongodb.com/download-center/compass)
2. Select your OS version
3. Click on `Download`
4. Click on the `.deb` file to install  

When using and creating our project, we will interact with the database using code, because in this way, we can re-use a lot of things and can do a lot more automatically with all the structures that Javascript provide to us.
