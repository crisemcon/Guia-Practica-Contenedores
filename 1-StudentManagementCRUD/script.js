const mysql = require("mysql");
const express = require("express");

var app = express();
//Configuring express server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MySQL details
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "studentmanagement",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 30001;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//Creating GET Router to fetch all the student details from the MySQL Database
app.get("/students", (req, res) => {
  mysqlConnection.query("SELECT * FROM student", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Router to GET specific student detail from the MySQL database
app.get("/students/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM student WHERE student_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Router to INSERT/POST a student's detail
app.post("/students", (req, res) => {
  let student = req.body;
  if(student.student_id === undefined){
    student.student_id = 0;
  }
  var sql =
    "SET @student_id = ?;SET @student_name = ?;SET @student_email = ?;SET @student_phone = ?; CALL studentAddOrEdit(@student_id,@student_name,@student_email,@student_phone);";
  mysqlConnection.query(
    sql,
    [
      student.student_id,
      student.student_name,
      student.student_email,
      student.student_phone,
    ],
    (err, rows, fields) => {
      if (!err) res.send("Student Created Successfully");
      else console.log(err);
    }
  );
});

//Router to UPDATE a student's detail
app.put("/students", (req, res) => {
  let student = req.body;
  var sql =
    "SET @student_id = ?;SET @student_name = ?;SET @student_email = ?;SET @student_phone = ?; CALL studentAddOrEdit(@student_id,@student_name,@student_email,@student_phone);";
  mysqlConnection.query(
    sql,
    [
      student.student_id,
      student.student_name,
      student.student_email,
      student.student_phone,
    ],
    (err, rows, fields) => {
      if (!err) res.send("Student Details Updated Successfully");
      else console.log(err);
    }
  );
});

//Router to DELETE a student's detail
app.delete("/students/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM student WHERE student_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Student Record deleted successfully.");
      else console.log(err);
    }
  );
});
