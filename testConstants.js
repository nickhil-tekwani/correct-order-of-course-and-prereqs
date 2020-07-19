/**
 * *--courseToId--*
 */
const course0 = {
  subject: "",
  classId: "",
  prereqs: {
    type: "or",
    values: [],
  },
};
const course1 = {
  subject: "subject",
  classId: 0000,
  prereqs: {
    type: "or",
    values: [],
  },
};
const course2 = {
  subject: "subject",
  classId: 0,
  prereqs: {
    type: "or",
    values: [],
  },
};
const course3 = {
  subject: "CS",
  classId: 1200,
  prereqs: {
    type: "and",
    values: [],
  },
};

/**
 * *--isThisOr--*
 */
const or0 = {
  type: "",
};
const or1 = {
  type: "or",
};
const or2 = {
  type: "and",
};
const or3 = {
  type: "orand",
};
const or4 = {
  type: "123",
};
const or5 = {
  type: "or",
  values: [
    {
      classId: 1800,
      subject: "CS",
    },
    {
      classId: 1365,
      subject: "MATH",
    },
  ],
};

/**
 * *--courseNames--*
 */
const cn0 = [];
const cn00 = [{}];
const cn1 = [
  {
    subject: "CS",
    classId: 1200,
    prereqs: {
      type: "and",
      values: [],
    },
  },
];
const cn2 = [
  {
    subject: "TEST",
    classId: 0000,
    prereqs: {
      type: "or",
      values: [],
    },
  },
];
const cn3 = [
  {
    subject: "CS",
    classId: 2800,
    prereqs: {
      type: "and",
      values: [
        {
          type: "or",
          values: [
            {
              classId: 1800,
              subject: "CS",
            },
            {
              classId: 1365,
              subject: "MATH",
            },
          ],
        },
        {
          classId: 2500,
          subject: "CS",
        },
      ],
    },
  },
];
const cn4 = [
  {
    subject: "CS",
    classId: 1200,
    prereqs: {
      type: "and",
      values: [],
    },
  },
  {
    subject: "CS",
    classId: 1800,
    prereqs: {
      type: "and",
      values: [],
    },
  },
  {
    subject: "CS",
    classId: 1802,
    prereqs: {
      type: "and",
      values: [],
    },
  },
];

/**
 * *--mapNamesToObjs--*
 */
const mnto0 = [[], []];
const mnto1 = [
  ["name1", "name2"],
  [{ object1: "object1" }, { object2: "object2" }],
];
const mnto1_expected = {
  name1: { object1: "object1" },
  name2: { object2: "object2" },
};
const mnto2 = [
  ["CS1200", "CS2510"],
  [
    {
      subject: "CS",
      classId: 1200,
      prereqs: {
        type: "and",
        values: [],
      },
    },
    {
      subject: "CS",
      classId: 2510,
      prereqs: {
        type: "and",
        values: [
          {
            classId: 2500,
            subject: "CS",
          },
        ],
      },
    },
  ],
];
const mnto2_expected = {
  CS1200: {
    subject: "CS",
    classId: 1200,
    prereqs: {
      type: "and",
      values: [],
    },
  },
  CS2510: {
    subject: "CS",
    classId: 2510,
    prereqs: {
      type: "and",
      values: [
        {
          classId: 2500,
          subject: "CS",
        },
      ],
    },
  },
};

/**
 * *--handleOr--*
 */
const ho0 = [
  {
    type: "or",
    values: [],
  },
  [],
];

const ho1 = [
  {
    type: "or",
    values: [
      { classId: 2500, subject: "CS" },
      { classId: 1200, subject: "CS" },
    ],
  },
  ["CS1200", "CS2500"],
];
// expected = "CS2500"

const ho2 = [
  {
    type: "or",
    values: [
      { classId: 1200, subject: "CS" },
      { classId: 2500, subject: "CS" },
    ],
  },
  ["CS1200", "CS2500"],
];
// expected = "CS1200"

const ho3 = [
  {
    type: "or",
    values: [
      {
        type: "and",
        values: [
          {
            classId: 2510,
            subject: "CS",
          },
          {
            classId: 1800,
            subject: "CS",
          },
        ],
      },
      { classId: 1200, subject: "CS" },
    ],
  },
  ["CS2510", "CS1800", "CS1200"],
];
// expected = "CS1200"

const ho4 = [
  {
    type: "or",
    values: [
      {
        type: "and",
        values: [
          {
            classId: 1800,
            subject: "CS",
          },
          {
            classId: 2510,
            subject: "CS",
          },
        ],
      },
      {
        type: "and",
        values: [
          {
            classId: 2510,
            subject: "CS",
          },
          {
            classId: 1800,
            subject: "CS",
          },
        ],
      },
    ],
  },
  ["CS2510", "CS1800"],
];
// expected: ["CS1800", "CS2510"]

