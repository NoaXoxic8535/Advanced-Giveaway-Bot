const Discord = require('discord.js');
module.exports = {
  async execute(giveaway, member, reaction) {
    reaction.users.remove(member.user);
    member.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor("#2F3136")
                       .setDescription("Oh no! It appears that the giveaway has already concluded. Don't worry, there will be more exciting opportunities in the future. Make sure to keep an eye out and be ready to act swiftly next time! Stay determined and good luck!"),
        ],
      })
      .catch((e) => {});
  },
};
