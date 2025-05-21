const { fana } = require('../njabulo/fana');

fana({ nomCom: "btest", categorie: "General", reaction: "🛠️" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, verifGroupe } = commandeOptions;

  console.log(`[DEBUG] btest triggered by ${ms.key.participant || ms.key.remoteJid} in ${dest}`);

  
  const userName = ms.pushName || "Tester";

  
  if (!verifGroupe) {
    console.log(`[DEBUG] btest: Not a group chat`);
    repondre(`Alec-Jb\n\nHEY, ${userName}! 😡 This works better in a group, but fine, let’s test these buttons! 🚀\n`);
  }

  // Prepare button message
  const buttonMessage = {
    contentText: `�zachAlec-Jb\n\n WELCOME, ${userName}! 😎 Time to test the power of Alec-Jb!\n Pick a button and unleash the chaos! 💥\nPowered by xh_clinton\n`,
    footerText: "Alec-Jb Testing Suite",
    buttons: [
      {
        buttonId: `ping_${ms.key.id}`,
        buttonText: { displayText: "⚡ Ping" },
        type: 1
      },
      {
        buttonId: `owner_${ms.key.id}`,
        buttonText: { displayText: "👑 Owner" },
        type: 1
      }
    ],
    headerType: 1,
viewOnce: true,
  };

  console.log(`[DEBUG] btest: Button message prepared:`, JSON.stringify(buttonMessage, null, 2));

  try {
    // Send button message
    await zk.sendMessage(dest, buttonMessage, ms);
    console.log(`[DEBUG] btest: Button message sent successfully`);
  } catch (e) {
    console.log(`[DEBUG] btest: Error sending button message: ${e.message}`);
   
    await repondre(`Alec-�{md\n\nTHIS IS INFURIATING, ${userName}! 😤 Buttons failed: ${e.message}!\n Try these instead: .ping ⚡ or .owner 👑\nI’ll SMASH THIS TRASH SYSTEM! 🚫\n`);
  }
});