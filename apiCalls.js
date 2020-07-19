const fetch = require("node-fetch");
const endpoint =
  "https://challenge.sandboxneu.com/s/" +
  "PMRGIYLUMERDU6ZCMVWWC2LMEI5CE5DFNN3WC3T" +
  "JFZXEA3TPOJ2GQZLBON2GK4TOFZSWI5JCFQRGI5LFEI5" +
  "DCNJZGUYTGMJRHE4SYITTORQWOZJCHIRFEMKFMFZXSIT5FQRG" +
  "QYLTNARDUITZMZEWW5CYKNAS6N3EPF4XSSTPGNIECPJCPU======";

async function getData() {
  var response = await fetch(endpoint, {
    mode: "no-cors",
  });

  console.log(response.json());
  return response.json();
}

async function logData() {
  var data = await getData();
  var globalInput = data;
  var globalCourses = data["courses"];

  console.log(globalInput);
  console.log(globalCourses);
}

/**
 * !Was setting this up to fetch post, but I decided just to submit it using postman (see step 8)
 */

// async function postSolution() {
//   fetch(endpoint, {
//     method: "post",
//     body: JSON.stringify(finalSolution),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((json) => console.log(json));
// }
