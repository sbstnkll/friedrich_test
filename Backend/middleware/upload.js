
// zum einbinden der environment Variables
require('dotenv').config()
const uri = process.env.MONGO_URI; // auslesen der .env datei




module.exports = multer({ storage });