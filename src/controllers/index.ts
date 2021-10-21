import Discord from "discord.js";
const START_TRIGGER = "-start";
import WebSocket from "ws";
import {
  handleBetPlaced,
  handleRoundStart,
  handleWinningNumber,
  handlePayout,
} from "./roulette";

/**
 * start logging the events that take place on the websocket and maintain
 * a stream of messages to the channel the start command was ran on
 *
 * @param {Discord.TextBasedChannels} channel
 */

const startLogging = async (
  WS_URI: string,
  channel: Discord.TextBasedChannels
) => {
  const ws = new WebSocket(WS_URI);

  ws.on("open", () => {
    channel.send("now listening...");
  });

  ws.on("message", (data) => {
    const msg = data.toString();
    if (msg.startsWith("vmmsg")) {
      const eventType = msg.split("fairroulette.")[1].split(" ")[0];

      switch (eventType) {
        case "bet.placed":
          return handleBetPlaced(msg, channel);
        case "round.number":
          return handleRoundStart(msg, channel);
        case "round.winning_number":
          return handleWinningNumber(msg, channel);
        case "payout":
          return handlePayout(msg, channel);
      }
    }
  });
};

/**
 * Handle the message being sent and process it according
 * to the trigger that is fired
 *
 * @param {Discord.Message} msg
 */

const HandleMessage = (msg: Discord.Message) => {
  if (msg.content.startsWith(START_TRIGGER)) {
    if (msg.content.split("")[1]) {
      startLogging(msg.content.split(" ")[1], msg.channel);
    } else {
      msg.channel.send(
        "invalid command please use this command `-start <url>`"
      );
    }
  }
};

export default HandleMessage;
