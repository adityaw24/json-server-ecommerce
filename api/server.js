// See https://github.com/typicode/json-server#module
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const fs = require("fs");

const server = jsonServer.create();
const db = JSON.parse(fs.readFileSync("db.json"));
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);
// Add this before server.use(router)
// server.use(jsonServer.rewriter({
//     '/api/*': '/$1',
//     '/blog/:resource/:id/show': '/:resource/:id'
// }))
server.use("/api", auth);
server.use("/api", router);
server.listen(8000, () => {
  console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
