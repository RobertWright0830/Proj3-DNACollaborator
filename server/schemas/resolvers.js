const { Profile, Ancestor, ChromosomeSegment } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {

    // Profile queries
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    // me: async (parent, args, context) => {
    //   if (context.user) {
    //     return Profile.findOne({ _id: context.user._id });
    //   }
    //   throw AuthenticationError;

   // Ancestor queries
    ancestors: async () => {
      return Ancestor.find();
    },
    ancestor: async (parent, { ancestorId }) => {
      return Ancestor.findById(ancestorId);
    },

    // ChromosomeSegment queries
    chromosomeSegments: async () => {
      return ChromosomeSegment.find();
    },
    chromosomeSegment: async (parent, { segmentId }) => {
      return ChromosomeSegment.findById(segmentId);
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },
  // Profile removal mutation
    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId });
    },

//   // Ancestor removal mutation
//     removeAncestor: async (parent, { ancestorId }) => {
//       return Ancestor.findOneAndDelete({ _id: ancestorId });
//     },

//   // ChromosomeSegment removal mutation
//     removeChromosomeSegment: async (parent, { segmentId }) => {
//       return ChromosomeSegment.findOneAndDelete({ _id: segmentId });
//     },

//   // Ancestor update mutation
//     updateAncestor: async (parent, { ancestorId, input }) => {
//       return Ancestor.findOneAndUpdate({ _id: ancestorId }, input, { new: true });
//     },

//   // ChromosomeSegment update mutation
//     updateChromosomeSegment: async (parent, { segmentId, input }) => {
//       return ChromosomeSegment.findOneAndUpdate({ _
// id: segmentId }, input, { new: true });

// Add ChromosomeSegment mutation
    addChromosomeSegment: async (parent, { profileId, input }) => {
      const newSegment = await ChromosomeSegment.create(input);

      return Profile.findOneAndUpdate()
    }
  }
  
};

module.exports = resolvers;
