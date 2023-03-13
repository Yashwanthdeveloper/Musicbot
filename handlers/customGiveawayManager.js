const db = require("quick.db");
if (!Array.isArray(db.get("giveaways"))) db.set("giveaways", []);

const { GiveawaysManager } = require("discord-giveaways");
const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
  // This function is called when the manager needs to get all giveaways which are stored in the database.
  async getAllGiveaways() {
    // Get all giveaways from the database
    return db.get("giveaways");
  }

  // This function is called when a giveaway needs to be saved in the database.
  async saveGiveaway(messageId, giveawayData) {
    // Add the new giveaway to the database
    db.push("giveaways", giveawayData);
    // Don't forget to return something!
    return true;
  }

  // This function is called when a giveaway needs to be edited in the database.
  async editGiveaway(messageId, giveawayData) {
    // Get all giveaways from the database
    const giveaways = db.get("giveaways");
    // Remove the unedited giveaway from the array
    const newGiveawaysArray = giveaways.filter(
      (giveaway) => giveaway.messageId !== messageId
    );
    // Push the edited giveaway into the array
    newGiveawaysArray.push(giveawayData);
    // Save the updated array
    db.set("giveaways", newGiveawaysArray);
    // Don't forget to return something!
    return true;
  }

  // This function is called when a giveaway needs to be deleted from the database.
  async deleteGiveaway(messageId) {
    // Get all giveaways from the database
    const giveaways = db.get("giveaways");
    // Remove the giveaway from the array
    const newGiveawaysArray = giveaways.filter(
      (giveaway) => giveaway.messageId !== messageId
    );
    // Save the updated array
    db.set("giveaways", newGiveawaysArray);
    // Don't forget to return something!
    return true;
  }
};

module.exports = { GiveawayManagerWithOwnDatabase };
