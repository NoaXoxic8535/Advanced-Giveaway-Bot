const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  async execute(giveaway, reactor, messageReaction) {

    const noice = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Vote Me")
          .setStyle(ButtonStyle.Link)
          .setURL("https://top.gg/bot/vote")
          .setEmoji('960895425567666246'),
        new ButtonBuilder()
          .setLabel("Invite Me")
          .setStyle(ButtonStyle.Link)
          .setURL("https://discord.com/api/oauth2/authorize?client_id=1120794811310542930&permissions=406881561681&scope=bot%20applications.commands")
          .setEmoji('984296691794583582'),
    );
    
    let approved =  new EmbedBuilder()
    .setTimestamp()
    .setColor("#2F3136")
    .setAuthor({name: "Entry Confirmed!"})    
    .setDescription(
      `Great news! Your entry for the ${giveaway.prize} on [This Server]((https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) has been successfully approved! Get ready to embark on an exciting journey towards winning. Don't forget, you can earn additional points by participating in the voting process. This giveaway is hosted by the amazing ${giveaway.hostedBy}. Best of luck to you!`
    )
    .setFooter({ text: "GiveawayManager"})
    .setTimestamp()

    const lol = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Vote Me")
          .setStyle(ButtonStyle.Link)
          .setURL("https://top.gg/bot/vote")
          .setEmoji('960895425567666246'),
        new ButtonBuilder()
          .setLabel("Invite Me")
          .setStyle(ButtonStyle.Link)
          .setURL("https://discord.com/api/oauth2/authorize?client_id=1120794811310542930&permissions=406881561681&scope=bot%20applications.commands")
          .setEmoji('984296691794583582'),
    );
    
   let denied =  new EmbedBuilder()
    .setTimestamp()
    .setColor("#2F3136")
    .setAuthor({name: "Entry Denied!"})    
    .setDescription(
      `We regret to inform you that your entry for the ${giveaway.prize} on [This Server]((https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) has been denied. We kindly request you to review the entry requirements thoroughly to ensure proper eligibility for future giveaways. The dedicated host of this giveaway is ${giveaway.hostedBy}`
    )
    .setFooter({ text: "GiveawayManager"})

    let client = messageReaction.message.client
    if (reactor.user.bot) return;
    if(giveaway.extraData) {      
      if (giveaway.extraData.role !== "null" && !reactor.roles.cache.get(giveaway.extraData.role)){ 
        messageReaction.users.remove(reactor.user);
        return reactor.send({
          embeds: [denied],
          components: [lol]
        }).catch(e => {})
      }

      return reactor.send({
        embeds: [approved],
        components: [noice]
      }).catch(e => {})
    } else {
        return reactor.send({
          embeds: [approved]
        }).catch(e => {})
    }
    }
  }
