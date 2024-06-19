# Course Prereqs Problem

You are an incoming student at Northeastern University, and you want to build your plan of study. To find out what classes you need to take for your major, you visit the registrar's website. But there's one problem – you aren't sure when to take these courses!

However, there are some things you do know. Your major requires some courses to take, in order to graduate. Each of these courses can be identified by their unique subject and classId properties. For MATH 3081, the subject is "MATH", and the classId is "3081". Additionally, each course may have prereqs – indicating a course's prerequisites.

Courses that do not have prereqs have no restrictions and can be taken whenever. However, this is not the case for those with prereqs. Courses with prereqs can only be taken in semesters after all prerequisite courses have been taken. In other words, if a course has a prereq, the class corresponding to that prereq must appear earlier in the list than the original class.

Additionally, there are two kinds of 'requisites — "and" type, and "or" type. The first indicates that all of the 'requisites must be satisfied, while the latter only requires that some of the 'requisites be fulfilled. Note that 'reqs may be nested (ie, an "or" may contain several "and"s).

Write a program that will, given a major containing a list of required courses, produce a list of those courses such that each course may be validly taken in order. If no such solution exists, send "no solution".

You may assume that each course in the provided input is unique, and that each course must also appear exactly once in the output (except of course in the case of no solution). Additionally, we do not care how you go about tiebreaking – only that the prerequisite invariant holds for every course in the list. For example if a course has an "or" of two courses, it does not matter which one you use to satisfy the prerequisite in your solution.
