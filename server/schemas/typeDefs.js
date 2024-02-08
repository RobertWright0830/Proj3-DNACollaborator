const typeDefs = `
type Profile {
  _id: ID!
  name: String!
  email: String!
  chromosomeSegments: [ChromosomeSegment!]
}

type Auth {
  token: ID!
  profile: Profile
}

type ChromosomeSegment {
  _id: ID!
  profileId: Profile
  testerId: String!
  testerName: String
  matchId: String!
  matchName: String
  matchEmail: String
  matchSex: String
  field1: String
  field2: String
  field3: String
  field4: String
  field5: String
  ancestorWikitreeIds: [String]
  chromosome: String!
  start: Int!
  end: Int!
  segmentCm: Float
  snp: Int
}

type Ancestor {
  _id: ID!
  ancestorWikitreeId: String
  firstName: String
  lastName: String
  dob: String
  dod: String
  birthplace: String
  deathplace: String
  sex: String
}

# Root type for all queries
type Query {
  profiles: [Profile]!
  profile(profileId: ID!): Profile
  chromosomeSegments: [ChromosomeSegment]!
  chromosomeSegment(segmentId: ID!): ChromosomeSegment
  ancestors: [Ancestor]!
  ancestor(ancestorId: ID!): Ancestor
}

# Root type for all mutations
type Mutation {
  addProfile(name: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  removeProfile(profileId: ID!): Profile
  addChromosomeSegment(profileId: ID!, testerId: String!, matchId: String!, matchName: String, matchEmail: String, matchSex: String, chromosome: String!, start: Int!, end: Int!, segmentCm: Float, snp: Int): ChromosomeSegment
  linkAncestorToSegment(segmentId: ID!, ancestorId: ID!): ChromosomeSegment
}
`;

module.exports = typeDefs;
