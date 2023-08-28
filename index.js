require("dotenv").config();

const Koa = require("koa");
const koaBody = require("koa-body");
const cors = require("koa2-cors");

// const variables = require("./variables");

const router = require("./routes");
const { port } = require("./variables");

const app = new Koa();

app.use(koaBody());
app.use(cors({ origin: "*" }));
app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(port, () => {
  console.log("server running on port", port);
});

module.exports = server;
