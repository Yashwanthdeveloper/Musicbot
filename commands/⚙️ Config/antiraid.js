const { Message } = require("discord.js");
const { Bot } = require("../../handlers/Client");

module.exports = {
  name: "antiraid",
  aliases: ["anti-raid"],
  category: "⚙️ Config",
  memberpermissions: ["ADMINISTRATOR"],
  cooldown: 5,
  description: "Enables anti-raidmode and won't allow new members to join.",
  usage: "antiraid",
  /**
   * @param {Bot} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    options = ["enable", "disable"];

    if (!args.length)
      return message.reply("Please enter either **enable** or **disable**");
    const opt = args[0].toLowerCase();
    if (!opt)
      return message.reply("Please enter either **enable** or **disable**");

    if (!options.includes(opt))
      return message.reply("Please enter either **enable** or **disable**");

    if (opt === "enable") {
      client.db.set(`antiraid-${message.guild.id}`, true);
      message.reply(`Success! Anti-raidmode is enabled`);
    }

    if (opt === "disable") {
      client.db.set(`antiraid-${message.guild.id}`, false);
      message.reply("The Anti-raidmode has already been disabled");
    }
  },
};
