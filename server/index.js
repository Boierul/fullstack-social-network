import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan"

// These 2 will allow to set the paths properly
import path from "path";
import {fileURLToPath} from "url"

import authRoutes from "./routes/auth.js";
import {register} from "./controllers/auth.js";


/*  Configuration of the server (including middleware)  */

// Grabs the file URL
// It is used specifically for modules,
// which are set as ->  "type": "module" in package.json
const __filename = fileURLToPath(import.meta.url);
// Grabs the directory of the file
const __dirname = path.dirname(__filename);

// Access to .env
dotenv.config();

// Connection to the Express framework
const app = express();

// Middlewares
//
// Parse requests to JSON
app.use(express.json)
//  Configure request safety
app.use(helmet)
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
// Configure logging format
app.use(morgan("common"))
// Configure request body
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
// Allow cross-origin requests
app.use(cors());
// Set the dir where the assets are kept on server
// !In a production app this data should be stored in a DB!
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


/* Configuration of the File Storage */

// The disk storage engine gives full control on storing files to disk.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
// Save the file to the storage
const upload = multer({storage});


/* Routes with files */

// Includes middleware functions
// Are not included in the routes as it needs multer.diskStorage
// In this case is uploading an image in the local storage
app.post("/auth/register", upload.single("picture"), register);


/* Regular routes */
app.use("/auth", authRoutes);
app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});


/* Mongoose set-up */

// Set up the port
const PORT = process.env.PORT || 6001
// Connect to the DB
//
//  { useNewUrlParser, useUnifiedTopology } will prevent errors
// in the mongoose.connect()
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`))
