const { Message, MessageEmbed } = require("discord.js");
const { Bot } = require("../../handlers/Client");

module.exports = {
  name: "ping",
  category: "🔰 Info",
  aliases: ["api"],
  cooldown: 5,
  description: "Get Bot Ping..",
  usage: "ping",
  memberpermissions: [" "],
  /**
   * @param {Bot} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.channel.send(
      new MessageEmbed().setDescription(`> 🎈 Ping ${client.ws.ping}ms`)
    );
  },
};
