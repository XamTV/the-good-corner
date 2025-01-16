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
      price
      picture
      createdBy {
        email
      }
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

export const WHOAMI = gql(`
  query Whoami {
    whoami {
      email
    }
  }
`);
