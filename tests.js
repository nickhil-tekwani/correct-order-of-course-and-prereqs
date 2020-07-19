// Global Constants
const imports = require("./globalConstants");
const input = imports["input"];
var courses = input["courses"];

const _ = require("underscore");

// Functions
const functions = require("./solution");

// Variables for Testing
const tc = require("./testConstants"); // testConstants shortened to TC
const { motp1_result } = require("./testConstants");
const { create } = require("underscore");

// Object for Logging Test Results
var testResults = {};

/**
 * *--courseToId--*
 */
var courseToId = functions["courseToId"];
testResults["courseToId"] = {};
const cti0 = courseToId(tc["course0"]) == "";
const cti1 = courseToId(tc["course1"]) == "subject0";
const cti2 = courseToId(tc["course2"]) == "subject0";
const cti3 = courseToId(tc["course3"]) == "CS1200";
testResults["courseToId"]["cti0"] = cti0;
testResults["courseToId"]["cti1"] = cti1;
testResults["courseToId"]["cti2"] = cti2;
testResults["courseToId"]["cti3"] = cti3;

/**
 * *--isThisOr--*
 */
var isThisOr = functions["isThisOr"];
testResults["isThisOr"] = {};
const ito0 = isThisOr(tc["or0"]) == false;
const ito1 = isThisOr(tc["or1"]) == true;
const ito2 = isThisOr(tc["or2"]) == false;
const ito3 = isThisOr(tc["or3"]) == false;
const ito4 = isThisOr(tc["or4"]) == false;
const ito5 = isThisOr(tc["or5"]) == true;
testResults["isThisOr"]["ito0"] = ito0;
testResults["isThisOr"]["ito1"] = ito1;
testResults["isThisOr"]["ito2"] = ito2;
testResults["isThisOr"]["ito3"] = ito3;
testResults["isThisOr"]["ito4"] = ito4;
testResults["isThisOr"]["ito5"] = ito5;

/**
 * *--courseNames--*
 */
var courseNames = functions["courseNames"];
// for use later on
var keys = courseNames(courses);
//
testResults["courseNames"] = {};
const cn0 = _.isEqual(courseNames(tc["cn0"]), []);
const cn00 = _.isEqual(courseNames(tc["cn00"]), [NaN]);
const cn1 = _.isEqual(courseNames(tc["cn1"]), ["CS1200"]);
const cn2 = _.isEqual(courseNames(tc["cn2"]), ["TEST0"]);
const cn3 = _.isEqual(courseNames(tc["cn3"]), ["CS2800"]);
const cn4 = _.isEqual(courseNames(tc["cn4"]), ["CS1200", "CS1800", "CS1802"]);
testResults["courseNames"]["cn0"] = cn0;
testResults["courseNames"]["cn00"] = cn00;
testResults["courseNames"]["cn1"] = cn1;
testResults["courseNames"]["cn2"] = cn2;
testResults["courseNames"]["cn3"] = cn3;
testResults["courseNames"]["cn4"] = cn4;

/**
 * *--mapNamesToObjs--*
 */
var mapNamesToObjs = functions["mapNamesToObjs"];
testResults["mapNamesToObjs"] = {};
const mnto0 = _.isEqual(mapNamesToObjs(tc["mnto0"][0], tc["mnto0"][1]), {});
const mnto1 = _.isEqual(
  mapNamesToObjs(tc["mnto1"][0], tc["mnto1"][1]),
  tc["mnto1_expected"]
);
const mnto2 = _.isEqual(
  mapNamesToObjs(tc["mnto2"][0], tc["mnto2"][1]),
  tc["mnto2_expected"]
);
testResults["mapNamesToObjs"]["mnto0"] = mnto0;
testResults["mapNamesToObjs"]["mnto1"] = mnto1;
testResults["mapNamesToObjs"]["mnto2"] = mnto2;

/**
 * *--handleOr--*
 */
var handleOr = functions["handleOr"];
testResults["handleOr"] = {};
const ho0 = handleOr(tc["ho0"][0], tc["ho0"][1]) == "";
const ho1 = handleOr(tc["ho1"][0], tc["ho1"][1]) == "CS2500";
const ho2 = handleOr(tc["ho2"][0], tc["ho2"][1]) == "CS1200";
const ho3 = handleOr(tc["ho3"][0], tc["ho3"][1]) == "CS1200";
const ho4 = _.isEqual(handleOr(tc["ho4"][0], tc["ho4"][1]), [
  "CS1800",
  "CS2510",
]);
const ho5 = handleOr(tc["ho5"][0], tc["ho5"][1]) == "CS1800";
const ho6 = _.isEqual(handleOr(tc["ho6"][0], tc["ho6"][1]), [
  "CS1800",
  "CS2510",
]);
const ho7 = handleOr(tc["ho7"][0], tc["ho7"][1]) == "CS1800";
const ho8 = handleOr(tc["ho8"][0], tc["ho8"][1]) == "";
const ho9 = handleOr(tc["ho9"][0], tc["ho9"][1]) == "";
const ho10 = handleOr(tc["ho10"][0], tc["ho10"][1]) == "";
const ho11 = handleOr(tc["ho11"][0], tc["ho11"][1]) == "";
const ho12 = handleOr(tc["ho12"][0], tc["ho12"][1]) == "";
const ho13 = handleOr(tc["ho13"][0], tc["ho13"][1]) == "";
const ho14 = handleOr(tc["ho14"][0], tc["ho14"][1]) == "";
testResults["handleOr"]["ho0"] = ho0;
testResults["handleOr"]["ho1"] = ho1;
testResults["handleOr"]["ho2"] = ho2;
testResults["handleOr"]["ho3"] = ho3;
testResults["handleOr"]["ho4"] = ho4;
testResults["handleOr"]["ho5"] = ho5;
testResults["handleOr"]["ho6"] = ho6;
testResults["handleOr"]["ho7"] = ho7;
testResults["handleOr"]["ho8"] = ho8;
testResults["handleOr"]["ho9"] = ho9;
testResults["handleOr"]["ho10"] = ho10;
testResults["handleOr"]["ho11"] = ho11;
testResults["handleOr"]["ho12"] = ho12;
testResults["handleOr"]["ho13"] = ho13;
testResults["handleOr"]["ho14"] = ho14;

