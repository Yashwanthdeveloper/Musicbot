const client = require("../index");

client.on("message", (message) => {
  if (!message.guild || message.author.bot) return;
  let data = client.db.get(`antilink-${message.guild.id}`);
  if (!data) return;
  try {
    const messagedelete = () => {
      message.delete();
      message
        .reply(
          ` Noob Don't Send Any Type Of Link Here Bcz I am The Anti-Link Bot 😁😁 `
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
    };
    if (data === true) {
      if (
        message.content.match("https://") ||
        message.content.match("discord.gg") ||
        message.content.match("www.")
      ) {
        messagedelete();
      }
    }
  } catch (e) {
    console.log(e);
  }
});
