require("colors");
const { Bot } = require("./handlers/Client");
const config = require("./config/config");

// client define
const client = new Bot();

module.exports = client;

if (!Array.isArray(client.db.get("giveaways"))) client.db.set("giveaways", []);

// //Loading discord-buttons
require("discord-buttons")(client);

["command", "events", "distube"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.login(process.env.token || config.token);

// process.on("unhandledRejection", (reason, p) => {
//   console.log(" [Error_Handling] :: Unhandled Rejection/Catch");
//   console.log(reason, p);
// });
// process.on("uncaughtException", (err, origin) => {
//   console.log(" [Error_Handling] :: Uncaught Exception/Catch");
//   console.log(err, origin);
// });
// process.on("uncaughtExceptionMonitor", (err, origin) => {
//   console.log(" [Error_Handling] :: Uncaught Exception/Catch (MONITOR)");
//   console.log(err, origin);
// });
// process.on("multipleResolves", (type, promise, reason) => {
//   console.log(" [Error_Handling] :: Multiple Resolves");
//   console.log(type, promise, reason);
// });
