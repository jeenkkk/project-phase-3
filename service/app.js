/* Import modules here: express, dotenv, router */
/* Config dotenv and router */
/* Connection to MySQL */
const mysql = require('mysql2');
const express = require('express');
const dotenv = require('dotenv')
const app = express();
const path = require("path");
const bodyParser = require('body-parser');


dotenv.config({ path: path.join(__dirname, './.env') })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/')));
app.set('SEC3', 'ejs');
/***********************DB************************** */
var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.PORT
});

var cors = require ("cors");
app.use(cors());
connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log("Connected DB: " + process.env.MYSQL_DATABASE);
});
/***********************DB************************** */
app.listen(3030, () => { console.log("Express server is running at port no: 3030") });
/************************************************************ USER **********************************************************/
// Testing Select all users
// method: GET
// URL: http://localhost:3030/User_info

app.get('/selectallpro', (req, res) => { //SELECTALL
    connection.query('SELECT * FROM Product_info', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }

    })
});
app.post('/insertpro', (req, res) => { //INSERT
    let Product = req.body.show;
    console.log(Product);
    let sql = "INSERT INTO Product_info (Product_ID, Product_Name, Product_Description, Product_Price, Product_Image, Product_Category) VALUES (?,?,?,?,?,?)";
    connection.query(sql, [Product.Product_ID, Product.Product_Name, Product.Product_Description, Product.Product_Price, Product.Product_Image, Product.Product_Category], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    })
});
app.put('/updatepro', (req, res) => { //UPDATE
    let ProductID = req.body.show.Product_ID;
    let Product = req.body.show;
    console.log(Product);
    if(Product.Product_ID != ProductID){
        res.send("Product ID not match");
    }
    let sql = "UPDATE Product_info SET Product_Name = ?, Product_Description = ?, Product_Price = ?, Product_Image = ?, Product_Category = ? WHERE Product_ID = ?";
    connection.query(sql, [Product.Product_Name, Product.Product_Description, Product.Product_Price, Product.Product_Image, Product.Product_Category, Product.Product_ID], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    })
});

app.delete('/deletepro', (req, res) => { //DELETE
    let ProductID = req.body.show.Product_ID;
    let Product = req.body.show;
    console.log(Product);
    if(Product.Product_ID != ProductID){
        res.send("Product ID not match");
    }
    let sql = "DELETE FROM Product_info WHERE Product_ID = ?";
    connection.query(sql, [Product.Product_ID], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    })
});
app.post('/searchproid', (req, res) => { //SELECT BY ID
    let ProductID = req.body.search.Product_ID;
    let Product = req.body.search;
    console.log(Product);
    if(Product.Product_ID != ProductID){
        res.send("Product ID not match");
    }
    let sql = "SELECT * FROM Product_info WHERE Product_ID = ?";
    connection.query(sql, [Product.Product_ID], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    })
});
app.post('/searchproname', (req, res) => { //SELECT BY Name
    let Product_Name = req.body.search.Product_Name;
    let Product = req.body.search;
    console.log(Product);
    if(Product.Product_Name != Product_Name){
        res.send("Product_Name not match");
    }
    let sql = "SELECT * FROM Product_info WHERE Product_Name = ?";
    connection.query(sql, [Product.Product_Name], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    })
});

app.post('/searchprocate', (req, res) => { //SELECT BY Category
    let Product_Category = req.body.search.Product_Category;
    let Product = req.body.search;
    console.log(Product);
    if(Product.Product_Category != Product_Category){
        res.send("Product_Category not match");
    }
    let sql = "SELECT * FROM Product_info WHERE Product_Category = ?";
    connection.query(sql, [Product.Product_Category], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    })
});

/************************************************************ Product **********************************************************/
app.get('/selectallus', (req, res) => { //SELECTALL
    connection.query('SELECT * FROM User_info', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }

    })
});
app.post('/insertus', (req, res) => { //INSERT
    let User = req.body.show;
    console.log(User);
    let sql = "INSERT INTO User_info (Firstname, Lastname, Username, Password, email, role) VALUES (?,?,?,?,?,?)";
    connection.query(sql, [User.Firstname, User.Lastname, User.Username, User.Password, User.email, User.role], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    })
});
app.put('/updateus', (req, res) => { //UPDATE
    let Username = req.body.show.Username;
    let User = req.body.show;
    console.log(User);
    if(User.Username != Username){
        res.send("Username not match");
    }
    let sql = "UPDATE User_info SET Firstname = ?, Lastname = ?, Username = ?, Password = ?, email = ?, role = ? WHERE Username = ?";
    connection.query(sql, [User.Firstname, User.Lastname, User.Username, User.Password, User.email, User.role, User.Username], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    }
    )
});

app.delete('/deleteus', (req, res) => { //DELETE
    let Username = req.body.show.Username;
    let User = req.body.show;
    console.log(User);
    if(User.Username != Username){
        res.send("Username not match");
    }
    let sql = "DELETE FROM User_info WHERE Username = ?";
    connection.query(sql, [User.Username], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    }
    )
});
app.post('/searchusr', (req, res) => { //SELECT BY User
    let Username = req.body.show.Username;
    let User = req.body.show;
    console.log(User);
    if(User.Username != Username){
        res.send("Username not match");
    }
    let sql = "SELECT * FROM User_info WHERE Username = ?";
    connection.query(sql, [User.Username], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    })
});
app.post('/searchusremail', (req, res) => { //select by email
    let email = req.body.show.email;
    let User = req.body.show;
    console.log(User);
    if(User.email != email){
        res.send("email not match");
    }
    let sql = "SELECT * FROM User_info WHERE email = ?";
    connection.query(sql, [User.email], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    })
});

app.post('/searchusrrole', (req, res) => { //SELECT BY role
    let role = req.body.show.role;
    let User = req.body.show;
    console.log(User);
    if(User.role != role){
        res.send("role not match");
    }
    let sql = "SELECT * FROM User_info WHERE role = ?";
    connection.query(sql, [User.role], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    })
});

/************************************************************ USER **********************************************************/
app.post('/welcomeadmin', (req, res) => { //SELECTALL
    //let Username = req.body.show.Username;
    let User = req.body.show;
    console.log(User);
    if(User.role != "admin"){
        alert("you are not admin");
    }
    else{
        res.send("welcome admin");
    }
});