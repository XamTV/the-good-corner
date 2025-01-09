import { gql } from "../gql";

export const GET_CATEGORIES = gql(`
  query ReadCategories {
    readCategories {
      id
      title
    }
  }
`);

export const GET_TAGS = gql(`
  query ReadTags {
    readTags {
      id
      title
    }
  }
`);

export const GET_ADS = gql(`
  query ReadAds {
    readAds {
      id
      title
      description
      location
      owner
      price
      picture
      tags {
        id
        title
      }
    }
  }
`);

export const GET_ADS_BY_CATEGORY_ID = gql(`
  query ReadAdsByCategoryId($readCategoryId: ID!) {
    readCategory(id: $readCategoryId) {
      ads {
        title
        picture
        price
        id
        description
        location
        owner
      }
    }
  }
`);

export const GET_AD = gql(`
  query ReadAd($readAdId: ID!) {
    readAd(id: $readAdId) {
      id
      title
      description
      location
      owner
      price
      picture
      category {
        id
        title
      }
      tags {
        id
        title
      }
    }
  }
`);
