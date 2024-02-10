const { Profile, Ancestor, Segment } = require("../models");
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
      return await Ancestor.find({}).populate("segments");
    },
    ancestor: async (parent, { ancestorId }) => {
      return Ancestor.findById(ancestorId).populate("segments");
    },

    // Segment queries
    segments: async () => {
      return Segment.find({}).populate("ancestorIds");
    },
    segment: async (parent, { segmentId }) => {
      return Segment.findById(segmentId);
    },

    segmentsByWikitreeId: async (parent, args) => {
      // Find all segments by wikitreeId
      const segments = await Segment.find({ wikitreeIds: args.wikitreeId });

      if (!segments) {
        throw new Error("No segments found for this wikitreeId");
      }

      // Return the segments
      return segments;
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

    //   // Segment removal mutation
    //     removeSegment: async (parent, { segmentId }) => {
    //       return Segment.findOneAndDelete({ _id: segmentId });
    //     },

    //   // Ancestor update mutation
    //     updateAncestor: async (parent, { ancestorId, input }) => {
    //       return Ancestor.findOneAndUpdate({ _id: ancestorId }, input, { new: true });
    //     },

    //   // Segment update mutation
    //     updateSegment: async (parent, { segmentId, input }) => {
    //       return Segment.findOneAndUpdate({ _
    // id: segmentId }, input, { new: true });

    // Add Segment mutation
    addSegment: async (parent, { profileId, input }) => {
      const newSegment = await Segment.create(input);

      return Profile.findOneAndUpdate();
    },
  },
};

module.exports = resolvers;
