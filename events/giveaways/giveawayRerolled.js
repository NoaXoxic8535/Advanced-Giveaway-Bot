const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({

        components: [new ActionRowBuilder()
                    .addComponents(
                          new ButtonBuilder()
                      .setLabel("Jump to the Giveaway")
                      .setStyle(ButtonStyle.Link)
                      .setURL(`https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}`)
                      .setEmoji('973495590921043968'),
                    new ButtonBuilder()
                      .setLabel("Vote Me")
                      .setStyle(ButtonStyle.Link)
                      .setURL("https://top.gg/bot/vote")
                      .setEmoji('960895425567666246'),
                          new ButtonBuilder()
                      .setLabel("Invite Me")
                      .setStyle(ButtonStyle.Link)
                      .setURL("https://discord.com/api/oauth2/authorize?client_id=1120794811310542930&permissions=406881561681&scope=bot%20applications.commands")
                      .setEmoji('984296691794583582'))],
        
        embeds: [new EmbedBuilder()
          .setAuthor({name: "Congratulations!"})
          .setColor("#2F3136")
          .setDescription(`Hello there ${member.user}\nHost of the giveaway rerolled and you won the Giveaway!\nGood Job On Winning **${giveaway.prize}!**\nDM ${giveaway.hostedBy} to claim your prize!!`)
.setTimestamp()
          .setFooter({
            text: "GiveawayManager", 
          })
        ]
      }).catch(e => {})
    });
  }
}
