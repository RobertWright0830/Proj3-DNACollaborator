const { Schema, model } = require('mongoose');

 const matchSchema = new Schema(
    {
        matchUsername: {
            type: String,
            required: true,
            unique: false,
            trim: true
        }, 
        matchName: {
            type: String
        },   
        email: {
            type: String,
            trim: true,
            lowercase: true
        },
        sex: {
            type: String
        }
    }
);

const Match = model('Match', matchSchema);

module.exports = Match;