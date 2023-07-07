const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'invite',
    description: 'Invite the bot to your server!',
    run: async (client, interaction) => {
    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel(`Invite ${client.user.username}`)
        .setStyle(ButtonStyle.Link)
        .setEmoji('973537545289875486')
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=1120794811310542930&permissions=406881561681&scope=bot%20applications.commands`),
        new ButtonBuilder()
        .setLabel('Support')
        .setStyle(ButtonStyle.Link)
        .setEmoji('971675354555121675')
        .setURL("https://discord.gg/4Td66BDDgg"),
    )
    let invite = new EmbedBuilder()
      .setAuthor({ 
          name: `Invite ${client.user.username}`, 
          iconURL: client.user.displayAvatarURL() 
      })    
    .setTitle("Invite & Support Link!")
    .setDescription(`I'm The Perfect Giveaway bot to host Giveaways easily on your server with multiple options, Including role requirements, bonus roles, bonus points and server joinings. Get started with GiveawayManager today!`)
    .setColor('#2F3136')
    .setTimestamp()
    .setFooter({
        text: `GiveawayManager`,
    })
    
    interaction.reply({ embeds: [invite], components: [row]});
}
}
