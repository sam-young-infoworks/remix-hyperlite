import { LoaderFunction, json } from "@remix-run/node";
import { Outlet, useLocation } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request, params }) => {
  return json({});
}


export default () => {
  const location = useLocation();

  if (location.pathname === "/en/") {
    return (
      <div className="min-h-[100vh] container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">landing page</h1>
      </div>
    )
  }
  
  return (
    <Outlet />
  );
}