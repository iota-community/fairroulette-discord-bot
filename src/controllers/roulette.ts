import Discord from "discord.js";

/**
 * Handle the start of a round and send an embed to the
 * channnel
 *
 * @param {String} msg
 * @param {Discord.TextBasedChannels} channel
 */

const handleRoundStart = async (
  msg: string,
  channel: Discord.TextBasedChannels
) => {
  const args = msg.split("fairroulette.")[1].split(" ");
  const embed = new Discord.MessageEmbed()
    .setColor("#b0bfd9")
    .setTitle("Round Started")
    .setDescription(`Round ${args[1]} started`);
  channel.send({ embeds: [embed] });
};

/**
 * Handle the event when a bet is placed by a player
 *
 * @param {String} msg
 * @param {Discord.TextBasedChannels} channel
 */

const handleBetPlaced = async (
  msg: string,
  channel: Discord.TextBasedChannels
) => {
  const args = msg.split("fairroulette.")[1].split(" ");
  const embed = new Discord.MessageEmbed()
    .setColor("#b0bfd9")
    .setTitle("Bet Placed")
    .addFields(
      { name: "Player", value: args[1] },
      { name: "Amount Betted", value: `${args[2]}i` },
      { name: "Betted On", value: args[3] }
    );
  channel.send({ embeds: [embed] });
};

/**
 * Handle winning number
 *
 * @param {String} msg
 * @param {Discord.TextBasedChannels} channel
 */

const handleWinningNumber = async (
  msg: string,
  channel: Discord.TextBasedChannels
) => {
  const args = msg.split("fairroulette.")[1].split(" ");
  const embed = new Discord.MessageEmbed()
    .setColor("#b0bfd9")
    .setTitle("Winning Number")
    .addFields({ name: "Winning Number", value: args[1] });
  channel.send({ embeds: [embed] });
};

export { handleWinningNumber, handleBetPlaced, handleRoundStart };
