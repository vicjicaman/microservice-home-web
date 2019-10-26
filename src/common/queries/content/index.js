import { gql } from "apollo-boost";
import * as ContentFragments from "Queries/content/fragments";

export const GET = gql`
  query ContentGet($id: ID!) {
    viewer {
      id
      username
      content {
        get(id: $id) {
          ...ContentFragment
        }
      }
    }
  }
  ${ContentFragments.Content}
`;
