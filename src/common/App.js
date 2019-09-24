import React from "react";
import Root from "Root";
import { NavItem, NavLink } from "reactstrap";
import { Query } from "react-apollo";
import * as Viewer from "Queries/viewer";

import { Layout } from "@nebulario/microservice-layout";

const App = () => {
  return (
    <Query query={Viewer.GET}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

        const { viewer } = data;

        return (
          <div>
            <Layout viewer={viewer}>
              <Root viewer={viewer} />
            </Layout>
          </div>
        );
      }}
    </Query>
  );
};

export default App;
