const discord = require("discord.js");
const config = require('../config.json');

module.exports.run = async (bot, message, args) => {

    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.slice(1).join(' ');
    let logs = message.guild.channels.find('Nama', config.logsChannel);

    if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('Anda tidak memiliki izin untuk menggunakan perintah ini!');

    if (!target) return message.reply('tolong sebutkan anggota yang akan ditendang!');
    if (!reason) return message.reply('sebutkan alasannya!');
    if (!logs) return message.reply(`tolong buat saluran bernama ${config.logsChannel} untuk mencatat!`);
    
    let embed = new discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(target.user.avatarURL)
        .addField('Nama', `${target.user.username} dengan ID: ${target.user.id}`)
        .addField('Ditendang Oleh', `${message.author.username} dengan ID: ${message.author.id}`)
        .addField('Ditendang Pada', message.createdAt)
        .addField('Ditendang Di', message.channel)
        .addField('Karena', reason)
        .setFooter('Informasi pengguna yang ditendang', target.user.displayAvatarURL);

    message.channel.send(`${target.user.username} telah ditendang oleh ${message.author} karena ${reason}`);
    target.kick(reason);
    logs.send(embed);

};

module.exports.help = {
    name: 'kick'
};
