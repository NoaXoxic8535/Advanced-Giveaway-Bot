const Discord = require("discord.js");
const { ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const messages = require("../utils/message");
const ms = require("ms");

module.exports = {
  name: 'start',
  description: 'Start an ongoing Giveaway',

  options: [
    {
      name: 'duration',
      description: 'How long the giveaway should last for. Example values: 1m, 1h, 1d',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: 'winners',
      description: 'How many winners the giveaway should have',
      type: ApplicationCommandOptionType.Integer,
      required: true
    },
    {
      name: 'prize',
      description: 'What the prize of the giveaway should be',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: 'channel',
      description: 'The channel to start the giveaway in',
      type: ApplicationCommandOptionType.Channel,
      required: true
    },
    {
      name: 'bonusrole',
      description: 'Role which would receive bonus entries',
      type: ApplicationCommandOptionType.Role,
      required: false
    },
    {
      name: 'bonusamount',
      description: 'The amount of bonus entries the role will receive',
      type: ApplicationCommandOptionType.Integer,
      required: false
    },
    {
      name: 'description',
      description: 'Add more details about your giveaway',
      type: ApplicationCommandOptionType.String,
      required: false
    },
    {
      name: 'role',
      description: 'Role you want to add as a giveaway joining requirement',
      type: ApplicationCommandOptionType.Role,
      required: false
    },
  ],

  run: async (client, interaction) => {
    try {
      // If the member doesn't have enough permissions
      if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
        return interaction.reply({
          content: 'You need to have the manage messages permissions to start giveaways.',
          ephemeral: true
        });
      }

      const giveawayChannel = interaction.options.getChannel('channel');
      const giveawayDuration = interaction.options.getString('duration');
      const giveawayWinnerCount = interaction.options.getInteger('winners');
      const giveawayPrize = interaction.options.getString('prize');

      if (!giveawayChannel.isText()) {
        return interaction.reply({
          content: 'Please select a text channel!',
          ephemeral: true
        });
      }

      if (isNaN(ms(giveawayDuration))) {
        return interaction.reply({
          content: 'Please select a valid duration!',
          ephemeral: true
        });
      }

      if (giveawayWinnerCount < 1) {
        return interaction.reply({
          content: 'Please select a valid winner count (greater or equal to one)!',
          ephemeral: true
        });
      }

      const bonusRole = interaction.options.getRole('bonusrole');
      const bonusEntries = interaction.options.getInteger('bonusamount');
      let rolereq = interaction.options.getRole('role');
      let invite = interaction.options.getString('description');

      if (bonusRole) {
        if (!bonusEntries) {
          return interaction.reply({
            content: `You must specify how many bonus entries ${bonusRole} will receive!`,
            ephemeral: true
          });
        }
      }

      await interaction.deferReply({ ephemeral: true });

      if (rolereq) {
        messages.inviteToParticipate = `**React to participate!**\n>>> - Only members having ${rolereq} are allowed to participate in this giveaway!`;
      }
      if (rolereq && invite) {
        messages.inviteToParticipate = `**React to participate!**\n>>> - Only members having ${rolereq} are allowed to participate in this giveaway!`;
      }
      if (!rolereq && invite) {
        messages.inviteToParticipate = `**React to participate!**\n>>> Read more details about this giveaway below!`;
      }

      // Start giveaway
      await client.giveawaysManager.start(giveawayChannel, {
        duration: ms(giveawayDuration),
        prize: giveawayPrize,
        hostedBy: `<@${interaction.user.id}>`,
        winnerCount: parseInt(giveawayWinnerCount),
        bonusEntries: [
          {
            bonus: new Function('member', `return member.roles.cache.some((r) => r.name === '${bonusRole ?.name}') ? ${bonusEntries} : null`),
            cumulative: false
          }
        ],
        messages,
        extraData: {
          role: rolereq == null ? "null" : rolereq.id
        }
      });

      interaction.editReply({
        content: `Giveaway started in ${giveawayChannel}!`,
        ephemeral: true
      });

      if (invite) {
        const des = new Discord.EmbedBuilder()
          .setAuthor({ name: `Extra Details` })
          .setDescription(`${invite}`)
          .setColor("#2F3136");

        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setLabel('Discord')
              .setStyle(ButtonStyle.Link)
              .setURL(`https://discord.gg/4Td66BDDgg`)
          );

        giveawayChannel.send({ embeds: [des], components: [row] });
      }

      if (bonusRole) {
        const giveaway = new Discord.EmbedBuilder()
          .setAuthor({ name: `Bonus Entries Alert!` })
          .setDescription(`**${bonusRole}** has **${bonusEntries}** extra entries in this giveaway!`)
          .setColor("#2F3136")
          .setTimestamp();

        giveawayChannel.send({ embeds: [giveaway] });
      }
    } catch (error) {
      console.error('Unhandled promise rejection:', error);
      // Handle the error here or log it appropriately
    }
  }
};
