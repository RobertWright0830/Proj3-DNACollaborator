import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_ANCESTOR_BY_WIKITREE_ID = gql`
  mutation AddAncestorByWikitreeId($wikitreeId: String!) {
    addAncestorByWikitreeId(wikitreeId: $wikitreeId) {
      _id
      wikitreeId
      firstName
      middleName
      lastNameAtBirth
      birthDate
      deathDate
      birthLocation
      deathLocation
      sex
      wikitreePicUrl
    }
  }
`;

export const ADD_WIKITREEID_TO_SEGMENT = gql`
  mutation AddWikiTreeIdToSegment($segmentId: ID!, $wikitreeId: String!) {
    addWikiTreeIdToSegment(segmentId: $segmentId, wikitreeId: $wikitreeId) {
      _id
      wikitreeIds
    }
  }
`;

export const REMOVE_WIKITREEID_FROM_SEGMENT = gql`
  mutation RemoveWikiTreeIdFromSegment($segmentId: ID!, $wikitreeId: String!) {
    removeWikiTreeIdFromSegment(segmentId: $segmentId, wikitreeId: $wikitreeId) {
      _id
      wikitreeIds
    }
  }
`;
