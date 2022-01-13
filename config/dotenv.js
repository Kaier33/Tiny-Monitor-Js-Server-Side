const dotenv = require('dotenv');
let envFile = '.env'
if (process.env.NODE_ENV === 'development') envFile = '.env.dev'
dotenv.config({
  path: envFile
});