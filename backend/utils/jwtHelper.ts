import * as AES from "gibberish-aes/src/gibberish-aes.js";
import * as jwt from "jsonwebtoken";
import {config} from "../../localconfig";

const jwtSecret = config.user.secret;
const aesSecret = config.aes.secret;
const aesPass = config.aes.pass;

const verifyLoginToken = (encodedData) => {
  return AES.dec(jwt.verify(encodedData, jwtSecret).data, aesPass);
};

const getLoginToken = (data) => {
  let encoded = AES.enc(data, aesPass);

  return jwt.sign(
    { data: encoded},
    jwtSecret,
    { expiresIn: "1h" }
  );
};
// export class jwtHelper {
//   getLoginToken
//   verifyLoginToken
// };

export {
  getLoginToken,
  verifyLoginToken
};