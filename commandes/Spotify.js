const { fana } = require('../njabulo/fana');
const axios = require("axios");

fana({
  nomCom: "spotifylist",
  aliases: ["spotifysearch", "splaylist"],
  categorie: "Search",
  reaction: "🎬"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  // Check if there is a query in the arguments
  if (!arg[0]) {
    return repondre('*Alec-Jb*\n 😤 What’s this nonsense? please give me queey? \n🤥🤦Stop wasting my time and provide a query!');
  }

  try {
    // Spotify search API
    const searchApiUrl = `https://spotifyapi.caliphdev.com/api/search/tracks?q=${encodeURIComponent(arg[0])}`;
    const searchData = (await axios.get(searchApiUrl)).data;

    // Check if searchData contains tracks
    if (!searchData || searchData.length === 0) {
      return repondre("*Alec-Jb*\n⁉️🤷No Spotify search results found.\n🙋hey or try again later");
    }

    // Construct playlist message
    let playlistMessage = `PLANET SPOTIFY PLAY\n\n`;

    // Loop through search results and construct track info with numbers
    searchData.forEach((track, index) => {
      const trackNumber = index + 1; // Number tracks starting from 1
      playlistMessage += `*${trackNumber}.* ${track.title}\n`;
      playlistMessage += `*Artist*: ${track.artist || "Unknown"}\n`;
      playlistMessage += `*Album*: ${track.album || "Unknown"}\n`;
      playlistMessage += `*URL*: ${track.url}\n\n`;
      playlistMessage += `─────────────\n\n`;
    });

    // Send the playlist message with a mention of the sender
    await zk.sendMessage(
      dest,
      {
        text: playlistMessage,
        contextInfo: {
        isForwarded: true,
         forwardedNewsletterMessageInfo: {
         serverMessageId: 143,
          },
        },
      }
    );

  } catch (error) {
    // Send error message
    repondre(`*Alec-Jb*\nflop you did 🥺 see❌Error: ${error.message}`);
    console.error(error);
  }
})
    
