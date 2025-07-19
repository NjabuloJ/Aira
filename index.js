import dotenv from 'dotenv';
dotenv.config();

import {
    makeWASocket,
    Browsers,
    fetchLatestBaileysVersion,
    DisconnectReason,
    useMultiFileAuthState,
} from 'baileys-pro';
import { Handler, Callupdate, GroupUpdate } from './data/index.js';
import express from 'express';
import pino from 'pino';
import fs from 'fs';
import NodeCache from 'node-cache';
import path from 'path';
import chalk from 'chalk';
import moment from 'moment-timezone';
import axios from 'axios';
import config from './config.cjs';
import pkg from './lib/autoreact.cjs';
const { emojis, doReact } = pkg;


const MAIN_LOGGER = pino({
  timestamp: () => `,"time":"${new Date().toJSON()}"`,
});
const logger = MAIN_LOGGER.child({});
logger.level = "trace";

const msgRetryCounterCache = new NodeCache();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const sessionDir = path.join(__dirname, "session");
const credsPath = path.join(sessionDir, "creds.json");

if (!fs.existsSync(sessionDir)) {
  fs.mkdirSync(sessionDir, { recursive: true });
}

// Load session from environment
async function loadBase64Session() {
  const base64Creds = config.SESSION_ID;
  if (!base64Creds || base64Creds === "Your Session Id") {
    console.error(chalk.red(`◈━━━━━━━━━━━━━━━━◈
│❒ Invalid or missing SESSION_ID in .env
◈━━━━━━━━━━━━━━━━◈`));
    process.exit(1);
  }

  try {
    const credsBuffer = Buffer.from(base64Creds, "base64");
    await fs.promises.writeFile(credsPath, credsBuffer);
    return true;
  } catch (error) {
    console.error(chalk.red(`◈━━━━━━━━━━━━━━━━◈
│❒ Failed to load SESSION_ID: ${error.message}
◈━━━━━━━━━━━━━━━━◈`));
    process.exit(1);
  }
}

async function start() {
  try {
    await loadBase64Session();
    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
    const { version } = await fetchLatestBaileysVersion();

    const Matrix = makeWASocket({
      version,
      logger: pino({ level: "silent" }),
      browser: ["Njabulo-Jb", "Chrome", "1.0.0"],
      auth: state,
      getMessage: async (key) => {
        if (store) {
          const msg = await store.loadMessage(key.remoteJid, key.id);
          return msg.message || undefined;
        }
        return { conversation: "Njabulo-Jb whatsapp user bot" };
      },
    });

    let hasSentStartMessage = false;

// Connection update handler
    Matrix.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === "close") {
        const statusCode = lastDisconnect.error?.output?.statusCode;
        switch (statusCode) {
          case DisconnectReason.badSession:
            console.error(chalk.red(`◈━━━━━━━━━━━━━━━━◈
│❒ Invalid session, update SESSION_ID in .env
◈━━━━━━━━━━━━━━━━◈`));
            process.exit();
            break;
          case DisconnectReason.connectionClosed:
          case DisconnectReason.connectionLost:
          case DisconnectReason.restartRequired:
          case DisconnectReason.timedOut:
            start();
            break;
          case DisconnectReason.connectionReplaced:
            process.exit();
            break;
          case DisconnectReason.loggedOut:
            console.error(chalk.red(`◈━━━━━━━━━━━━━━━━◈
│❒ Logged out, update SESSION_ID in .env
◈━━━━━━━━━━━━━━━━◈`));
            hasSentStartMessage = false;
            process.exit();
            break;
           default:
           start();
        }
        return;
      }

      if (connection === "open") {
        try {
          await Matrix.groupAcceptInvite("GoXKLVJgTAAC3556FXkfFI");
        } catch (error) {
          // Ignore group invite errors
        }
        if (initialConnection) {
         Matrix.sendMessage(Matrix.user.id, { 
          image: { url: "https://files.catbox.moe/5kvvfg.jpg" }, 
          caption: `╭─────────────━┈⊷
│ *ᴅᴇᴍᴏɴ sʟᴀʏᴇʀ*
╰─────────────━┈⊷

╭─────────────━┈⊷
│ *ʙᴏᴛ ᴄᴏɴɴᴇᴄᴛᴇᴅ sᴜᴄᴄᴇssғᴜʟʟʏ*
│ *ᴘʟᴇᴀsᴇ ғᴏʟʟᴏᴡ ᴜs ʙᴇʟᴏᴡ*
╰─────────────━┈⊷

> *ᴍᴀᴅᴇ ʙʏ 3 ᴍᴇɴ ᴀʀᴍʏ*`
                    });
                    initialConnection = false;
                } else {
                    console.log(chalk.blue("Connection reestablished after restart."));
                }
            }
        });

        Matrix.ev.on('creds.update', saveCreds);

        Matrix.ev.on("messages.upsert", async chatUpdate => await Handler(chatUpdate, Matrix, logger));
        Matrix.ev.on("call", async (json) => await Callupdate(json, Matrix));
        Matrix.ev.on("group-participants.update", async (messag) => await GroupUpdate(Matrix, messag));

        if (config.MODE === "public") {
            Matrix.public = true;
        } else if (config.MODE === "private") {
            Matrix.public = false;
        }

        Matrix.ev.on('messages.upsert', async (chatUpdate) => {
            try {
                const mek = chatUpdate.messages[0];

                // Automatically react to messages if enabled
                if (!mek.key.fromMe && config.AUTO_REACT) {
                    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                    await doReact(randomEmoji, mek, Matrix);
                }

                // **STATUS VIEW FIX: Detect and View Status Automatically**
                if (mek.key.remoteJid.endsWith('@broadcast') && mek.message?.imageMessage) {
                    try {
                        await Matrix.readMessages([mek.key]);
                        console.log(chalk.green(`✅ Viewed status from ${mek.key.participant || mek.key.remoteJid}`));
                    } catch (error) {
                        console.error('❌ Error marking status as viewed:', error);
                    }
                }
                
            } catch (err) {
                console.error('Error during auto reaction/status viewing:', err);
            }
        });

    } catch (error) {
        console.error('Critical Error:', error);
        process.exit(1);
    }
}

async function init() {
    if (fs.existsSync(credsPath)) {
        console.log("🔒 Session file found, proceeding without QR code.");
        await start();
    } else {
        const sessionDownloaded = await downloadSessionData();
        if (sessionDownloaded) {
            console.log("🔒 Session downloaded, starting bot.");
            await start();
        } else {
            console.log("No session found or downloaded, QR code will be printed for authentication.");
            useQR = true;
            await start();
        }
    }
}

init();

app.get('/', (req, res) => {
    res.send('CONNECTED SUCCESSFULL');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
