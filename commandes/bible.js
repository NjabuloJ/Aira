
const { fana } = require('../njabulo/fana');
const axios = require('axios');
const conf = require(__dirname + "/../set");

fana({
  nomCom: "new",
  reaction: '📰',
  categorie: 'use'
}, async (dest, zk, context) => {
  const { repondre, ms } = context;

  try {
    // Fetching tech news from the API
    const response = await axios.get("https://fantox001-scrappy-api.vercel.app/technews/random");
    const data = response.data;
    const { thumbnail, news } = data;

    await zk.sendMessage(dest, {
      text: news,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
        },
      },
    }, { quoted: ms });

  } catch (error) {
    console.error("*Alec-Jb*\n☹️☹️Error fetching tech news:", error);
    await repondre("*Alec-Jb*\n🤦🥵Sorry, there was an error retrieving the news. Please try again later.\n" + error);
  }
});


fana({
  nomCom: "biblie",
  reaction: '📖',
  categorie: "use"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const reference = arg.join(" ");
  
  if (!reference) {
    return repondre("*Alec-Jb*\nHEY,  😤 What’s this nonsense? No message about bible?\n😬😬🤤 Stop wasting my time and give me message specify the book, chapter, and verse you want to read. Example: bible Mathew 3:16", {
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         serverMessageId: 143,
        },
      },
    });
  }
  
  try {
    const response = await axios.get(`https://bible-api.com/${reference}`);
    
    if (!response.data) {
      return repondre("*Alec-Jb*\n😅😰Invalid reference. Example: bible john 3:16", {
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         serverMessageId: 143,
          },
        },
      });
    }
    
    const data = response.data;
    const messageText = `
HOLY BIBLE 

WE'RE READING: ${data.reference}

NUMBER OF VERSES: ${data.verses.length}

NOW READ: ${data.text}

LANGUAGE: ${data.translation_name}
 `;
    
    await zk.sendMessage(dest, {
      text: messageText,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         serverMessageId: 143,
        },
      },
    }, { quoted: ms });
    
  } catch (error) {
    console.error("*Alec-Jb*\n🥵🤬Error fetching Bible passage:", error);
    await repondre("*Alec-Jb*\n😡😡An error occurred while fetching the Bible passage. Please try again later.", {
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         serverMessageId: 143,
        },
      },
    });
  }
});
