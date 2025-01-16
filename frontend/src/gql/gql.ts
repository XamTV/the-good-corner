/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation CreateAd($data: AdCreateInput!) {\n    createAd(data: $data) {\n      id\n      createdAt\n    }\n  }\n": types.CreateAdDocument,
    "\n  mutation CreateCategory($data: CategoryCreateInput!) {\n    createCategory(data: $data) {\n      id\n      title\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  mutation CreateTag($data: TagCreateInput!) {\n    createTag(data: $data) {\n      id\n      title\n    }\n  }\n": types.CreateTagDocument,
    "\n  mutation UpdateAd($data: AdUpdateInput!, $updateAdId: ID!) {\n    updateAd(data: $data, id: $updateAdId) {\n      id\n      title\n    }\n  }\n": types.UpdateAdDocument,
    "\n  mutation DeleteAd($deleteAdId: ID!) {\n    deleteAd(id: $deleteAdId) {\n      id\n      title\n    }\n  }\n": types.DeleteAdDocument,
    "\n  mutation CreateUser($data: UserCreateInput!) {\n    createUser(data: $data) {\n      id\n    }\n  }  \n": types.CreateUserDocument,
    "\n  mutation SignIn($data: UserUpdateInput!) {\n      signIn(data: $data) {\n      email\n    }\n  }\n": types.SignInDocument,
    "\n  mutation Mutation {\n  signout\n}\n": types.MutationDocument,
    "\n  query ReadCategories {\n    readCategories {\n      id\n      title\n    }\n  }\n": types.ReadCategoriesDocument,
    "\n  query ReadTags {\n    readTags {\n      id\n      title\n    }\n  }\n": types.ReadTagsDocument,
    "\n  query ReadAds {\n    readAds {\n      id\n      title\n      description\n      location\n      price\n      picture\n      tags {\n        id\n        title\n      }\n    }\n  }\n": types.ReadAdsDocument,
    "\n  query ReadAdsByCategoryId($readCategoryId: ID!) {\n    readCategory(id: $readCategoryId) {\n      ads {\n        title\n        picture\n        price\n        id\n        description\n        location\n\n      }\n    }\n  }\n": types.ReadAdsByCategoryIdDocument,
    "\n  query ReadAd($readAdId: ID!) {\n    readAd(id: $readAdId) {\n      id\n      title\n      description\n      location\n      price\n      picture\n      createdBy {\n        email\n      }\n      category {\n        id\n        title\n      }\n      tags {\n        id\n        title\n      }\n    }\n  }\n": types.ReadAdDocument,
    "\n  query Whoami {\n    whoami {\n      email\n    }\n  }\n": types.WhoamiDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateAd($data: AdCreateInput!) {\n    createAd(data: $data) {\n      id\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAd($data: AdCreateInput!) {\n    createAd(data: $data) {\n      id\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCategory($data: CategoryCreateInput!) {\n    createCategory(data: $data) {\n      id\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCategory($data: CategoryCreateInput!) {\n    createCategory(data: $data) {\n      id\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateTag($data: TagCreateInput!) {\n    createTag(data: $data) {\n      id\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTag($data: TagCreateInput!) {\n    createTag(data: $data) {\n      id\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateAd($data: AdUpdateInput!, $updateAdId: ID!) {\n    updateAd(data: $data, id: $updateAdId) {\n      id\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateAd($data: AdUpdateInput!, $updateAdId: ID!) {\n    updateAd(data: $data, id: $updateAdId) {\n      id\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteAd($deleteAdId: ID!) {\n    deleteAd(id: $deleteAdId) {\n      id\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteAd($deleteAdId: ID!) {\n    deleteAd(id: $deleteAdId) {\n      id\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($data: UserCreateInput!) {\n    createUser(data: $data) {\n      id\n    }\n  }  \n"): (typeof documents)["\n  mutation CreateUser($data: UserCreateInput!) {\n    createUser(data: $data) {\n      id\n    }\n  }  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignIn($data: UserUpdateInput!) {\n      signIn(data: $data) {\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($data: UserUpdateInput!) {\n      signIn(data: $data) {\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Mutation {\n  signout\n}\n"): (typeof documents)["\n  mutation Mutation {\n  signout\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ReadCategories {\n    readCategories {\n      id\n      title\n    }\n  }\n"): (typeof documents)["\n  query ReadCategories {\n    readCategories {\n      id\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ReadTags {\n    readTags {\n      id\n      title\n    }\n  }\n"): (typeof documents)["\n  query ReadTags {\n    readTags {\n      id\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ReadAds {\n    readAds {\n      id\n      title\n      description\n      location\n      price\n      picture\n      tags {\n        id\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query ReadAds {\n    readAds {\n      id\n      title\n      description\n      location\n      price\n      picture\n      tags {\n        id\n        title\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ReadAdsByCategoryId($readCategoryId: ID!) {\n    readCategory(id: $readCategoryId) {\n      ads {\n        title\n        picture\n        price\n        id\n        description\n        location\n\n      }\n    }\n  }\n"): (typeof documents)["\n  query ReadAdsByCategoryId($readCategoryId: ID!) {\n    readCategory(id: $readCategoryId) {\n      ads {\n        title\n        picture\n        price\n        id\n        description\n        location\n\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ReadAd($readAdId: ID!) {\n    readAd(id: $readAdId) {\n      id\n      title\n      description\n      location\n      price\n      picture\n      createdBy {\n        email\n      }\n      category {\n        id\n        title\n      }\n      tags {\n        id\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query ReadAd($readAdId: ID!) {\n    readAd(id: $readAdId) {\n      id\n      title\n      description\n      location\n      price\n      picture\n      createdBy {\n        email\n      }\n      category {\n        id\n        title\n      }\n      tags {\n        id\n        title\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Whoami {\n    whoami {\n      email\n    }\n  }\n"): (typeof documents)["\n  query Whoami {\n    whoami {\n      email\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;