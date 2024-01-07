import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(
  `
    #graphql
    query VerifyUserGoogleToken($token: String!) {
      verifyGoogleToken(token: $token)
    }
  `
);

export const getCurrentUserQuery = graphql(
  `
    #graphql
    query GetCurrentUser {
      getCurrentUser {
        id
        profileImageURL
        firstName
        lastName
        email
        recommendedUser {
          id
          firstName
          lastName
          profileImageURL
        }
        followers {
          id
          firstName
          lastName
          profileImageURL
        }
        following {
          id
          firstName
          lastName
          profileImageURL
        }
        tweets {
          id
          content
          imageURL
          author {
            id
            firstName
            lastName
            profileImageURL
          }
        }
      }
    }
  `
);

export const getUserByIdQuery = graphql(
  `
    #graphql
    query GetUserById($id: ID!) {
      getUserById(id: $id) {
        id
        firstName
        lastName
        profileImageURL
        followers {
          id
          firstName
          lastName
          profileImageURL
        }
        following {
          id
          firstName
          lastName
          profileImageURL
        }
        tweets {
          id
          content
          imageURL
          author {
            id
            firstName
            lastName
            profileImageURL
          }
        }
      }
    }
  `
);
