import MainLayout from "../layouts/Main";
import ErrorBoundary from "../components/organisms/Errors";
import ErrorLayout from "../layouts/ErrorLayout";
import HomePage from "../pages/Home";
import { createBrowserRouter } from "react-router-dom";

const generatePublicRouters = () => {
  return [
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          path: "",
          element: <HomePage />,
        },
      ],
    },
  ];
};

const generateAdminRouters = () => {
  return [
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorBoundary />,
      children: [],
    },
  ];
};

export const generateRouters = () => {
  const publicRoutesData = generatePublicRouters();
  const adminRoutesData = generateAdminRouters();
  const errorRoutesData = [
    {
      path: "*",
      element: <ErrorLayout />,
    },
  ];

  return createBrowserRouter([
    ...publicRoutesData,
    ...adminRoutesData,
    ...errorRoutesData,
  ]);
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [],
  },
  {
    path: "*",
    element: <ErrorLayout />,
  },
]);

export default router;
