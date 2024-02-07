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

type Tester {
  id: ID!
  profile: Profile!
  siteName: String!
  testSite: String
  firstName: String
  lastName: String
}

type Segment {
  id: ID!
  tester: Tester!
  match: Match!
  ancestor: Ancestor
  chromosomeNumber: Int!
  start: Int!
  end: Int!
  segmentCm: Float
  totalSharedCm: Float
}

type Match {
  id: ID!
  matchUsername: String!
  matchName: String
  email: String
  sex: String
}

type Ancestor {
  id: ID!
  wikitreeId: String
  firstName: String
  lastName: String
  birthYear: Int
  deathYear: Int
  birthplace: String
  deathplace: String
}

# Root type for all queries
type Query {
  profiles: [Profile]!
  profile(profileId: ID!): Profile
  testers: [Tester]!
  tester(testerId: ID!): Tester
  segments: [Segment]!
  segment(segmentId: ID!): Segment
  matches: [Match]!
  match(matchId: ID!): Match
  ancestors: [Ancestor]!
  ancestor(ancestorId: ID!): Ancestor
}

# Root type for all mutations
type Mutation {
  addProfile(name: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  removeProfile(profileId: ID!): Profile
}
`;

module.exports = typeDefs;
