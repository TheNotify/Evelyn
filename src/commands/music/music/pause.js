/* eslint-disable no-unused-vars */
const {
	ChatInputCommandInteraction,
	Client,
	EmbedBuilder,
} = require('discord.js');
const MusicUtils = require('../../../modules/Utils/musicUtils.js');

module.exports = {
	subCommand: 'music.pause',
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const { guildId } = interaction;

		const embed = new EmbedBuilder().setColor('Blurple').setTimestamp();
		const player = client.manager.players.get(guildId);
		const musicUtils = new MusicUtils(interaction, player);
		await interaction.deferReply();

		if (musicUtils.voiceCheck()) return;
		if (musicUtils.checkPlaying()) return;
		await player.pause(true);

		return interaction.editReply({
			embeds: [embed.setDescription('🔹 | Paused.')],
		});
	},
};
