const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    id: String,
    prefix: { 'type': String, 'default': '&&' },
    logChannel: { 'type': String, 'default': '627534874210861056' }
});

module.exports = mongoose.model('Guild', guildSchema);