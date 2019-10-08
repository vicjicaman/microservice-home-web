import { gql } from "apollo-boost";

export const Pod = gql`
  fragment PodFragment on Pod {
    id
    name
    status
  }
`;
