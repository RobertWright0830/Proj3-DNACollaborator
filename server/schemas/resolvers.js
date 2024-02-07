const { Profile, Ancestor, Match, Segment, Tester } = require("../models");
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

    // Match queries
    matches: async () => {
      return Match.find();
    },
    match: async (parent, { matchId }) => {
      return Match.findById(matchId);
    },

    // Segment queries
    segments: async () => {
      return Segment.find();
    },
    segment: async (parent, { segmentId }) => {
      return Segment.findById(segmentId);
    },
    
    // Tester queries
    testers: async () => {
      return Tester.find();
    },
    tester: async (parent, { testerId }) => {
      return Tester.findById(testerId);
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

    // // Ancestor mutation
    // addAncestor: async (
    //   parent,
    //   {
    //     wikitreeId,
    //     firstName,
    //     lastName,
    //     birthYear,
    //     deathYear,
    //     birthplace,
    //     deathplace,
    //   }
    // ) => {
    //   return Ancestor.create({
    //     wikitreeId,
    //     firstName,
    //     lastName,
    //     birthYear,
    //     deathYear,
    //     birthplace,
    //     deathplace,
    //   });
    // },
    // // Match mutation
    // addMatch: async (parent, { matchUsername, email, matchName, sex }) => {
    //   return Match.create({ matchUsername, email, matchName, sex });
    // },
    // // Segment mutation
    // addSegment: async (
    //   parent,
    //   {
    //     testerId,
    //     matchId,
    //     chromosomeNumber,
    //     start,
    //     end,
    //     segmentCm,
    //     totalSharedCm,
    //   }
    // ) => {
    //   return Segment.create({
    //     testerId,
    //     matchId,
    //     chromosomeNumber,
    //     start,
    //     end,
    //     segmentCm,
    //     totalSharedCm,
    //   });
    // },
    // // Tester mutation
    // addTester: async (
    //   parent,
    //   { profileId, siteName, testSite, firstName, lastName }
    // ) => {
    //   return Tester.create({
    //     profileId,
    //     siteName,
    //     testSite,
    //     firstName,
    //     lastName,
    //   });
    // },
    // Profile removal mutation
    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId });
    },
  },
};

module.exports = resolvers;
