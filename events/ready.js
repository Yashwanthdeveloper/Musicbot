const client = require("../index");
const config = require("../config/config.js");

client.on("ready", () => {
  console.log(`${client.user.username} Is Online `);
  client.user.setActivity(`${config.prefix}help || Fire Bird`, {
    type: "WATCHING",
  });
});
