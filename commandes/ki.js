


const { fana } = require("../njabulo/fana");
const s = require("../set");
const fs = require('fs');
const Heroku = require('heroku-client');

// Function to get a description of an environment variable
function getDescriptionFromEnv(varName) {
  const filePath = "./app.json";
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const config = JSON.parse(fileContent);
  return config.env[varName]?.description || "The environment variable description was not found.";
}

// Anti-call function setup
fana({
  nomCom: 'anticall',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("thís cσmmαnd ís rєstríctєd tσ thє вσt σwnєr. σr hαppínєss хmd σwnєr");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "anticall yes" to enable or "anticall no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.ANTICALL = 'yes';  // Enable Anti-Call
      responseMessage = 'Anti-call has been enabled.';
      break;

    case "no":
      s.ANTICALL = 'no';  // Disable Anti-Call
      responseMessage = 'Anti-call has been disabled.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'anticall yes' or 'anticall no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});


fana({
  nomCom: 'areact',
  categorie: "General"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("thís cσmmαnd ís rєstríctєd tσ thє вσt σwnєr. σr hαppínєss хmd σwnєr");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "areact yes" to enable or "areact no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.AUTO_REACT = 'yes';  // Enable Areact
      responseMessage = 'Areact has been enabled.';
      break;

    case "no":
      s.AUTO_REACT = 'no';  // Disable Areact
      responseMessage = 'Autoreaction has been disabled.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'areact yes' or 'areact no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({
  nomCom: 'readstatus',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("thís cσmmαnd ís rєstríctєd tσ thє вσt σwnєr. σr hαppínєss хmd σwnє");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "readstatus yes" to enable or "readstatus no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.AUTO_READ_STATUS = 'yes';  // Enable auroread status
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.AUTO_READ_STATUS = 'no';  // Disable autoread status
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'readstatus yes' or 'readstatus no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});
fana({
  nomCom: 'antidelete',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or happiness xmd owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "antidelete yes" to enable or "antidelete no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.ADM = 'yes';  // Enable Antidelete
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.ADM = 'no';  // Disable antidelete
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'antidelete yes' or 'antidelete no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({
  nomCom: 'downloadstatus',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or happiness xmd owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "downloadstatus yes" to enable or "downloadstatus no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.AUTO_DOWNLOAD_STATUS = 'yes';  // Enable Autodownloadstatus
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.AUTO_DOWNLOAD_STATUS = 'no';  // Disable autodownload status
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'downloadstatus yes' or 'downloadstatus no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({
  nomCom: 'startmessage',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or happiness xmd owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "startmessage yes" to enable or "startmessage no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.DP = 'yes';  // Enable Autodownloadstatus
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.DP = 'no';  // Disable startmessage
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'startmessage yes' or 'startmessage no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({
  nomCom: 'readmessage',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or happiness xmd owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "readmessage yes" to enable or "readmessage no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.AUTO_READ_MESSAGES = 'yes';  // Enable Autoread
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.AUTO_READ_MESSAGES = 'no';  // Disable read message
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'readmessage yes' or 'readmessage no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({
  nomCom: 'pm-permit',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or happiness xmd owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "pm-permit yes" to enable or "pm-permit no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.PM_PERMIT = 'yes';  // Enable pm
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.PM_PERMIT = 'no';  // Disable pm
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'pm-permit yes' or 'pm-permit no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});
fana({
  nomCom: 'chatbot',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or happiness xmd owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "chatbot yes" to enable or "chatbot no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.CHAT_BOT = 'yes';  // Enable pm
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.CHAT_BOT = 'no';  // Disable pm
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'chatbot yes' or 'chatbot no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});


fana({
  nomCom: 'publicmode',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or happiness xmd owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "publicmode yes" to enable or "publicmode no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.MODE = 'yes';  // Enable Autodownloadstatus
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.MODE = 'no';  // Disable public
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'publicmode yes' or 'publicmode no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({
  nomCom: 'autorecord',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or happiness xmd owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "autorecord yes" to enable or "autorecord no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.ETAT = '3';  // Enable Autorecord
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.ETAT = 'no';  // Disable Autorecord
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'autorecord yes' or 'autorecord no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({
  nomCom: 'autotyping',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or happiness xmd owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "autotyping yes" to enable or "autotyping no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.ETAT = '2';  // Enable Autorecord
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.ETAT = 'no';  // Disable Autorecord
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'autotyping yes' or 'autotyping no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

zokou({
  nomCom: 'alwaysonline',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or happiness xmd owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "alwaysonline yes" to enable or "alwaysonline no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.ETAT = '1';  // Enable Autorecord
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.ETAT = 'no';  // Disable Autorecord
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'alwaysonline yes' or 'alwaysonline no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({
  nomCom: 'privatemode',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or happiness xmd owner.* 💀,,i
