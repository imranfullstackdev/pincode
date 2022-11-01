const fs = require("fs");
const { parse } = require("csv-parse");
const express = require("express");
const pool = require("./db/db");
const app = express();
app.use(express.json());
let arr = [];
fs.createReadStream("./health_pincode.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    arr.push({ PINCODE: row[0], CITYCD: row[1], STATECD: row[2] });
    arr.push(row);

    // console.log(arr)
    const query = `insert into pincodetable(PINCODE,CITYCD,STATECD)`;
    app.post('/pincode',async(req,res)=>{
        arr.map(async(pincode)=>{
            const {PINCODE,CITYCD,STATECD}=pincode;
            const getPin=await pool.query(
                `insert into pincodetable(PINCODE,CITYCD,STATECD) values($1,$2,$3)`,[
                PINCODE,CITYCD,STATECD
            ]
            )
        })
        console.log("arr",arr)
        res.send({pincode:arr})
    })
    // console.log(arr)
  });
app.listen(8000,()=>{
    console.log("app is listening at the port 8000")
})