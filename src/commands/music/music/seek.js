/* eslint-disable no-unused-vars */
const { ChatInputCommandInteraction, Client } = require('discord.js');
const MusicUtils = require('../../../modules/Utils/musicUtils.js');

module.exports = {
	subCommand: 'music.seek',
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const { options, guildId } = interaction;

		const player = client.manager.players.get(guildId);
		const musicUtils = new MusicUtils(interaction, player);

		await interaction.deferReply();

		if (musicUtils.voiceCheck()) return;
		if (musicUtils.checkPlaying()) return;

		const time = options.getNumber('time');
		return musicUtils.seek(time);
	},
};
