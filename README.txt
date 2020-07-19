PLEASE RUN NPM START BEFORE TRYING TO RUN FILES -- node_modules folder is not included in the submitted .zip
npm start will run "node solution.js"
npm test will run "node tests.js"

I RECOMMEND USING THE BETTER COMMENTS EXTENSION IN VS CODE WHEN VIEWING THE FILES:
https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments
I use the formatting from this commenting in my documentation throughout my code.

FILES:
apiCalls.js -> file I was originally gonna use to get the data, but then I realized that the API end points stop returning the data once you've solved the problem 
submission.json -> a copy of the JSON I submitted through postman
solution.js -> my solution, console.logs the solution based on the data set in "input" variable of globalConstants.js
final.json -> when step 8 (lines 351-368 of solution.js) is uncommented, npm start will write the solution to final.json 
globalConstants.js -> global constants (primarily my input data) are stored here

tests.js -> my incremental testing of all my helpers. running this file with npm test will produce the test names and whether they were true or false, 
            as well as how many tests and how many of them ran.
testConstants.js -> constants used for testing in tests.js 