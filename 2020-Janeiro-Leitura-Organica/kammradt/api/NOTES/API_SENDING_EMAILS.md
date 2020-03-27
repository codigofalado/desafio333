# :mailbox_with_mail: Sending emails using SendGrid

| Summary                                                                            |
| -                                                                                  |
| [Introduction about SendGrid](#Introduction-about-SendGrid)                        |
| [Adding SendGrid library to the project](#Adding-SendGrid-library-to-the-project)  |
| [Creating custom email templates](#Creating-custom-email-templates)                |
| [Sending custom email templates](#Sending-custom-email-templates)                  |


## Introduction about SendGrid
One of our objectives is to be able to send emails about the users results after reading our `Text`s. To do that, we need a service that allow us to send emails using code, and at this moment we can use [SendGrid](https://sendgrid.com/).  
**SendGrid** is basically a service that gives us a API to send emails and even perfom some customizations, such as creating HTML templates and filling them with custom data.
Lets verify with an example how we can send a simple email with HTML/raw text. 
You can create a free account [here](https://signup.sendgrid.com/).
To be able to send emails and use the SendGrid API with our code, we need to generate a key and use it, just to prove that we are real users and we have a real account at SendGrid.

1. Go to [API KEYs dashboard](https://app.sendgrid.com/settings/api_keys)
2. Click on the blue button "Create API Key"
3. Give it a name and choose "Restricted Access"
4. On permission options, choose just "Mail Send/Mail Send"
4. Click on "Create & View"

Now you will have a big code that will be used to authenticate using code, instead of using email/password.

## Adding SendGrid library to the project
SendGrid actually has a really complete library with all code and functions ready to use. You can verify more details [here](https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail).
To install and use it in our project, do the following:
1. Run: `npm install --save @sendgrid/mail`

And now, we can do to our `index.js` and start adding a new route:
```javascript
const sgMail = require('@sendgrid/mail'); // At the top of the file
sgMail.setApiKey('your-api-generated-key'); // Near to other config 

app.get('/mail', async (request, response) => { // 1.
  const msg = {
    to: 'you-email@gmail.com',
    from: 'you-email@gmail.com',
    subject: 'This is my title!',
    html: 'This is my <strong>Text</strong>',
  }; // 2.
  try {
    await sgMail.send(msg); // 3.
    return response.send({ message: 'Email send!' })
  } catch (error) {
    return response.send({ error: `An error occurred: ${error}` })
  }
})
```
> 1. At this moment, we just created a simple GET route to be easier to test and verify if everything is working. After we understand how the library works, we will change it to a POST request and also receive some information from the front-end, such as the email from the person that did the test, and also the result that the person received.
> 2. We are now creating an object with all information necessary to use as a parameter to be able to send an email. Notice that we will change the `to` in the future to use the data received in the POST body request and also the `html` content to send more complex emails.   
> **SendGrid** actually has a online plataform to create beautiful`templates`, and we will use it later. But there is no problem creating an HTML template by hand.
> 3. We will use the method `.send()` from the `sgMail` library that we imported. This method will read the that we give in the `msg` variable and send an email based on that. 

## Creating custom email templates
A really interesting feature that we are able to use is creating beatiful email templates using the drag'n'drop tool called `dynamic templtes` from the SendGrid webiste. You can verify more [here](https://mc.sendgrid.com/dynamic-templates).  

1. Click on "Create a Dynamic Template" and give it a name
2. Open the created tab and click on "Add Version" to start editing using the online tool
2.1 You can insert in the middle of text some variable, as follow:  
2.1.1 Note that we added some special text with this syntax: {{variableName}}, we can secify those variables in our API, when calling the `.send()` method. We will verify a detailed example later on.
> Lets imagine that the selected template just has tex:
```
Hi {{receiverName}}! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Your result was {{resultValue}}. Fusce imperdiet eu turpis eu tincidunt. Sed id rhoncus tortor. Fusce id commodo ex.
You can verify more details <a href="https://google.com.br">here</a>
```
3. When you finished the customization of templates, dont forget to get the **Template ID**. It will be a value like: *d-aaaaaaabbbbccccdeeeeeee111111122223333*

## Sending custom email templates
Now we will change the previously created route to send emails. We will make it more flexible and complete, using the new features and being compatible with what we need to do:
```javascript
app.post('/mail', async (request, response) => {
  let emailInformation = request.body // 1.
  const msg = {
    to: emailInformation.to, // 2.
    from: 'you-email@gmail.com', // 3.
    templateId: 'd-aaaabbbbcccddddeeee', // 4.
    dynamic_template_data: {
      receiverName: emailInformation.receiverName, // 5.
      resultValue: emailInformation.resultValue   // 5.
    },
  };
  try {
    await sgMail.send(msg);
    return response.send({ message: 'Email send!' })
  } catch (error) {
    return response.send({ error: `An error occurred: ${error}` })
  }
})
```
> 1. We will change the HTTP VERB to `POST` so we can receive more information in the body from our front-end, in the request body. This information will be everything related to what we need to send and to who.
> 2. The user that did the test will give us her/his email to send the result. 
> 3. This email is our own email and it is a good practice to use a real and trusted email provider, or maybe the emails sent with our back-end will be considered spam.
> 4. This is the `ID` from the template that we created using the online tool.
> 5. [here](#Creating-custom-email-templates), at **2.1.1** we added some variables to our email template and they will be filled with the values that we provide inside the `dynamic_template_data` object. Just make sure to use the same names, so we are able to add literally dynamic data everytime we send an email.
