/* This code is exporting various modules from different files in the project. Each line is exporting a
specific module with a specific name, using the `export` keyword followed by `default as` and the
name of the module, and then importing the module from its corresponding file using the `from`
keyword and the file path. These exported modules can then be imported and used in other parts of
the project. */
export { default as Student } from './student/Student';
export { default as Course } from './course/Course';
export { default as Login } from './form page/Login';
export { default as Signup } from './form page/signup';
export { default as User } from './user/User';
export { default as Role } from './user/role';
export { default as AddRole } from './form page/AddRole';
export { default as EditStudentPage } from './student/editForm';
export { default as AdmissionForm } from './register_student/addRegStudent';
export { default as RegStudent } from './register_student/regStudent';
export { default as UpdateReg } from './register_student/updateReg';
export { default as EditForm } from './student/editForm';
export { default as UpdateCourse } from './course/UpdateCourse';
export { default as UpdateUser } from './user/UpdateUser';
export { default as UpdateRole } from './user/UpdateRole';
