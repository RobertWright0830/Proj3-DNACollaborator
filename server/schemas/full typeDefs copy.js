const typeDefs = `
type Profile {
  _id: ID
  name: String
  email: String
  password: String
}

type Auth {
  token: ID!
  profile: Profile
}

// type Ancestor {
//   id: ID!
//   wikitreeId: String!
//   firstName: String
//   lastName: String
//   birthYear: Int
//   deathYear: Int
//   birthplace: String
//   deathplace: String
//   segments: [Segment]
// }

// type Match {
//   id: ID!
//   matchUsername: String!
//   matchName: String
//   email: String
//   sex: String
//   segments: [Segment]
// }

// type Segment {
//   id: ID!
//   tester: Tester!
//   match: Match!
//   chromosomeNumber: Int!
//   start: Int!
//   end: Int!
//   segmentCm: Float
//   totalSharedCm: Float
// }

// type Tester {
//   id: ID!
//   profile: Profile!
//   siteName: String!
//   testSite: String!
//   firstName: String
//   lastName: String
//   segments: [Segment]
// }

# Root type for all queries
type Query {
  profiles: [Profile]!
  profile(profileId: ID!): Profile
  // me: Profile
  // ancestors: [Ancestor]
  // ancestor(ancestorId: ID!): Ancestor
  // matches: [Match]
  // match(matchId: ID!): Match
  // segments: [Segment]
  // segment(segmentId: ID!): Segment
  // testers: [Tester]
  // tester(testerId: ID!): Tester
}

# Root type for all mutations
type Mutation {
  addProfile(name: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  // addAncestor(wikitreeId: String!, firstName: String, lastName: String): Ancestor
  // addMatch(matchUsername: String!, email: String): Match
  // addSegment(testerId: ID!, matchId: ID!, chromosomeNumber: Int!, start: Int!, end: Int!): Segment
  // addTester(profileId: ID!, siteName: String!, testSite: String!): Tester
  removeProfile(profileId: ID!): Profile
}
`;

module.exports = typeDefs;
