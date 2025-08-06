// Kambaz/Assignments/dao.js
import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

// 统一的读/写入口，避免使用本地副本
const getAll = () => Database.assignments;
const saveAll = (next) => { Database.assignments = next; };

/** 查询：某课程的所有作业 */
export const findAssignmentsForCourse = (cid) =>
  getAll().filter((a) => a.course === cid);

/** 查询：按作业 ID */
export const findAssignmentById = (aid) =>
  getAll().find((a) => a._id === aid);

/** 新建作业 */
export const createAssignment = (cid, assignment = {}) => {
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
  saveAll([...getAll(), fresh]);
  return fresh;
};

/** 更新作业 */
export const updateAssignment = (aid, updates) => {
  const next = getAll().map((a) => (a._id === aid ? { ...a, ...updates } : a));
  saveAll(next);
  return { acknowledged: true };
};

/** 删除作业 */
export const deleteAssignment = (aid) => {
  const next = getAll().filter((a) => a._id !== aid);
  saveAll(next);
  return { acknowledged: true };
};
