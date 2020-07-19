const imports = require("./globalConstants.js");
const { initial } = require("underscore");
const globalInput = imports["input"];

/**
 * ? Key Assumptions/Design Decisions:
 * ? ---> classes that exist in prereq values but do not exist in the parent level should not be considered as a valud prereq, since we don't know its prereq info
 * ? ---> "or" requirements are dealt with by just taking the first class that exists in the parent and using that as the requirement
 * ? ---> i'm not getting any bogus data, meaning there may be no solution or cyclical prereqs may exist, but there won't have any human error situations
 * ? --->----> for example, there will not be a situation where subject or classId are null
 * ? ----> "and" prereqs only have two values. neither of these values can be of type "AND"
 * ? ----> ----> //! NOTE: this is one of the main flaws in my current design. In a future implementation I would abstract to a "handleAnd" method to handle this accordingly
 * ? ----> there are no cyclical prereqs. //! this is a known bug in this solution (see getOrder function) that needs to be fixed in a future implementation
 *
 * !  High Level Plan:
 * 1. Create an array of all the names of classes that exist in the parent | e.g: //! var names = ["CS2500", "CS2510"]
 * 2. Create an object that maps the name to its original course object | e.g: //! var objects = { CS2500: {...}, CS2510: {...} }
 * 3. Make a helper function that converts the given input a manageable object | e.g: //! var data = { CS2500: [], CS2510: ["CS2500"] }
 * 4. Run DFS on this new data and output result array | //! function getCourseOrder(data) { while(...) { for(...) } }
 * ----> var result = getCourseOrder(data) | //! result = ["CS2500", "CS2510"]
 * 5. Replace the strings in result array  with original course objects using part 2 //! var replacedResult = [ {...}, {...} ]
 * 6. Create final solution object | //! { "plan": replacedResult }
 * 7. Torture test the solution by making a bunch of edge cases using fabricated class data //! see tests.js for this
 * 8. Convert final solution object to a JSON and write it to a separate file to be POST'ed to ENDPOINT using Postman
 */

/**
 * *Helper
 * Takes in a course object and concats its subject and classId
 *
 * @param {Object} obj - an object representing a course
 * @returns a string representing the full name of the given course
 */
function courseToId(obj) {
  return obj["subject"] + obj["classId"];
}

/**
 * *Helper
 * Takes in the prereqs of a course and returns true if it is of type "or"
 *
 * @param {Object} obj - object representing the prereqs of a course
 * @returns boolean that is true only if object["type"] is "or"
 */
function isThisOr(obj) {
  return obj["type"] == "or";
}

/**
 * *--STEP 1--*
 * Takes in an array of course objects, and returns an array of the full names of each one
 * The i'th string of the output array will be the full name of the i'th course object of the input array
 * Note: response will be of same length and in same order as input
 *
 * @param {Array} courses - the array of objects, each representing a course
 * @returns array of strings of same length as input array representing all the names of the courses in the input
 */
function courseNames(courses) {
  var result = [];

  for (let i = 0; i < courses.length; i++) {
    var name = courseToId(courses[i]);
    result.push(name);
  }
  return result;
}

/**
 * *--STEP 2--*
 * Creates a dictionary-style object where the i'th value of [keys] is the key, and the i'th value of [values] is the value.
 * Note: keys and values must be in same order to map correctly
 * To be used in Step 6 to create final "Plan" object
 *
 * @param {Array} keys - the array of course names
 * @param {Array} values - the array of course objects
 * @returns dictionary-style object where the i'th value of [keys] is the key, and the i'th value of [values] is the value
 */
function mapNamesToObjs(keys, values) {
  var result = {};
  // this works because keys and values will be the same length and in the same order (see courseNames function)
  for (let i = 0; i < keys.length; i++) {
    var thisKey = keys[i];
    var thisValue = values[i];
    result[thisKey] = thisValue;
  }

  return result;
}

