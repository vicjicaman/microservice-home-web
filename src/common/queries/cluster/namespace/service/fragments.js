import { gql } from "apollo-boost";

export const Service = gql`
  fragment ServiceFragment on Service {
    id
    name
    type
  }
`;
