import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error-page";
import Students from "../pages/students/Students";
import Classrooms from "../pages/classrooms/Classrooms";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Classrooms />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/students",
    element: <Students />,
    errorElement: <ErrorPage />,
  }
]);