import Discord from "discord.js";
const START_TRIGGER = "-start";
import WebSocket from "ws";
import {
  handleBetPlaced,
  handleRoundStart,
  handleWinningNumber,
} from "./roulette";

/**
 * start logging the events that take place on the websocket and maintain
 * a stream of messages to the channel the start command was ran on
 *
 * @param {Discord.TextBasedChannels} channel
 */

const startLogging = async (channel: Discord.TextBasedChannels) => {
  const WS_URI =
    "ws://wasp:wasp@193.26.156.200:9090/chain/mGy3Xk5boDS4KfTVtdYfBHevUYqnaYbsTdtH46JfNsFV/ws";

  const ws = new WebSocket(WS_URI);

  ws.on("open", () => {
    console.log("connected");
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
    msg.channel.send("now listening...");
    startLogging(msg.channel);
  }
};

export default HandleMessage;
