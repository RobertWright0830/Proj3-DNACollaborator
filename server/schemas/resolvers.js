const { Profile, Ancestor, Segment } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const axios = require("axios");

const resolvers = {
  Query: {
    // Profile queries
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },

    me: async (parent, { profileId }) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    // Ancestor queries
    ancestors: async () => {
      return await Ancestor.find({});
    },
    ancestor: async (parent, { ancestorId }) => {
      return Ancestor.findById(ancestorId);
    },

    // Segment queries
    segments: async () => {
      return Segment.find({});
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
    // Profile mutations
    // Profile add
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    // Profile login
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
    // Update profile
    updateProfile: async (parent, { profileId, input }) => {
      return Profile.findOneAndUpdate({ _id: profileId }, input, { new: true });
    },
    // Profile remove
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    // Ancestor mutations
    // Ancestor add
    addAncestor: async (
      parent,
      {
        wikitreeId,
        birthDate,
        deathDate,
        birthLocation,
        deathLocation,
        sex,
        wikitreePicUrl,
      }
    ) => {
      const newAncestor = await Ancestor.create({
        wikitreeId,
        birthDate,
        deathDate,
        birthLocation,
        deathLocation,
        sex,
        wikitreePicUrl,
      });
      return newAncestor;
    },

    // Ancestor update
    updateAncestor: async (parent, args) => {
      const {
        ancestorId,
        wikitreeId,
        birthDate,
        deathDate,
        birthLocation,
        deathLocation,
        sex,
        wikitreePicUrl,
      } = args;
      return Ancestor.findOneAndUpdate(
        { _id: ancestorId },
        {
          $set: {
            wikitreeId,
            birthDate,
            deathDate,
            birthLocation,
            deathLocation,
            sex,
            wikitreePicUrl,
          },
        },
        { new: true }
      );
    },
    // Ancestor remove
    removeAncestor: async (parent, { ancestorId }) => {
      return Ancestor.findOneAndDelete({ _id: ancestorId });
    },
    // Add ancestor by wikitreeId
    addAncestorByWikitreeId: async (_, { wikitreeId }) => {
      try {
        const response = await axios.get(
          `https://api.wikitree.com/api.php?action=getProfile&key=${wikitreeId}&fields=Name,FirstName,MiddleName,LastNameAtBirth,BirthDate,DeathDate,BirthLocation,DeathLocation,Gender,Photo`
        );
        console.log("Response:", response); // Log the entire response
        const ancestorData = response.data[0].profile;

        console.log("Ancestor Data:", ancestorData); // Log the data from the response
        const newAncestor = new Ancestor({
          wikitreeId: ancestorData.Name,
          firstName: ancestorData.FirstName,
          middleName: ancestorData.MiddleName,
          lastNameAtBirth: ancestorData.LastNameAtBirth,
          birthDate: ancestorData.BirthDate,
          deathDate: ancestorData.DeathDate,
          birthLocation: ancestorData.BirthLocation,
          deathLocation: ancestorData.DeathLocation,
          sex: ancestorData.Gender,
          wikitreePicUrl: ancestorData.Photo,
        });

        console.log("New Ancestor:", newAncestor); // Log the new ancestor object

        const savedAncestor = await newAncestor.save(); // Save the new ancestor to the database
        console.log("Saved Ancestor:", savedAncestor); // Log the saved ancestor
        return savedAncestor;
      }
      catch (error) {
        console.error(error);
        throw new Error("Ancestor not found");
      }
    },
     


    // Segment mutations
    // Segment add
    addSegment: async (
      parent,
      { testerId, matchId, chromosome, start, end /* other fields */ }
    ) => {
      const newSegment = await Segment.create({
        testerId,
        matchId,
        chromosome,
        start,
        end,
        // include other fields as needed
      });
      return newSegment;
    },

    // Segment update mutation
    updateSegment: async (parent, args) => {
      const {
        segmentId,
        testerId,
        matchId,
        matchName,
        matchEmail,
        sex,
        chromosome,
        start,
        end,
        segmentCm,
        snp,
      } = args;
      return Segment.findOneAndUpdate(
        { _id: segmentId }, 
        {
          $set: {
            testerId,
            matchId,
            matchName,
            matchEmail,
            sex,
            chromosome,
            start,
            end,
            segmentCm,
            snp,
          },
        },
        { new: true }
      );
    },
  
    
    // Segment removal mutation
    removeSegment: async (parent, { segmentId }) => {
      return Segment.findOneAndDelete({ _id: segmentId });
    },
  },
};

module.exports = resolvers;