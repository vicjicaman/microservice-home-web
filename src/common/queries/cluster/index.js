import { gql } from "apollo-boost";
import * as ClusterFragments from "Queries/cluster/fragments";
import * as NamespaceFragments from "Queries/cluster/namespace/fragments";
import * as ServiceFragments from "Queries/cluster/namespace/service/fragments";
import * as PodFragments from "Queries/cluster/namespace/service/pod/fragments";

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
                pods {
                  list {
                    ...PodFragment
                  }
                }
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
  ${PodFragments.Pod}
`;
