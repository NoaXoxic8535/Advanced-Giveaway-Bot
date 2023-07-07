const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Check the ping! for the bot',
    run: async (client, interaction) => {
      let pembed = new EmbedBuilder()
		  .setTitle("Pong!")
      .setColor('#2F3136')
		  .addFields({name: '**Latency**', value: `\`\`\`ini\n[ ${Date.now() - interaction.createdTimestamp}ms ]\n\`\`\``, inline: true},
			     {name: '**API Latency**', value: `\`\`\`ini\n[ ${Math.round(client.ws.ping)}ms ]\n\`\`\``, inline: true})
		  .setTimestamp()
      .setFooter({
        text: `GiveawayManager`, 
    })
        interaction.reply({
          embeds: [pembed]
        });
    },
};
