#!/bin/bash

NODE_ENV=test 
./node_modules/.bin/istanbul cover -x \"**/vendor/**\" 
./node_modules/.bin/mocha test/bootstrap.coffee test/
# npm run test 
# ./node_modules/.bin/_mocha -- --opts test/mocha.opts test/bootstrap.coffee test/