import { gql } from "apollo-boost";
import * as ClusterFragments from "Queries/cluster/fragments";
import * as NamespaceFragments from "Queries/cluster/namespace/fragments";
import * as ServiceFragments from "Queries/cluster/namespace/service/fragments";

export const SERVICES = gql`
  query ClusterServicesList {
    viewer {
      id
      cluster {
        ...ClusterFragment
        namespaces {
          get {
            ...NamespaceFragment
            services {
              list {
                ...ServiceFragment
              }
            }
          }
        }
      }
    }
  }
  ${ClusterFragments.Cluster}
  ${NamespaceFragments.Namespace}
  ${ServiceFragments.Service}
`;
