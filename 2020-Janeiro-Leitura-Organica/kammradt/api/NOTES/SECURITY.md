# :lock: Security

| Summary                                                                                     | 
| - |
| [Introduction about security](#introduction-about-security)                                 |
| [Authentication and Authorization](#authentication-and-authorization)                       |
| [Securely encrypting data](#securely-encrypting-data)                                       |


## Introduction about security
Till now, in our endpoints we are always accepting request without asking: **Who is asking for this information**? Can this person **have access** to this endpoint? We are basically assuming that only our own front-end will call the back-end, but in real world APPs, it is a good ideia to secure the endpoints with some way of **Authentication** and **Authorization**.  
Our website could also have some king od **registration** of **Users**, and then we could verify **who** wants to access an endpoint and if that person have the **privileges** to do this action. It is also interesting to remeber that: If we have **Users**, they probably would have an *username/email* and *password*, right? How can we store the passwords in a secure way? Just like regular text or something else? Let's see **!**

## Authentication and Authorization
There is a important difference between **Authentication** and **Authorization**, and they combined and really help us during the proccess of creating a security API/APP.  

**Authentication:**
 - Wants to verify if you are who you say you are
 - Get you *username/password* and verify in the database if you exist (Probably, it would generate/create a *certificate* or *token* based on our information)  **¹**
 > 1. It is a really commom practice to generate a long **token** for a user after logged in, and it will be used after instead of re-sending the *username/password* everytime the user makes a request. Let's imagine: We have and enpoint `/login` that the users can POST with a body like `{username: 'vini', password: 123}`.  
 > The process of authentication would be to verify if this information existis in the database, After that, we could generate and return a token like: `'2oi3hnu542!#Efcdg$%^$vdfg'` that will be a **representation** of this user.  
 > So, everytime the user makes a request to **other** endpoints, like: `'/texts', '/documents'` for example, this token would be present in the request, and then the user do not need to send everytime the credentials again! Furthermore, we still able to verify who is making the request by the given token. (`vini`, in this case).  
 > We will verify more details later, but [this documentation about JWT is really interesting](https://jwt.io/introduction/).
 
**Authorization:**
- I already know who you are (based on our *user/pass* ou token), I just want to verify if you **can do** what you are asking to do
- Will verify if a certain user can access a endpoint/webpage
- At this point, probably the API/APP has multiple **types** of users, like: Regular, Premium, VIP, Admin, etc.

## Securely encrypting data

First, we will learn how to encrypt information and store it in a more secure way. This is a really important topic when talking about **passwords.** 
The idea of encryption is simple, the definition says: 
> Encryption is the method by which information is converted into secret code that hides the information's true meaning. The science of encrypting and decrypting information is called cryptography. [!](https://searchsecurity.techtarget.com/definition/encryption) 
 
Basically, it is not a good idea to save passwords just like they are in a database (this is called **"saving passwords as plain text"**), so we will **encrypt** them to make sure that even if someone access the database and verifies the saved accounts, they will be encrypted and harder to discover.  

- 1. Install bcrypt running `npm i bcryptjs`
> Bcryptjs is a library that will help us encrypting data by using some already well-known security-algoritms

Lets code some examples: 
```javascript
const bcrypt = require('bcryptjs');

let password = `123vini`
let hashedPassword = bcrypt.hashSync(password) // 1.

console.log(hashedPassword) // $2a$08$n/ooB7ib9XiNcuel1G9Wxeo9XVrwgyoW0FxuYQM2p52K1u4aNBB9i

const areEqual = bcrypt.compareSync(password, hashedPassword) // 2.
// Will be true

const areEqual_fake = bcrypt.compareSync('123hacker', hashedPassword) // 3.
// Will be false
```
> 1. We are using a function to encrypt our password. Actually, it is better to say that we are **hashing it.** You can see a very good explanation about the differences [here](https://www.ssl2buy.com/wiki/difference-between-hashing-and-encryption). This function has the `Sync` in the name because it is the `synchronous` version, we could use just `.hash(...)` but it would be necessary to use `await` or `.then` to work corretcly. All the alternatives are good and have specific uses. 
> 2. The `.compare(...)` function will help us to verify if some given password is equal to it's hashed version. We are always going to storage the `hashed` version, beucause as you can see, it is way bigger and more secure than just the regular `password`. 

