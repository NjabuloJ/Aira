const { fana } = require("../njabulo/fana");
const ai = require('unlimited-ai');
const axios = require('axios'); // Added missing axios import
const fs = require('fs');
const conf = require(__dirname + "/../set");

// Common function for fetching GPT responses
const fetchGptResponse = async (url, query) => {
  try {
    const response = await axios.get(url + encodeURIComponent(query));
    const data = response.data;
    if (data && data.status) {
      return data.BK9;
    } else {
      throw new Error('Alec-Jb\n 😡😡Failed to retrieve GPT response\n you can try again 🧏🤷.');
    }
  } catch (error) {
    console.error('Alec-Jb\n 😡😡 am broke 🥺 Error fetching GPT response:', error);
    return 'Alec-Jb\n😅😅 no just take ar minutes and try again later🤬🥵\nSomething went wrong. Unable to fetch GPT response.';
  }
};

// General handler for AI commands
const handleAiCommand = async (dest, zk, params, url, usageExample) => {
  const { repondre, arg } = params;
  const alpha = arg.join(" ").trim();

  if (!alpha) {
    return repondre(usageExample);
  }

  const text = alpha;

  try {
    const response = await fetchGptResponse(url, text);

    await zk.sendMessage(dest, {
      text: response,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         serverMessageId: 143,
        },
      },
    });
  } catch (error) {
    console.error("Error generating AI response:", error);
    await repondre("Sorry, I couldn't process your request.");
  }
};

// fana command handlers
fana({
  nomCom: "chat",
  aliases: ["chatbot", "chatai"],
  reaction: '🙂',
  categorie: "AI"
}, async (dest, zk, params) => {
  handleAiCommand(dest, zk, params, "https://bk9.fun/ai/chataibot?q=", "Alec-Jb\n🤤🤗Example usage: gpt How's the weather today?");
});

fana({
  nomCom: "ai",
  aliases: ["AI", "AIbot"],
  reaction: '🤖',
  categorie: "AI"
}, async (dest, zk, params) => {
  handleAiCommand(dest, zk, params, "https://bk9.fun/ai/BK93?BK9=you%20are%20zoro%20from%20one%20piece&q=", "Hello there, This is Alec-Jb, How may I help you with?");
});

fana({
  nomCom: "gpt",
  aliases: ["ilamaa", "ilamaai"],
  reaction: '🤷',
  categorie: "AI"
}, async (dest, zk, params) => {
  handleAiCommand(dest, zk, params, "https://bk9.fun/ai/llama?q=", "Alec-Jb\n🧏Example usage: gpt Hi, how are you?");
});

fana({
  nomCom: "gemini",
  aliases: ["gemini4", "geminiai"],
  reaction: '🤷',
  categorie: "AI"
}, async (dest, zk, params) => {
  handleAiCommand(dest, zk, params, "https://bk9.fun/ai/gemini?q=", "Alec-Jb\n😔My friend can you Example usage: gemini Hi, how are you?🤬😅");
});

fana({
  nomCom: "asksong",
  aliases: ["gpt4", "ai"],
  reaction: '🤦',
  categorie: "AI"
}, async (dest, zk, params) => {
  const { repondre, arg } = params;
  const alpha = arg.join(" ").trim();

  if (!alpha) {
    return repondre("Alec-Jb\n what going on😡😡\nPlease provide a song name🤗🤥\n or .asksong alone walker lost control.");
  }

  const text = alpha;
  try {
    const model = 'gpt-4-turbo-2024-04-09';
    const messages = [
      { role: 'user', content: text },
      { role: 'system', content: 'You are an assistant in WhatsApp. You are called Keith. You respond to user commands.' }
    ];

    const response = await ai.generate(model, messages);

    await zk.sendMessage(dest, {
      text: response,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         serverMessageId: 143,
        },
      },
    });
  } catch (error) {
    console.error("Alec-Jb\n😡😡am sorry about it 😭\n🤦or try again later 🥵🥵Error generating AI response:", error);
    await repondre("Alec-Jb\n🤣🤣am not good about gpt\n😬🤬😡 Sorry, I couldn't process your request.");
  }
});

  
