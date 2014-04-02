/**
 * Copyright 2013-present NightWorld.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = OAuth2Error;

/**
 * Error
 *
 * @param {Number} code        Numeric error code
 * @param {String} error       Error descripton
 * @param {String} description Full error description
 */
function OAuth2Error (error, description, err) {

  if (!(this instanceof OAuth2Error))
    return new OAuth2Error(error, description, err);

  this.error = {};
  switch (error) {
    case 'invalid_client':
      this.headers = {
        'WWW-Authenticate': 'Basic realm="Service"'
      };
      /* falls through */
    case 'invalid_grant':
    case 'expired_grant':
    case 'invalid_request':
      this.error.code = 400;
      break;
    case 'expired_token':
    case 'invalid_token':
    case 'missing_token':
      this.error.code = 401;
      break;
    case 'server_error':
      this.error.code = 503;
      break;
    default:
      this.error.code = 500;
  }

  this.error.devMsge = error;
  this.error.usrMsge = description || error;
  this.error.stack = (err && err.stack) || err;
}