const ho5 = [
  {
    type: "or",
    values: [
      {
        type: "or",
        values: [
          {
            classId: 1800,
            subject: "CS",
          },
          {
            classId: 2510,
            subject: "CS",
          },
        ],
      },
      {
        type: "and",
        values: [
          {
            classId: 2510,
            subject: "CS",
          },
          {
            classId: 1800,
            subject: "CS",
          },
        ],
      },
    ],
  },
  ["CS2510", "CS1800"],
];
// expected = "CS1800"

const ho6 = [
  {
    type: "or",
    values: [
      {
        type: "and",
        values: [
          {
            classId: 1800,
            subject: "CS",
          },
          {
            classId: 2510,
            subject: "CS",
          },
        ],
      },
      {
        type: "or",
        values: [
          {
            classId: 2510,
            subject: "CS",
          },
          {
            classId: 1800,
            subject: "CS",
          },
        ],
      },
    ],
  },
  ["CS2510", "CS1800"],
];
// expected: ["CS1800", "CS2510"]

const ho7 = [
  {
    type: "or",
    values: [
      {
        type: "or",
        values: [
          {
            classId: 1800,
            subject: "CS",
          },
          {
            classId: 2510,
            subject: "CS",
          },
        ],
      },
      {
        type: "or",
        values: [
          {
            classId: 2510,
            subject: "CS",
          },
          {
            classId: 1800,
            subject: "CS",
          },
        ],
      },
    ],
  },
  ["CS2510", "CS1800"],
];
// expected = "CS1800"

// all the edge cases, but with no keys to test default value
const ho8 = [ho1[0], [""]];
const ho9 = [ho2[0], [""]];
const ho10 = [ho3[0], [""]];
const ho11 = [ho4[0], [""]];
const ho12 = [ho5[0], [""]];
const ho13 = [ho6[0], [""]];
const ho14 = [ho7[0], [""]];
// ho8-14 expected = ""

/**
 * *--handleAnd2--*
 */
const hat0 = [[{}, {}], []];
// []

const hat1 = [
  [
    { classId: 1200, subject: "CS" },
    { classId: 2500, subject: "CS" },
  ],
  ["CS1200", "CS2500"],
];
// ["CS1200", "CS2500"]

const hat2 = [
  [
    { classId: 2500, subject: "CS" },
    { classId: 1200, subject: "CS" },
  ],
  ["CS1200", "CS2500"],
];
// ["CS2500", "CS1200"]

const hat3 = [
  [
    {
      type: "or",
      values: [
        { classId: 2500, subject: "CS" },
        { classId: 1200, subject: "CS" },
      ],
    },
    { classId: 1800, subject: "CS" },
  ],
  ["CS1200", "CS2500", "CS1800"],
];
// ["CS2500", "CS1800"]

const hat4 = [
  [
    { classId: 1800, subject: "CS" },
    {
      type: "or",
      values: [
        { classId: 2500, subject: "CS" },
        { classId: 1200, subject: "CS" },
      ],
    },
  ],
  ["CS1200", "CS2500", "CS1800"],
];
// ["CS1800", "CS2500"]

/**
 * *--wrangleInput--*
 */
const wi0 = [{}, [""]];
const wi1 = {
  CS1200: [],
  CS1800: [],
  CS1802: [],
  CS2500: [],
  CS2501: [],
  CS2510: ["CS2500"],
  CS2511: [],
  CS2800: ["CS1800", "CS2500"],
  CS2801: [],
  MATH1341: [],
  MATH1342: [],
  MATH3081: ["MATH1342"],
  EECE2160: ["CS3500"],
  PHYS1151: ["MATH1341"],
  PHYS1152: [],
  PHYS1153: [],
  PHYS1155: ["PHYS1151", "MATH1342"],
  PHYS1156: [],
  PHYS1157: [],
  ENGW1111: [],
  CS1990: [],
  HIST1130: [],
  MATH2321: [],
  HONR1310: [],
  CS3000: ["EECE2160"],
  CS3500: ["CS2510"],
  CS3650: ["CS2510"],
  CS3800: ["CS2510"],
  MATH2331: ["MATH1342"],
  PHIL1145: [],
  CS1210: ["CS2510"],
  CS3700: ["CS2510"],
  CS4400: ["CS3500", "CS3000"],
  CS4500: ["CS3500", "ENGW1111"],
  THTR1170: [],
  CS4410: ["CS4400"],
  ENGW3315: ["ENGW1111"],
  CS3001: [],
};