/**
 * *Helper
 * Takes in an object representing the prereqs of a class with type "or", and produces the name of the class that should be considered in this case
 *
 * *Design Notes:
 * -- only returns a course name if the course exists in the parent level (see: globalKeys)
 * ---- if it doesn't find a course that exists in parent, returns ""
 * -- defaults to the first object that appears in the prereq "values"
 * -- if all are or's or and's then it will iterate through those, and this can potentially produce an array of multiple strings instead of just one string
 *
 * @param {Object} obj - the prereq object of type "or"
 * @param {Array} keys - keys of course names to check if the class output exists in parent level input
 * @returns array of strings or one string representing the class names of the courses we should consider in this case
 */
function handleOr(obj, keys) {
  var values = obj["values"];
  for (let i = 0; i < values.length; i++) {
    var thisValue = values[i];
    var isCourse = !(thisValue["type"] === "and" || thisValue["type"] === "or");
    if (isCourse) {
      var name = courseToId(thisValue);
      var exists = keys.indexOf(name) > -1;
      if (exists) {
        return name;
      }
    }
  }

  // this will only happen if everything is a nested "and" or nested "or"
  for (let i = 0; i < values.length; i++) {
    var thisValue = values[i];
    var isAnd = thisValue["type"] === "and";
    var isOr = thisValue["type"] === "or";

    if (isAnd && thisValue["values"].length == 1) {
      var name = courseToId(thisValue["values"][0]);
      var exists = keys.indexOf(name) > -1;
      // check that the course name in this case actually exists
      if (exists) {
        return name;
      }
    } else if (isAnd && thisValue["values"].length == 2) {
      var result = handleAnd2(thisValue["values"], keys);
      // check that result from handleAnd2 is truthie
      if (result) {
        return result;
      }
    } else if (isOr) {
      var result = handleOr(thisValue, keys);
      // check that result from handleOr is truthie
      if (result) {
        return result;
      }
    }
  }
  // defaults to empty string if none of the courses we looked at ever existed in keys
  return "";
}

/**
 * *Helper
 * Takes in the values of a prereq object, where the prereq object must be of type "and", & have exactly 2 values
 * Produces what courses should be considered in this specific prereq case
 *
 * @param {Array} pqValues - an array of the prereq values in a case of "and" with 2 values
 * @param {Array} keys - keys of course names to check if the class output exists in parent level input
 * @returns an array of the course names that should be considered in this specific prereq case
 */
function handleAnd2(pqValues, keys) {
  var first = pqValues[0];
  var second = pqValues[1];

  var result = [];

  if (
    Object.keys(first).length == 0 ||
    Object.keys(second).length == 0 ||
    keys.length == 0
  ) {
    return [];
  }

  if (isThisOr(first)) {
    result.push(handleOr(first, keys));
  } else {
    var name = courseToId(first);
    var exists = keys.indexOf(name) > -1;
    if (exists) {
      result.push(name);
    }
  }

  if (isThisOr(second)) {
    result.push(handleOr(second, keys));
  } else {
    var name = courseToId(second);
    var exists = keys.indexOf(name) > -1;
    if (exists) {
      result.push(name);
    }
  }

  return result;
}

/**
 * *--STEP 3--*
 * Top level function that uses helpers and step 2 to wrangle the course data input into desired data format (see @returns and test cases in tests.js)
 *
 * @param {array} courses - array of course objects from original input data
 * @param {Array} keys - keys of course names to check if the class output exists in parent level input
 * @returns an object where the keys are all the course names from input, and the value is an array of strings representing the courses to be considered as prereqs in DFS implementation
 */
function wrangleInput(courses, keys) {
  result = {};

  for (let i = 0; i < courses.length; i++) {
    var thisArray = [];
    var thisCourse = courses[i];
    var thisName = courseToId(thisCourse);

    var pq = thisCourse["prereqs"];
    var pqType = pq["type"];
    var pqValues = pq["values"];

    var isAnd = pqType === "and";

    //* find all the edge cases of different prereqs and dispatch to helpers accordingly
    if (isAnd && pqValues.length == 0) {
      thisArray = [];
    } else if (isAnd && pqValues.length == 1) {
      var name = courseToId(pqValues[0]);
      var exists = keys.indexOf(name) > -1;
      if (exists) {
        thisArray.push(name);
      }
    } else if (isAnd && pqValues.length == 2) {
      thisArray = handleAnd2(pqValues, keys);
    } else {
      thisArray.push(handleOr(pq, keys));
    }

    result[thisName] = thisArray;
  }

  return result;
}

