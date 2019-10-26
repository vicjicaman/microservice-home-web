import { gql } from "apollo-boost";

export const Namespace = gql`
  fragment NamespaceFragment on Namespace {
    id
    name
  }
`;
