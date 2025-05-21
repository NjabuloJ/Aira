const { fana } = require('../njabulo/fana');
const axios = require("axios")
let { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const {isUserBanned , addUserToBanList , removeUserFromBanList} = require("../bdd/banUser");
const  {addGroupToBanList,isGroupBanned,removeGroupFromBanList} = require("../bdd/banGroup");
const {removeSudoNumber,addSudoNumber,issudo} = require("../bdd/sudo");
//const conf = require("../set");
//const fs = require('fs');
const sleep =  (ms) =>{
  return new Promise((resolve) =>{ setTimeout (resolve, ms)})
  
  } ;

fana({ nomCom: "block", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("command reserved for the bot owner");
    return;
  }
             
              if(!msgRepondu) { 
                if(verifGroupe) {
                  repondre('Be sure to mention the person to block'); return
                } ;
                jid = dest

                 await zk.updateBlockStatus(jid, "block")
    .then( repondre('succes')) 
              } else {
                jid = auteurMsgRepondu
             await zk.updateBlockStatus(jid, "block")
    .then( repondre('succes'))   } ;

  });

fana({ nomCom: "unblock", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("command reserved for the bot owner");
    return;
  }
              if(!msgRepondu) { 
                if(verifGroupe) {
                  repondre('Please mention the person to be unlocked'); return
                } ;
                jid = dest

                 await zk.updateBlockStatus(jid, "unblock")
    .then( repondre('succes')) 
              } else {
                jid = auteurMsgRepondu
             await zk.updateBlockStatus(jid, "unblock")
    .then( repondre('succes'))   } ;
  
    });

fana({ nomCom: "kickall", categorie: 'Group', reaction: "📣" }, async (dest, zk, commandeOptions) => {

  const { auteurMessage ,ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser,prefixe } = commandeOptions

  const metadata = await zk.groupMetadata(dest) ;
 

  if (!verifGroupe) { repondre("✋🏿 ✋🏿this command is reserved for groups ❌"); return; }
  if (superUser || auteurMessage == metadata.owner) { 
  
   repondre('No_admin members will be removed from the group. You have 5 seconds to reclaim your choice by restarting the bot.') ;
   await sleep(5000)
  let membresGroupe = verifGroupe ? await infosGroupe.participants : "";
try {
  let users = membresGroupe.filter((member) => !member.admin)

  for (const membre of users) {

    

   
    
await zk.groupParticipantsUpdate(
        dest, 
        [membre.id],
        "remove" 
    ) 
    await sleep(500)
    
  }  
} catch (e) {repondre("I need administration rights")} } else {
  repondre("Order reserved for the group owner for security reasons"); return
}
});

fana({
    nomCom: 'ban',
    categorie: 'Use',
}, async (dest, zk, commandeOptions) => {

    const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser } = commandeOptions;

    
  if (!superUser) {repondre('This command is only allowed to the bot owner') ; return}
    if (!arg[0]) {
        // Function 'reply' must be defined to send a response.
        repondre(`mention the victim by typing ${prefixe}ban add/del to ban/unban the victim`);
        return;
    };

    if (msgRepondu) {
        switch (arg.join(' ')) {
            case 'add':

           
   let youareban = await isUserBanned(auteurMsgRepondu)
           if(youareban) {repondre('This user is already banned') ; return}
               
           addUserToBanList(auteurMsgRepondu)
                break;
                case 'del':
                  let estbanni = await isUserBanned(auteurMsgRepondu)
    if (estbanni) {
        
        removeUserFromBanList(auteurMsgRepondu);
        repondre('This user is now free.');
    } else {
      repondre('This user is not banned.');
    }
    break;


            default:
                repondre('bad option');
                break;
        }
    } else {
        repondre('mention the victim')
        return;
    }
});



fana({
    nomCom: 'bangroup',
    categorie: 'Use',
}, async (dest, zk, commandeOptions) => {

    const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser,verifGroupe } = commandeOptions;

    
  if (!superUser) {repondre('This command is only allowed to the bot owner') ; return};
  if(!verifGroupe) {repondre('order reservation for groups' ) ; return };
    if (!arg[0]) {
        // Function 'reply' must be defined to send a response.
        repondre(`type ${prefix}bangroup add/del to ban/unban the group`);
        return;
    };
    const groupalreadyBan = await isGroupBanned(dest)

        switch (arg.join(' ')) {
            case 'add':

           

            if(groupalreadyBan) {repondre('This group is already banned') ; return}
               
            addGroupToBanList(dest)

                break;
                case 'del':
                      
    if (groupalreadyBan) {
      removeGroupFromBanList(dest)
      repondre('This group is now free.');
        
    } else {
       
      repondre('This group is not banned.');
    }
    break;


            default:
                repondre('bad option');
                break;
        }
    
});


fana({
  nomCom: 'sudo',
  categorie: 'Use',
}, async (dest, zk, commandeOptions) => {

  const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser } = commandeOptions;

  
if (!superUser) {repondre('This command is only allowed to the bot owner') ; return}
  if (!arg[0]) {
      // Function 'reply' must be defined to send a response.
      repondre(`mention the person by typing ${prefix}sudo add/del`);
      return;
  };

  if (msgRepondu) {
      switch (arg.join(' ')) {
          case 'add':

         
 let youaresudo = await issudo(auteurMsgRepondu)
         if(youaresudo) {repondre('This user is already sudo') ; return}
             
         addSudoNumber(auteurMsgRepondu)
         repondre('succes')
              break;
              case 'del':
                let estsudo = await issudo(auteurMsgRepondu)
  if (estsudo) {
      
      removeSudoNumber(auteurMsgRepondu);
      repondre('This user is now non-sudo.');
  } else {
    repondre('This user is not sudo.');
  }
  break;


          default:
              repondre('bad option');
              break;
      }
  } else {
      repondre('mention the victim')
      return;
  }
});


fana({ nomCom: "save", categorie: "Use" }, async (dest, zk, commandeOptions) => {

  const { repondre , msgRepondu , superUser, auteurMessage } = commandeOptions;
  
    if ( superUser) { 
  
      if(msgRepondu) {

        console.log(msgRepondu) ;

        let msg ;
  
        if (msgRepondu.imageMessage) {
  
          
  
       let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;
       // console.log(msgRepondu) ;
       msg = {
  
         image : { url : media } ,
         caption : msgRepondu.imageMessage.caption,
         
       }
      
  
        } else if (msgRepondu.videoMessage) {
  
          let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage) ;
  
          msg = {
  
            video : { url : media } ,
            caption : msgRepondu.videoMessage.caption,
            
          }
  
        } else if (msgRepondu.audioMessage) {
      
          let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage) ;
         
          msg = {
     
            audio : { url : media } ,
            mimetype:'audio/mp4',
             }     
          
        } else if (msgRepondu.stickerMessage) {
  
      
          let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage)
  
          let stickerMess = new Sticker(media, {
            pack: 'POPKID-MD',
            type: StickerTypes.CROPPED,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer2 = await stickerMess.toBuffer();
         
          msg = { sticker: stickerBuffer2}
  
  
        }  else {
            msg = {
               text : msgRepondu.conversation,
            }
        }
  
      zk.sendMessage(auteurMessage,msg)
  
      } else { repondre('Mention the message that you want to save') }
  
  } else {
    repondre('only mods can use this command')
  }
  

  })
;


