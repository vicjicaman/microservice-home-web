import React from "react";
import Root from "Root";
import { Link } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";
import { Query } from "react-apollo";
import * as Viewer from "Queries/viewer";

import { Layout } from "@nebulario/microservice-layout";

export const HomeLink = ({ viewer }) => (
  <NavItem>
    <Link className="nav-link" to="/">
      <i className="fa fa-home" /> Home
    </Link>
  </NavItem>
);

export const BlogLink = ({ viewer }) => (
  <NavItem>
    <a className="nav-link" href="/blog">
      <i className="fa fa-book" /> Blog
    </a>
  </NavItem>
);

export const AccountLink = ({ viewer }) => (
  <NavItem>
    <a className="nav-link" href="/auth">
      <i className="fa fa-user"> {viewer.username || "Login"} </i>
    </a>
  </NavItem>
);

const App = () => {
  return (
    <Query query={Viewer.GET}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

        const { viewer } = data;

        return (
          <div>
            <Layout
              viewer={viewer}
              left={[
                <HomeLink key="home" viewer={viewer} />,
                <BlogLink key="blog" viewer={viewer} />
              ]}
              right={[<AccountLink key="account" viewer={viewer} />]}
            >
              <Root viewer={viewer} />
            </Layout>
          </div>
        );
      }}
    </Query>
  );
};

export default App;
