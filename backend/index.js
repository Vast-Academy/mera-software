const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connnectDB = require("./config/db")
const router = require("./routes")



const app = express()

const allowedOrigins = [
    'https://www.merasoftware.com',
    'https://merasoftware.com',
    process.env.FORNTEND_URL, // आपके .env से
    'http://localhost:3000' // लोकल डेवलपमेंट के लिए
  ];
  app.use(cors({
    origin: function(origin, callback) {
      // मोबाइल ऐप्स या नो-ओरिजिन रिक्वेस्ट्स के लिए अनुमति दें
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('Origin not allowed by CORS:', origin);
        callback(null, false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
  }));

  app.options('*', cors());

app.use(express.json())
app.use(cookieParser())

app.use("/api", router)

app.use('/uploads', express.static('uploads'));

const PORT = 8080 || process.env.PORT

connnectDB().then(() => {
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})