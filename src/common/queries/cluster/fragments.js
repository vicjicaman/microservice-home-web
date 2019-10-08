import { gql } from "apollo-boost";

export const Cluster = gql`
  fragment ClusterFragment on Cluster {
    id
  }
`;
