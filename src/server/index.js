import path from "path";
import fs from "fs";

import React from "react";
import express from "express";
import { render } from "./render";
import App from "../common/App.js";
import { reducers, watchers } from "../common/state";

const HOME_BASE_ROUTE_APP =
  process.env["HOME_BASE_ROUTE_APP"] === "/" ? "" : process.env["HOME_BASE_ROUTE_APP"];
const HOME_INTERNAL_URL_GRAPH =  process.env["HOME_INTERNAL_URL_GRAPH"];
const HOME_EXTERNAL_URL_GRAPH =  process.env["HOME_EXTERNAL_URL_GRAPH"];
const HOME_INTERNAL_PORT_APP = process.env["HOME_INTERNAL_PORT_APP"];

const app = express();

app.use(
  HOME_BASE_ROUTE_APP + "/jquery",
  express.static("/app/node_modules/jquery/dist")
);
app.use(
  HOME_BASE_ROUTE_APP + "/bootstrap",
  express.static("/app/node_modules/bootstrap/dist")
);
app.use(
  HOME_BASE_ROUTE_APP + "/font-awesome",
  express.static("/app/node_modules/font-awesome")
);
app.use(HOME_BASE_ROUTE_APP + "/app", express.static("dist/web"));

app.get("/*", (req, res) => {
  const cxt = {};

  render(
    {
      App,
      req,
      res,
      watchers,
      reducers,
      paths: {
        base: HOME_BASE_ROUTE_APP
      },
      urls: {
        external: {
          graphql: HOME_EXTERNAL_URL_GRAPH
        },
        internal: {
          graphql: HOME_INTERNAL_URL_GRAPH
        }
      }
    },
    cxt
  );
});

app.listen(HOME_INTERNAL_PORT_APP, () => {
  console.log(`Server is listening on port....... ${HOME_INTERNAL_PORT_APP}`);
});
