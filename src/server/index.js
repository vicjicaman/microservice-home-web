import path from "path";
import fs from "fs";

import React from "react";
import express from "express";
import { render } from "./render";
import App from "../common/App.js";
import { reducers, watchers } from "../common/state";
import * as Logger from "@nebulario/microservice-logger";
import * as Utils from "@nebulario/microservice-utils";

const ENV_MODE = process.env["ENV_MODE"];
const HOME_BASE_ROUTE_APP =
  process.env["HOME_BASE_ROUTE_APP"] === "/"
    ? ""
    : process.env["HOME_BASE_ROUTE_APP"];
const HOME_INTERNAL_URL_GRAPH = process.env["HOME_INTERNAL_URL_GRAPH"];
const HOME_EXTERNAL_URL_GRAPH = process.env["HOME_EXTERNAL_URL_GRAPH"];
const HOME_INTERNAL_PORT_APP = process.env["HOME_INTERNAL_PORT_APP"];
const RESOURCE_BASE_ROUTE = process.env["RESOURCE_BASE_ROUTE"];

const logger = Logger.create({ path: "/var/log/app", env: ENV_MODE });

const cxt = {
  logger
};

(async () => {
  const app = express();
  Logger.Service.use(app, cxt);
  app.use(HOME_BASE_ROUTE_APP + "/app", express.static("dist/web"));

  app.get("/*", (req, res) => {
    render(
      {
        App,
        req,
        res,
        watchers,
        reducers,
        paths: {
          base: HOME_BASE_ROUTE_APP,
          resources: RESOURCE_BASE_ROUTE
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
    cxt.logger.info("service.running", { port: HOME_INTERNAL_PORT_APP });
  });
})().catch(e => cxt.logger.error("service.error", { error: e.toString() }));

Utils.Process.shutdown(signal =>
  cxt.logger.info("service.shutdown", { signal })
);
