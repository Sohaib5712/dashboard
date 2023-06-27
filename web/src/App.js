import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import { Student, Course, Login, Signup, User, Role, AddRole, EditStudentPage, AdmissionForm, RegStudent, UpdateReg, EditForm, UpdateCourse, UpdateUser, UpdateRole } from "./pages";
import { AddForm, CourseForm } from "./components";

const App = () => {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Student /> : <Navigate to="/login" />}
        />
        <Route path="/add" element={<AddForm />} />
        <Route path="/add" element={<AddForm />} />
        <Route path="/std-update/:id" element={<EditForm />} />
        <Route path="/course" element={<Course />} />
        <Route path="/addcourse" element={<CourseForm />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<User />} />
        <Route path="/role" element={<Role />} />
        <Route path="/addrole" element={<AddRole />} />
        <Route path="/edit-student/:id" element={<EditStudentPage />} />
        <Route path="/reg-student" element={<RegStudent />} />
        <Route path="/add-reg-student" element={<AdmissionForm />} />
        <Route path="/reg-update/:id" element={<UpdateReg />} />
        <Route path="/course-update/:id" element={<UpdateCourse />} />
        <Route path="/user-update/:id" element={<UpdateUser/>} />
        <Route path="/role-update/:id" element={<UpdateRole/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