/**
 * *--handleAnd2--*
 */
var handleAnd2 = functions["handleAnd2"];
testResults["handleAnd2"] = {};
const hat0 = _.isEqual(handleAnd2(tc["hat0"][0], tc["hat0"][1]), []);
const hat1 = _.isEqual(handleAnd2(tc["hat1"][0], tc["hat1"][1]), [
  "CS1200",
  "CS2500",
]);
const hat2 = _.isEqual(handleAnd2(tc["hat2"][0], tc["hat2"][1]), [
  "CS2500",
  "CS1200",
]);
const hat3 = _.isEqual(handleAnd2(tc["hat3"][0], tc["hat3"][1]), [
  "CS2500",
  "CS1800",
]);
const hat4 = _.isEqual(handleAnd2(tc["hat4"][0], tc["hat4"][1]), [
  "CS1800",
  "CS2500",
]);
testResults["handleAnd2"]["hat0"] = hat0;
testResults["handleAnd2"]["hat1"] = hat1;
testResults["handleAnd2"]["hat2"] = hat2;
testResults["handleAnd2"]["hat3"] = hat3;
testResults["handleAnd2"]["hat4"] = hat4;

/**
 * *--wrangleInput--*
 */
var wrangleInput = functions["wrangleInput"];
testResults["wrangleInput"] = {};
const wi0 = _.isEqual(wrangleInput(tc["wi0"][0], tc["wi0"][1]), {});
const wi1 = _.isEqual(wrangleInput(courses, keys), tc["wi1"]);
testResults["wrangleInput"]["wi0"] = wi0;
testResults["wrangleInput"]["wi1"] = wi1;

/**
 * *--getOrder--*
 */
var getOrder = functions["getOrder"];
testResults["getOrder"] = {};
const go0 = _.isEqual(getOrder(tc["go0"]), []);
const go1 = _.isEqual(getOrder(tc["go1"]), tc["go1_result"]);
const go2 = _.isEqual(getOrder(tc["go2"]), tc["go2_result"]);
testResults["wrangleInput"]["go0"] = go0;
testResults["wrangleInput"]["go1"] = go1;
testResults["wrangleInput"]["go2"] = go2;

/**
 * *--mapOrderedToPlan--*
 */
var mapOrderedToPlan = functions["mapOrderedToPlan"];
testResults["mapOrderedToPlan"] = {};
const motp0 = _.isEqual(mapOrderedToPlan(tc["motp0"][0], tc["motp0"][1]), []);
const motp1 = _.isEqual(
  mapOrderedToPlan(tc["motp1"][0], tc["motp1"][1]),
  tc["motp1_result"]
);
testResults["mapOrderedToPlan"]["motp0"] = motp0;
testResults["mapOrderedToPlan"]["motp1"] = motp1;

/**
 * *--createPlan--*
 */
var createPlan = functions["createPlan"];
testResults["createPlan"] = {};
const cp0 = _.isEqual(createPlan(tc["cp0"]), { plan: [] });
const cp1 = _.isEqual(createPlan(tc["cp1"]), tc["cp1_result"]);
testResults["createPlan"]["cp0"] = cp0;
testResults["createPlan"]["cp1"] = cp1;

/**
 * *--main--*
 */
var main = functions["main"];
testResults["main"] = {};
const mainExample = _.isEqual(main(tc["example"]), tc["example_result"]);
const main0 = _.isEqual(main(tc["main0"]), { plan: [{}] });
testResults["main"]["mainExample"] = mainExample;
testResults["main"]["main0"] = main0;

/**
 * Calculates how many tests passed, total amounts of tests, and % success rate (rounded to 2 decimal places, if needed)
 *
 * @param {*} testResults - object of test results
 * @returns string describing the calculated stats on the given results
 */
function calcResults(testResults) {
  var total = 0;
  var totalTrue = 0;

  for (var section of Object.keys(testResults)) {
    var thisSection = testResults[section];
    for (var test of Object.keys(thisSection)) {
      var thisTest = thisSection[test];
      total++;
      if (thisTest) {
        totalTrue++;
      }
    }
  }

  var percentTrue = (totalTrue / total) * 100;
  var percentTrueRounded =
    Math.round((percentTrue + Number.EPSILON) * 100) / 100;

  return (
    totalTrue +
    " out of " +
    total +
    " tests passed. " +
    percentTrueRounded +
    "% success rate."
  );
}
console.log("Test Results:");
console.log(testResults);
console.log(calcResults(testResults));
