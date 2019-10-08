import React from "react";
import { Route, NavLink, Switch, Link } from "react-router-dom";
import * as Content from "Queries/content";
import * as Cluster from "Queries/cluster";
import { Query } from "react-apollo";

export default ({ history }) => (
  <div>
    <div>
      <Query query={Content.GET} variables={{ id: "index" }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error}</p>;

          const {
            viewer: {
              content: {
                get: { content }
              }
            }
          } = data;

          return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
        }}
      </Query>
    </div>
    <div className="row justify-content-md-center ">
      <div className="col-8">
        <Query query={Cluster.SERVICES}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error}</p>;

            const {
              viewer: {
                cluster: {
                  namespaces: {
                    get: {
                      services: { list }
                    }
                  }
                }
              }
            } = data;

            return (
              <ul className="list-group">
                {list.map(({ id, name, type, pods: { list: pods } }) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={id}
                  >
                    <span>
                      <i className="text-success fa fa-check"> </i> {name}
                      <ul>
                        {pods.map(({ name, status }) => (
                          <li className="small">
                            <span
                              class={
                                "badge text-small " +
                                (status === "Running"
                                  ? "badge-success"
                                  : "badge-warning") +
                                " badge-pill"
                              }
                            >
                              {status}
                            </span>{" "}
                            {name}
                          </li>
                        ))}
                      </ul>
                    </span>{" "}
                    <span
                      class={
                        "badge text-small " +
                        (type === "NodePort"
                          ? "badge-primary"
                          : "badge-secondary") +
                        " badge-pill"
                      }
                    >
                      {type}
                    </span>
                  </li>
                ))}
              </ul>
            );
          }}
        </Query>
      </div>
    </div>
    <div>
      <Query query={Content.GET} variables={{ id: "info" }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error}</p>;

          const {
            viewer: {
              content: {
                get: { content }
              }
            }
          } = data;

          return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
        }}
      </Query>
    </div>
  </div>
);
