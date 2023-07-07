const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  async execute(giveaway, member) {
    return member.send({

      components: [new ActionRowBuilder()
                    .addComponents(
                          new ButtonBuilder()
                      .setLabel("Jump to the Giveaway")
                      .setStyle(ButtonStyle.Link)
                      .setURL(`https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}`)
                      .setEmoji('973495590921043968'))],
      
      embeds: [new EmbedBuilder()
        .setTimestamp()
        .setAuthor({name: "Reaction Removed!"})
        .setTitle('Did You Just Remove a Reaction From A Giveaway?')
        .setColor("#2F3136")
        .setDescription(
          `We regret to inform you that your entry for the ${giveaway.prize} on [This Server]((https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) has been removed, which means that you are no longer considered a valid participant in the giveaway. If you believe this was a mistake, we encourage you to re-engage by reacting to the giveaway message again. Thank you for your understanding and we apologize for any inconvenience caused`
        )
        .setFooter({ text: "GiveawayManager"})
      ]
    }).catch(e => {})

  }
}