/**
 * *--STEP 4--*
 * Takes in the output object from wrangleInput, and implements DFS to sort the courses accordingly
 * TODO add some kind of logic to figure out if it is cyclical or the solution is impossible for some reason
 *
 * @param {*} input - an object where the keys are all the course names in globalKeys, and the value is an array of strings representing the courses to be considered as prereqs
 * @returns a sorted array of the course names sorted based on prereq requirements
 */
function getOrder(input) {
  let result = [];
  let visited = []; //! track visited to check if cyclical
  // let initialLength = Object.keys(input).length;

  while (Object.keys(input).length !== 0) {
    // if (tracker.length > initialLength * initialLength) {
    //   return "no solution";
    // }
    for (let item in input) {
      let thisOne = input[item];

      visited.push(thisOne); //! add every visited node visited to check if cyclical

      if (!thisOne || thisOne.length === 0) {
        delete input[item];
        result.push(item);
        continue;
      }

      let hasAlreadyTakenClasses = thisOne.every((currentValue) => {
        return result.indexOf(currentValue) > -1;
      });

      if (hasAlreadyTakenClasses) {
        delete input[item];
        result.push(item);
      }
    }
  }

  return result;
}

/**
 * *--STEP 5--*
 * Takes in the array ordered by DFS and a dictionary-style object, and maps the strings in the array of course objects, but keeps the sorted order of [orderedArray]
 *
 * @param {array} orderedArray - array of course names, ordered based on prereqs
 * @param {dictionary} dictionary - dictionary-style object where the key is a course name and the value is the course object from original input
 * @returns an array in the same order as [orderedArray], but course names are replaced by their respective course objects in {dictionary}
 */
function mapOrderedToPlan(orderedArray, dictionary) {
  var result = [];
  for (var i = 0; i < orderedArray.length; i++) {
    var thisName = orderedArray[i];
    result.push(dictionary[thisName]);
  }
  return result;
}

/**
 * *--STEP 6--*
 * Simply formats the data with a "plan" key, as the API Endpoint wants it
 *
 * @param {array} plan - the array of courses objects, sorted based on prereq requirements
 * @returns an object of length one, where the key "plan" has a value of the inputted [plan]
 */
function createPlan(plan) {
  var solution = {};
  solution["plan"] = plan;
  return solution;
}

/**
 * *--main method for running everything--*
 *
 * @param {*} input - input data for problem
 * @returns the final solution for the problem with the given input data
 */
function main(input) {
  var courses = input["courses"];
  if (courses.length == 1) {
    return createPlan(courses);
  }
  var keys = courseNames(courses);

  var wrangledInput = wrangleInput(courses, keys);
  var orderedArray = getOrder(wrangledInput);
  var dictionary = mapNamesToObjs(keys, courses);
  var plan = mapOrderedToPlan(orderedArray, dictionary);
  var finalSolution = createPlan(plan);
  return finalSolution;
}
var finalSolution = main(globalInput);
console.log(finalSolution);

/**
 * *--STEP 7--*
 * Export functions for testing in tests.js
 */
module.exports = {
  courseToId: courseToId,
  isThisOr: isThisOr,
  courseNames: courseNames,
  mapNamesToObjs: mapNamesToObjs,
  handleOr: handleOr,
  handleAnd2: handleAnd2,
  wrangleInput: wrangleInput,
  getOrder: getOrder,
  mapOrderedToPlan: mapOrderedToPlan,
  createPlan: createPlan,
  main: main,
};

/**
 * *--STEP 8--*
 * Write the finalSolution to a separate .JSON file so I can copy paste it to postman
 * !commented this out for now since I don't need to do it every time
 */

// var fs = require("fs");
// fs.writeFile("final.json", JSON.stringify(finalSolution), function (err) {
//   if (err) {
//     return console.error(err);
//   }
//   console.log("Data written successfully!");
//   fs.readFile("final.json", function (err, data) {
//     if (err) {
//       return console.error(err);
//     }
//   });
// });
