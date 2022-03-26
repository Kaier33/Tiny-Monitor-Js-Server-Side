const path = require("path");
const fs = require("fs");
let rawdata = fs.readFileSync(path.join(__dirname, "./project-blacklist.json"));
let blacklist = JSON.parse(rawdata).projectsBlacklist;

const recordToFile = function (data) {
  fs.writeFileSync(path.join(__dirname, "./project-blacklist.json"), data);
};

const blacklistPush = function (name) {
  if (typeof name !== "string") return;
  if (blacklist.indexOf(name) == -1) {
    blacklist.push(name);
    recordToFile(JSON.stringify({ projectsBlacklist: blacklist }));
  }
};

const blacklistDel = function (name) {
  if (typeof name !== "string") return;
  const index = blacklist.indexOf(name);
  if (index !== -1) {
    blacklist.splice(index, 1);
    recordToFile(JSON.stringify({ projectsBlacklist: blacklist }));
  }
};

module.exports = {
  blacklist,
  blacklistPush,
  blacklistDel,
};
