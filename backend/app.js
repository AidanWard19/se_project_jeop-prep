const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());
// app.use(express.json());

app.use(
  "/",
  createProxyMiddleware({
    target: "http://cluebase.lukelav.in",
    changeOrigin: true,
    followRedirects: true,
  })
);

app.listen(3002);
