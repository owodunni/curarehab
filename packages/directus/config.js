const fs = require("fs");

const ca = fs.readFileSync("/var/directus/root.ca").toString();

const config = {
  DB_SSL: {
    ssl: {
      ca
    }
  }
};

module.exports = config;
