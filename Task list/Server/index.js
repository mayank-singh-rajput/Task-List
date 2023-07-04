const express = require('express');
const app = express();

app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const mysql = require('mysql2');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "task",
    port: "3306"
});

db.connect((err) => {
    if(err) console.log(err);
    else console.log('DB connected!');
})


app.post("/api/insert", async(req, res)=> {
    const Name =  req.body.Name
    const Title =  req.body.Title
    const Description =  req.body.Description
    const Status = req.body.Status

    const sqlInsert = "INSERT IGNORE INTO tasklist (name, title, description, Status) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [Name, Title, Description, Status], (err, result)=>{
        if (err) throw err; 
     res.send(result);
    }); 
});

app.get('/api/select/:Name', async(req, res)=> {
    const Name = req.params.Name
    const sqlSelect = "SELECT * FROM tasklist WHERE Name = ?";
    db.query(sqlSelect, Name, (err, result)=>{
        if (err) throw err;    
     res.send(result);
});
});

app.delete('/api/delete/:Name/:Title', async(req, res) => {
    const Name = req.params.Name
    const Title = req.params.Title
    const sqlDelete = "DELETE FROM tasklist WHERE Name = ? and Title = ?";
    db.query(sqlDelete, [Name, Title], (err, result)=>{
        if (err) throw err;  
     res.send(result);
});
});

app.put('/api/update', async(req, res) => {
    const Name = req.body.Name
    const Title = req.body.Title
    const Description = req.body.Description
    const sqlUpdate = "UPDATE tasklist SET Description = ? WHERE Name = ? and Title = ?";
    db.query(sqlUpdate, [Description, Name, Title], (err, result)=>{
        if (err) throw err;   
     res.send(result);
});
});

app.put('/api/update/Status', async(req, res) => {
    const Name = req.body.Name
    const Title = req.body.Title
    const Status = req.body.Status
    const sqlUpdate = "UPDATE tasklist SET Status = ? WHERE Name = ? and Title = ?";
    db.query(sqlUpdate, [Status, Name, Title], (err, result)=>{
        if (err) throw err;   
     res.send(result);
});
});

app.put('/api/update/State', async(req, res) => {
  const Name = req.body.Name
  const Title = req.body.Title
  const Status = req.body.Status
  const sqlUpdate = "UPDATE tasklist SET Status = ? WHERE Name = ? and Title = ?";
  db.query(sqlUpdate, [Status, Name, Title], (err, result)=>{
      if (err) throw err;    
   res.send(result);
});
});

app.listen(4000, function() {
    console.log("running on local host: 4000");
  });
  