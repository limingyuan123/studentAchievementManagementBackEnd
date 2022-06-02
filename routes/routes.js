const service = require('../service/service');
//获取学生信息
exports.getStudents = service.getStudents;
//增加学生信息
exports.addStudent = service.addStudent;
//删除学生信息
exports.deleteStudent = service.deleteStudent;
//更新学生信息
exports.updateStudent = service.updateStudent;