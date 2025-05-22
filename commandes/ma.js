const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const conf = require(__dirname + "/../set");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

fana({ nomCom: "meni", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../njabulo//fana");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault ("Africa/nairobi");

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
*╭─•❖ 𓆩 🦋 𓆪 ❖•─╮*
  𝐀𝐋𝐄𝐂-𝐉𝐁 𝐏𝐔𝐁𝐋𝐈𝐂 
*╰─•❖ 𓆩 🦋 𓆪 ❖•─╯* 
*╭─❖*
*┋🕵️ ɴᴀᴍᴇ : ɴᴊᴀʙᴜʟᴏ ᴊʙ*
*┋📅 ᴅᴀᴛᴇ:* ${date}
*┋⏰ ᴛɪᴍᴇ:* ${temps}
*┋🏹ᴘʀᴇғɪx: [ ${prefixe} ]*
*┋📟ᴘʟᴜɢɪɴs ᴄᴍᴅ:* ${cm.length}
*╰─❖*

> sir Njabulo Jb\n${readmore}`;
    
    
let menuMsg = `*ᴘʟᴜɢɪɴs ᴄᴍᴅ: ${cm.length}*`;

    for (const cat in coms) {
        menuMsg += `
*${cat}*
*╭─❖*`;
        for (const cmd of coms[cat]) {
            menuMsg += `
*┋* ${cmd}`;
        }
        menuMsg += `
*╰─❖*
\n`
    }

    menuMsg += `> sir Njabulo JB 
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, {
      text: infoMsg + menuMsg,
      contextInfo: {
       footer: "*Njabulo Jb*, developed by Njabulo",
        gifPlayback: true,
        externalAdReply: {
          title: "Alec-Jb",
          body: "public bot",
          mediaType: 1,
          thumbnailUrl: "https://files.catbox.moe/2d2gvj.jpg",
         sourceUrl: "https://github.com/NjabuloJ/Njabulo-Jb",
         renderLargerThumbnail: true,
         showAdAttribution: true,
        }
      }
    }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, {
      text: infoMsg + menuMsg,
      contextInfo: {
        footer: "*Njabulo_Jb*, developed by Njabulo",
        externalAdReply: {
          title: "Alec-Jb",
          body: "public bot",
          mediaType: 1,
          thumbnailUrl: "https://files.catbox.moe/2d2gvj.jpg",
         sourceUrl: "https://github.com/NjabuloJ/Njabulo-Jb",
        renderLargerThumbnail: true,
         showAdAttribution: true,
        }
      }
    }, { quoted: ms });
      }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    zk.sendMessage(dest, {
      text: infoMsg + menuMsg,
     footer: "*Njabulo Jb*, developed by Njabulo",
     gifPlayback: true,
      contextInfo: {
        externalAdReply: {
          title: "Alec-Jb",
          body: "public bot",
          mediaType: 1,
          thumbnailUrl: "https://files.catbox.moe/2d2gvj.jpg",
         sourceUrl: "https://github.com/NjabuloJ/Njabulo-Jb",
        renderLargerThumbnail: true,
         showAdAttribution: true,
        }
      }
    }, { quoted: ms });  
     }
    
       // List of audio URLs
    const audioUrls = [
        "https://files.catbox.moe/6x0rb7.mp3" // New song added
    ];

    // Select a random audio file
    const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];

    try {
        await zk.sendMessage(dest, {
            audio: { url: randomAudioUrl },
            mimetype: 'audio/mpeg',
            ptt: true, // Send as a voice note
             contextInfo: {
               externalAdReply: {
               title: "song menu",
               body: "ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ",
               mediaType: 1,
               thumbnailUrl: "https://files.catbox.moe/2d2gvj.jpg",
               sourceUrl: "https://github.com/NjabuloJ/Njabulo-Jb",
               showAdAttribution: true,
              }
            }
        }, { quoted: ms });
    } catch (e) {
        console.log("🥵🥵 Error sending audio: " + e);
        repondre("🥵🥵 Error sending audio: " + e);
    }
});

      