/**
 * *--getOrder--*
 */
const go0 = {};
const go1 = wi1;
const go1_result = [
  "CS1200",
  "CS1800",
  "CS1802",
  "CS2500",
  "CS2501",
  "CS2510",
  "CS2511",
  "CS2800",
  "CS2801",
  "MATH1341",
  "MATH1342",
  "MATH3081",
  "PHYS1151",
  "PHYS1152",
  "PHYS1153",
  "PHYS1155",
  "PHYS1156",
  "PHYS1157",
  "ENGW1111",
  "CS1990",
  "HIST1130",
  "MATH2321",
  "HONR1310",
  "CS3500",
  "CS3650",
  "CS3800",
  "MATH2331",
  "PHIL1145",
  "CS1210",
  "CS3700",
  "CS4500",
  "THTR1170",
  "ENGW3315",
  "CS3001",
  "EECE2160",
  "CS3000",
  "CS4400",
  "CS4410",
];

const go2 = {
  a: [],
  b: ["c"],
  c: ["a"],
  d: ["c", "b"],
};
const go2_result = ["a", "c", "b", "d"];

/**
 * *--mapOrderedToPlan--*
 */
const motp0 = [[], {}];
const motp1 = [
  ["a", "b"],
  {
    b: { name: "b" },
    a: { name: "a" },
  },
];
const motp1_result = [{ name: "a" }, { name: "b" }];

/**
 * *--createPlan--*
 */
const cp0 = [];
const cp1 = [{ name: "a" }, { name: "b" }];
const cp1_result = {
  plan: cp1,
};

/**
 * *--main--*
 */
// example given in problem assignment
const main0 = {
  courses: [{}],
};
const example = {
  courses: [
    {
      subject: "CS",
      classId: 2500,
      prereqs: {
        type: "and",
        values: [],
      },
    },
    {
      subject: "CS",
      classId: 1800,
      prereqs: {
        type: "and",
        values: [],
      },
    },
    {
      subject: "CS",
      classId: 3500,
      prereqs: {
        type: "or",
        values: [
          {
            subject: "CS",
            classId: 2510,
          },
          {
            subject: "EECE",
            classId: 2560,
          },
        ],
      },
    },
    {
      subject: "CS",
      classId: 2510,
      prereqs: {
        type: "and",
        values: [
          {
            subject: "CS",
            classId: 2500,
          },
        ],
      },
    },
  ],
};
const example_result = {
  plan: [
    {
      subject: "CS",
      classId: 2500,
      prereqs: {
        type: "and",
        values: [],
      },
    },
    {
      subject: "CS",
      classId: 1800,
      prereqs: {
        type: "and",
        values: [],
      },
    },
    {
      subject: "CS",
      classId: 2510,
      prereqs: {
        type: "and",
        values: [
          {
            subject: "CS",
            classId: 2500,
          },
        ],
      },
    },
    {
      subject: "CS",
      classId: 3500,
      prereqs: {
        type: "or",
        values: [
          {
            subject: "CS",
            classId: 2510,
          },
          {
            subject: "EECE",
            classId: 2560,
          },
        ],
      },
    },
  ],
};

module.exports = {
  course0: course0,
  course1: course1,
  course2: course2,
  course3: course3,
  or0: or0,
  or1: or1,
  or2: or2,
  or3: or3,
  or4: or4,
  or5: or5,
  cn0: cn0,
  cn00: cn00,
  cn1: cn1,
  cn2: cn2,
  cn3: cn3,
  cn4: cn4,
  mnto0: mnto0,
  mnto1: mnto1,
  mnto2: mnto2,
  mnto1_expected: mnto1_expected,
  mnto2_expected: mnto2_expected,
  ho0: ho0,
  ho1: ho1,
  ho2: ho2,
  ho3: ho3,
  ho4: ho4,
  ho5: ho5,
  ho6: ho6,
  ho7: ho7,
  ho8: ho8,
  ho9: ho9,
  ho10: ho10,
  ho11: ho11,
  ho12: ho12,
  ho13: ho13,
  ho14: ho14,
  hat0: hat0,
  hat1: hat1,
  hat2: hat2,
  hat3: hat3,
  hat4: hat4,
  wi0: wi0,
  wi1: wi1,
  go0: go0,
  go1: go1,
  go1_result: go1_result,
  motp0: motp0,
  motp1: motp1,
  motp1_result: motp1_result,
  cp0: cp0,
  cp1: cp1,
  cp1_result: cp1_result,
  go2: go2,
  go2_result: go2_result,
  example: example,
  example_result: example_result,
  main0: main0,
};
