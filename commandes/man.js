const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

fana({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../njabulo//fana");
    var coms = {};
    var mode = s.MODE.toLowerCase() !== "yes" ? "private" : "public";

    cm.map(async (com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Nairobi");
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // Generate greeting based on time of day
    const hour = moment().hour();
    let greeting = "🌅Good Morning my brother 🌄";
    if (hour >= 12 && hour < 18) {
        greeting = "🌄Good afternnon! Stay energized! 🌿";
    } else if (hour >= 18) {
        greeting = "🌇Good Everning! Hope you had a great day! 🌙";
    } else if (hour >= 22 || hour < 5) {
        greeting = "Good Night 🌌";
    }

    // Generate commands list
    let commandList = "\n\nAvailable Commands";
    for (let category in coms) {
        commandList += `\n\n【${category}】\n`;
        commandList += coms[category].map((cmd) => `- ${cmd}`).join("\n");
    }

    let infoMsg = `
╭══════════════⊷❍
┇❍▸ ʙᴏᴛ ɴᴀᴍᴇ: *ᴄᴀsᴇʏʀʜᴏᴅᴇs ᴛᴇᴄʜ*
┇❍▸ ʙᴏᴛ ᴜsᴇʀ: *${nomAuteurMessage}*
┇❍▸ ᴍᴏᴅᴇ: *${mode}*
┇❍▸ ᴘʀᴇғɪx: *[ ${prefixe} ]*
┇❍▸ ᴘʟᴀᴛғᴏʀᴍ: *${os.platform()}*
┇❍▸ ᴅᴀᴛᴇ: *${date}*
┇❍▸ ᴛɪᴍᴇ: *${temps}*
┇❍▸ ᴄᴏᴍᴍᴀɴᴅs: *${cm.length}*
┇❍▸ ᴄᴀᴘᴀᴄɪᴛʏ: ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
╰══════════════⊷❍

${commandList}`;
            

    try {
            await zk.sendMessage(dest, {
                caption: infoMsg,
                gifPlayback: true,
                contextInfo: {
                externalAdReply: {
                    title: "𝗡𝗝𝗔𝗕𝗨𝗟𝗢 𝗝𝗕 𝗠𝗘𝗡𝗨 𝗟𝗜𝗦𝗧",
                    body: "Tap here my friend join channel update",
                    thumbnailUrl: "https://files.catbox.moe/60hwdx.jpeg",
                    sourceUrl: "https://whatsapp.com/channel/0029VarYP5iAInPtfQ8fRb2T",
                    mediaType: 1,
                    renderLargerThumbnail: true
                    },
                },
            }, { quoted: ms });
        } else {
            await zk.sendMessage(dest, {
                caption: infoMsg,
                contextInfo: {
                externalAdReply: {
                    title: "𝗡𝗝𝗔𝗕𝗨𝗟𝗢 𝗝𝗕 𝗠𝗘𝗡𝗨 𝗟𝗜𝗦𝗧",
                    body: "Tap here my friend join channel update",
                    thumbnailUrl: "https://files.catbox.moe/60hwdx.jpeg",
                    sourceUrl: "https://whatsapp.com/channel/0029VarYP5iAInPtfQ8fRb2T",
                    mediaType: 1,
                    renderLargerThumbnail: true
                    },
                },
            }, { quoted: ms });
        }
    } catch (e) {
        console.log("🥵🥵 Error sending menu: " + e);
        repondre("🥵🥵 Error sending menu: " + e);
    }

    // List of audio URLs
    const audioUrls = [
        "https://files.catbox.moe/wsyxi0.mp3",
        "https://files.catbox.moe/w2k8g2.mp3",
        "https://files.catbox.moe/cpjbnl.mp3",
        "https://files.catbox.moe/y6fph9.mp3",
        "https://files.catbox.moe/moctzu.mp3" // New song added
    ];

    // Select a random audio file
    const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];

    try {
        await zk.sendMessage(dest, {
            audio: { url: randomAudioUrl },
            mimetype: 'audio/mpeg',
            ptt: true, // Send as a voice note
        }, { quoted: ms });
    } catch (e) {
        console.log("🥵🥵 Error sending audio: " + e);
        repondre("🥵🥵 Error sending audio: " + e);
    }
});
