require("app-module-path").addPath(__dirname);
const config = require("config");
const app = require("src/app");
app.listen(config.port, (err, res) => {
    console.log("listening on port",config.port);
});