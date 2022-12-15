import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AddBook } from '../features/AddBook'
import { RequestBook } from '../features/RequestBook'
import { RequestList } from '../features/RequestList'

const App = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <RequestBook /> },
      { path: '/add-book', element: <AddBook/> },
      { path: '/requests', element: <RequestList/> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
