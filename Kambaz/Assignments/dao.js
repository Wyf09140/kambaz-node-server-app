import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

let assignments = db.assignments;
const save = (next) => { assignments = next; db.assignments = next; };

export const findAssignmentsForCourse = (cid) =>
  assignments.filter((a) => a.course === cid);

export const findAssignmentById = (aid) =>
  assignments.find((a) => a._id === aid);

export const createAssignment = (cid, assignment) => {
  const fresh = {
    _id: uuidv4(),
    course: cid,
    title: "New Assignment",
    description: "",
    points: 100,
    dueDate: new Date().toISOString().slice(0, 10),
    availableFromDate: null,
    untilDate: null,
    ...assignment,
  };
  const next = [...assignments, fresh];
  save(next);
  return fresh;
};

export const updateAssignment = (aid, updates) => {
  const next = assignments.map((a) =>
    a._id === aid ? { ...a, ...updates } : a
  );
  save(next);
  return { acknowledged: true };
};

export const deleteAssignment = (aid) => {
  const next = assignments.filter((a) => a._id !== aid);
  save(next);
  return { acknowledged: true };
};
