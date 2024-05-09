let fs = require('fs');
let express = require('express');
let bodyParser = require('body-parser');

let PORT = 80
// let PORT = 3000

let app = express();
let urlencodeParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));


const fileDZadd = fs.readFileSync('DZadd.json', 'utf8' ,() => {});
const jsObjectDZadd = JSON.parse(fileDZadd);

const CoKPfileDZadd = fs.readFileSync('DZCoKP.json', 'utf8' ,() => {});
const CoKPjsObjectDZadd = JSON.parse(CoKPfileDZadd);


app.post('/add', urlencodeParser, function(req, res) {
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    let DZadd = fs.readFileSync('DZadd.json' , 'utf8');
    let allDZadd = DZadd.substring(0, DZadd.length-1)+',\n '+JSON.stringify(req.body)+"]";
    console.log(allDZadd);
    fs.writeFileSync('DZadd.json', allDZadd, function(error) {
        if(error) throw error;
        console.log("Асинхронная запись файла завершена.");
    });
    res.render('add');
});

app.post('/CoKP', urlencodeParser, function(req, res) {
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    let DZCoKP = fs.readFileSync('DZCoKP.json' , 'utf8');
    let allDZCoKP = DZCoKP.substring(0, DZCoKP.length-1)+'\n, '+JSON.stringify(req.body)+"]";
    console.log(allDZCoKP);
    fs.writeFileSync('DZCoKP.json', allDZCoKP, function(error) {
        if(error) throw error;
        console.log("Асинхронная запись файла завершена.");
    });
    res.render('CoKP');
});



//Сервер
app.listen(PORT);
app.get('/', (req, res) => {
    res.render('what');
})

app.get('/add', (req, res) => {
    res.render('add');
})

app.get('/CoKP', (req, res) => {
    res.render('CoKP');
})

app.get('/what', (req, res) => {
    res.render('what');
})

app.get('/view', (req, res) => {
    res.render('viewlight', {data: jsObjectDZadd , dataCoKP: CoKPjsObjectDZadd});
})





