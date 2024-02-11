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

  #Profile mutations
    #Profile add
  addProfile(name: String!, email: String!, password: String!): Auth
    #Profile login
  login(email: String!, password: String!): Auth
    #Profile update
  updateProfile(profileId: ID!, name: String, email: String, password: String): Profile
    #Profile remove
  removeProfile(profileId: ID!): Profile

  #Ancestor mutations
    #Ancestor add
  addAncestor(ancestorId: ID!, wikitreeId: String!, birthName: String, birthDate: String, deathDate: String, birthLocation: String, deathLocation: String, sex: String, wikitreePicUrl: String): Ancestor
    #Ancestor update
  updateAncestor(ancestorId: ID!, wikitreeId: String, birthName: String, birthDate: String, deathDate: String, birthLocation: String, deathLocation: String, sex: String, wikitreePicUrl: String): Ancestor
    #Ancestor remove
  removeAncestor(ancestorId: ID!): Ancestor

  #Segment mutations
    #Segment add
  addSegment(testerId: String!, matchId: String!, matchName: String, matchEmail: String, sex: String, chromosome: String!, start: Int!, end: Int!, segmentCm: Float, snp: Int): Segment
    #Segment update
  updateSegment(segmentId: ID!, testerId: String, matchId: String, matchName: String, matchEmail: String, sex: String, chromosome: String, start: Int, end: Int, segmentCm: Float, snp: Int): Segment
    #Segment remove
  removeSegment(segmentId: ID!): Segment
}
`;

module.exports = typeDefs;
