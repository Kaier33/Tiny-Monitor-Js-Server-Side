const { createHash } = require("crypto");

const encrypt = (algorithm, content) => {
  let hash = createHash(algorithm);
  hash.update(content);
  return hash.digest("hex");
};

const SHA256 = (content) => encrypt('sha256', content)

module.exports = { SHA256 };