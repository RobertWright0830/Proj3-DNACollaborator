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
