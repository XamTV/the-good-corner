import { gql } from "../gql";

export const CREATE_AD = gql(`
  mutation CreateAd($data: AdCreateInput!) {
    createAd(data: $data) {
      id
      createdAt
    }
  }
`);

export const CREATE_CATEGORY = gql(`
  mutation CreateCategory($data: CategoryCreateInput!) {
    createCategory(data: $data) {
      id
      title
    }
  }
`);

export const CREATE_TAG = gql(`
  mutation CreateTag($data: TagCreateInput!) {
    createTag(data: $data) {
      id
      title
    }
  }
`);

export const UPDATE_AD = gql(`
  mutation UpdateAd($data: AdUpdateInput!, $updateAdId: ID!) {
    updateAd(data: $data, id: $updateAdId) {
      id
      title
    }
  }
`);

export const DELETE_AD = gql(`
  mutation DeleteAd($deleteAdId: ID!) {
    deleteAd(id: $deleteAdId) {
      id
      title
    }
  }
`);

export const CREATE_USER = gql(`
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
    }
  }  
`);

export const SIGN_IN = gql(`
  mutation SignIn($data: UserUpdateInput!) {
      signIn(data: $data) {
      email
    }
  }
`);

export const SIGN_OUT = gql(`
  mutation Mutation {
  signout
}
`);
