const typeDefs = `
type Profile {
  _id: ID!
  name: String!
  email: String!
}

type Auth {
  token: ID!
  profile: Profile
}

type Segment {
  _id: ID!
  testerId: String!
  testerName: String
  matchId: String!
  matchName: String
  matchEmail: String
  sex: String
  field1: String
  field2: String
  field3: String
  field4: String
  field5: String
  chromosome: String!
  start: Int!
  end: Int!
  segmentCm: Float
  snp: Int
  wikitreeIds: [String]
}

type Ancestor {
  _id: ID!
  wikitreeId: String
  birthName: String
  birthDate: String
  deathDate: String
  birthLocation: String
  deathLocation: String
  sex: String
  wikitreePicUrl: String
}

# Root type for all queries
type Query {
  profiles: [Profile]!
  profile(profileId: ID!): Profile
  segments: [Segment]!
  segment(segmentId: ID!): Segment
  segmentsByWikitreeId(wikitreeId: String!): [Segment]
  ancestors: [Ancestor]!
  ancestor(ancestorId: ID!): Ancestor
}

# Root type for all mutations
type Mutation {
  addProfile(name: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  removeProfile(profileId: ID!): Profile
  addSegment(profileId: ID!, testerId: String!, matchId: String!, matchName: String, matchEmail: String, matchSex: String, chromosome: String!, start: Int!, end: Int!, segmentCm: Float, snp: Int): Segment
  linkAncestorToSegment(segmentId: ID!, ancestorId: ID!): Segment
}
`;

module.exports = typeDefs;
