const PooL = require("pg").Pool;
const Pool = new PooL({
  user: "postgres",
  database: "Pincode_db",
  password: "lmvit123",
  port: 5432,
});
module.exports = Pool;
