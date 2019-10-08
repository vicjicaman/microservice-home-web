import { gql } from "apollo-boost";

export const Content = gql`
  fragment ContentFragment on Content {
    id
    content
  }
`;
