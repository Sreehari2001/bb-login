const express = require('express');
const DB = require('./connection');
const path = require('path');
const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(PORT, () =>{
    console.log('Server started at http://localhost:' + PORT);
});

app.get('/', (req, res) => {
    res.redirect('home');
})

app.get('/register', (req, res) => {
    res.sendFile('register.html', {root:__dirname});
})

app.get('/home', (req, res) => {
    res.sendFile('home.html', {root:__dirname});
})

app.post('/register', (req, res) => {
    var data = req.body
    var a=[]
    Object.keys(data).forEach(key => {
        a.push(data[key])
    })
    console.log(a);
    var personal = data.personalmailid
    var com = data.community
    var aad = data.aadhar
    var ssc = data.sscpercentage
    var sscyr = data.sscyear
    var interpercent = data.interpercentage
    var interyr = data.interyear
     var b = data.noofbacklogsbtech
     var x = data.bebtechyop
     var sql = `INSERT INTO test(name, gender, fathername, mothername, fatheroccupation, motheroccupation, password, dob, contact, contactparent, personalmailid, collegemailid, community, meesevano, aadhar, sscpercentage, sscyear, interpercentage, interyear, currentcollegename, district, bebtechpercentage, bebtechyop, bebtechbranch, noofbacklogsbtech, bscpercentage, bscyop, bscbranch, noofbacklogsbsc, mcabtechpercentage, mcayop, mcabranch, noofbacklogsmca) VALUES ('${data.name}','${data.gender}','${data.fathername}','${data.mothername}','${data.fatheroccupation}','${data.motheroccupation}','${data.password}','${data.dob}','${data.contact}','${data.contactparent}','${personal}','${data.collegemailid}','${com}','${data.meesevano}','${aad}','${ssc}','${sscyr}','${interpercent}','${interyr}','${data.currentcollegename}','${data.district}','${data.bebtechpercentage}','${x}','${data.bebtechbranch}','${b}','${data.bscpercentage}','${data.bscyop}','${data.bscbranch}','${data.noofbacklogsbsc}','${data.mcabtechpercentage}','${data.mcayop}','${data.mcabranch}','${data.noofbacklogsmca}')`
     DB.query(sql, (err, result) => {
         if (err) throw err;
         else{
             console.log('User Successfully registered');
           //  res.sendFile('message.html', {root:__dirname});
           res.render('message',{a})
         }
     })
})

