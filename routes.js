const multer = require("koa-multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const Router = require("koa-router");
const { check } = require("./controller/helth");
const { generateDescription } = require("./controller/generateDescription");
const { uploadImage } = require("./controller/uploadImage");
const routes = new Router();

routes.get("/health", check);
routes.post("/description", generateDescription);
routes.post("/image/upload", upload.single("imgFile"), uploadImage);
module.exports = routes;
