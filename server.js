const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const app = express();
const PORT = 8080;
const admin = require('./config/firebase')
const bodyParser = require("body-parser");
const axios = require('axios');
const { snapshotEqual } = require("firebase/firestore");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname));
app.use(express.static('assets'));

app.use(express.static(__dirname + "/public"));
app.set("views", "./views");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");
app.set("view engine", "ejs");

//ROUTES
app.get("/", async function (req, res) {
    res.render('index', {
        title: 'Home',
        page: 'index'
    });
});

app.get("/contact", async function (req, res) {
    res.render('contact', {
        title: 'Contact',
        page: 'contact'
        // other data
    });
});

app.get("/about", async function (req, res) {
    res.render('about', {
        title: 'About',
        page: 'about'
    });
});

app.get("/contacts-monitor", async function(req, res) {
    const contactsResponse = await axios.get('http://localhost:8080/api/contact')
    if(contactsResponse.status !== 200){
        throw new Error('Error ocurred while processing the request.' + contactsResponse.status)
    }
    console.log(contactsResponse.data);
    res.render('contacts-monitor', {
        title: 'contacts monitor',
        page: 'contacts-monitor',
        contacts: contactsResponse.data
    })
})

app.get("/edit-contact/:id", async function (req, res) {
    const contactId = req.params.id
    const contactResponse = await axios.get('http://localhost:8080/api/contact/' + contactId)
    if(contactResponse.status !== 200){
        throw new Error('Error ocurred while processing the request.' + contactResponse.status)
    }
    res.render('edit-contact', {
        title: 'edit contact',
        page: 'edit-contact',
        contact: contactResponse.data
    })
})

//API
//contact
const contactsRef = admin.firestore().collection('contacts')

app.get("/api/contact", async (req, res) =>{
    try{
        const contactsResponse = await contactsRef.get();
        const contactsList = [];

        contactsResponse.forEach((doc) => {
            const contactData = doc.data();
            contactData.id = doc.id;
            contactsList.push(contactData);
        })
        res.json(contactsList);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while processing the request.'})
    }
})

app.get("/api/contact/:id", async (req, res) =>{
    try{
        const contactId = req.params.id;
        const contactResponse = await contactsRef.doc(contactId).get();

        if (!contactResponse.exists) {
            res.status(404).json({ error: 'Contact not found.' });
            return;
        }

        const contactData = contactResponse.data()
        contactData.id = contactResponse.id;
        res.json(contactData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while processing the request.'})
    }
})

app.post("/api/contact", async (req, res) => {
    try {
        const contactResponse = await contactsRef.add({
            firstName: req.body.firstName,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
            fromCanada: req.body.fromCanada
        }, { ignoreUndefinedProperties: true });

        res.json(contactResponse);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
})

app.put("/api/contact/:id", async (req, res) => {
    try{
        const contactId = req.params.id;
        const contactData = req.body;

        await contactsRef.doc(contactId).update(contactData);
        res.status(200).json({ message: 'Contact update sucessfully!'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
})

app.delete("/api/contact/:id", async (req, res) =>{
    try{
        const contactId = req.params.id;
        await contactsRef.doc(contactId).delete();

        res.status(200).json({ message: 'Contact deleted sucessfully.'})
    }catch (error){
        console.log(error);
        res.status(500).json({ error: 'An erro occurred while processing the request.'})
    }
})



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('http://localhost:' + PORT)
});
