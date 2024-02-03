// const { Schema, model } = require('mongoose');

// const chromosomeSchema = new Schema(
//     {
//         chromosome: {
//             type: String,
//             required: true
//         },
//         start: {
//             type: Number,
//             required: true
//         },
//         end: {
//             type: Number,
//             required: true
//         },
//         tester: {
//             type: Schema.Types.ObjectId,
//             ref: 'Tester'
//         },
//         match: {
//             type: Schema.Types.ObjectId,
//             ref: 'Match'
//         }
//     }
// );

// const Chromosome = model('Chromosome', chromosomeSchema);

// module.exports = Chromosome;