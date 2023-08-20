require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
const nodemailer = require('nodemailer');
const User = require("./models/user")
const Userdetail = require("./models/details");
const doctors = require("./models/doctor");



app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_ID, 
    resave: false,
    saveUninitialized: true 
  }));

app.use(express.static(__dirname +'/public'));

mongoose.set('strictQuery',true)
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, { 
useNewUrlParser: true,
useUnifiedTopology: true
}).then((err)=> {
    if(!err)
    {
        console.log("connected to database");
    }
    else{
        console.log(err);
    }
})


app.post("/signup", async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try{
         const user =  await User.signup(name,email,password); 
         if(user)
         {
            res.redirect('/login')
         }
    }
    catch(error){
        console.log(error);
    }
   });

let loggedin = false;

app.post('/login' ,async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    try{
        const login_user =  await User.login(email,password);
        if(login_user)

        {   req.session.login_user = login_user;
            loggedin = true;
            res.redirect('/')
        }
        else{
            res.render('/login')
        }
    }
    catch(error)
    {
        console.log(error);
    }
})


app.get('/',(req,res)=>{
    const login_user = req.session.login_user;
    res.render('landing',{loggedin,login_user})
})

app.get("/signup",(req,res)=>{
    const login_user = req.session.login_user;
    res.render('signup',{loggedin,login_user});
})

app.get('/login',(req,res)=>{
    const login_user = req.session.login_user;
    res.render('loginpage',{loggedin,login_user})
})

app.get('/about',(req,res)=>{
    const login_user = req.session.login_user;
    res.render('about',{loggedin,login_user})
})


app.get("/doctor",(req,res)=>{
    const login_user = req.session.login_user;
    if(login_user)
    {
        res.render('profile',{doctors,loggedin,login_user});
    }
    else{
        res.redirect('/login')
    }
    
})

app.get("/book" ,(req,res)=>{
    const login_user = req.session.login_user;
    if(login_user)
    {
        res.render('form',{loggedin,login_user,doctors});
    }
    else{
        res.redirect('/login')
    }
    
}); 
app.get('/logout',(req,res)=>{
    loggedin = false;
    req.session.login_user = null;
    res.redirect('/');
})

app.get('/confirm',(req,res)=>{
    const login_user = req.session.login_user;
    res.render('slotresponse',{loggedin,login_user})
})

app.get('/emailconfirm',(req,res)=>{
    const login_user = req.session.login_user;
    res.render('requestresponse',{loggedin,login_user})
})



app.post("/book",(req,res)=>{
    const login_user = req.session.login_user;
    var myData = new Userdetail(req.body);
    const Recipient = req.body.Name;
    const doctor = req.body.DoctorName;
    const date = req.body.DateofAppointment;
    const slot = req.body.Slot;
    try{
        console.log(req.body);
        myData.save()
        var transporter = nodemailer.createTransport({
            service:'gmail',
           port:465,
           secure:false,
           logger:true,
           debug:true,
           auth: {
             user:process.env.SENDER_EMAIL,
             pass:process.env.SENDER_PASSWORD
           },
           tls:{
               rejectUnauthorized:true
           }
         });
         
         var mailOptions = {
           from:process.env.SENDER_EMAIL,
           to:login_user.email,
           subject: 'Confirmation mail from MED-CARE',
           text: `Dear ${Recipient},

           We are thrilled to inform you that your slot for a doctor consultation has been successfully booked.
           Your appointment details are as follows:
           
           Date:${date}
           Time:${slot}
           Doctor:${doctor}
           
           Please mark your calendar and ensure to arrive a few minutes early for any necessary paperwork. 
           If you need to reschedule or have any questions, don't hesitate to reach out to us.
           Wishing you good health and looking forward to assisting you during your visit.`
         };
         
         transporter.sendMail(mailOptions, function(error, info){
           if (error) {
             console.log(error);
           } else {
             console.log('Email sent: ' + info.response);
           }
         });
         res.redirect('/confirm')
    } 
    catch(error)
    {
        res.send(error)
    }

}); 




app.post('/send-email', (req, res) => {
    const  {doctoremail}  = req.body;
    const login_user = req.session.login_user;
    try{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
           port:465,
           secure:false,
           logger:true,
           debug:true,
           auth: { 
             user:process.env.SENDER_EMAIL,
             pass:process.env.SENDER_PASSWORD  
           },
           tls:{
               rejectUnauthorized:true 
           }
         });
         
         var mailOptions = {
           from:process.env.SENDER_EMAIL,
           to:doctoremail,
           subject: 'Appointment Request via Med-Care Organization',
           text:`

        I hope this message finds you well. My name is ${login_user.name} and I am writing to request an appointment with you through the Med-Care Organization. 
        I have been referred to your practice by a friend who spoke highly of your expertise and patient care.
        I am seeking medical consultation. I believe your specialized knowledge in this field will be instrumental in addressing my health needs.
        As a patient, I value the convenience and professional services offered by the Med-Care Organization, and I trust that this platform will facilitate a seamless appointment booking process.
        I am open to scheduling the appointment at your earliest availability or at a time that best suits your schedule.

        Before the appointment, I can provide any necessary medical records or documentation to streamline the consultation process. 
        Please let me know if there are any specific documents you require.

        I am eager to meet with you and discuss my health concerns. 
        Your expertise and guidance are essential in helping me make informed decisions about my well-being.

        Thank you for considering my appointment request. I eagerly await your response. 
        Should you require any further information from me, please do not hesitate to reach out at ${login_user.email}.
        Looking forward to meeting you soon.

        Sincerely,

        ${login_user.name}` 
         };
         
         transporter.sendMail(mailOptions, function(error, info){
           if (error) {
             console.log(error);
           } else {
             console.log('Email sent: ' + info.response);
           } 
         });

         
         res.redirect('/emailconfirm');
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({error:error.message})
}
})

app.listen(8000,(err)=>{
    if(!err){
        console.log("Server started running at port 8000");
    }
    else{
        console.log("Error in the server");
    } 
});
