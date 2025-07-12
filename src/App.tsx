import BaseLayout from "@/components/layouts/base-layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import HomePage from "@/features/home/pages/home-page";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function App() {
  const router = useMemo(
    () =>
      createBrowserRouter(
        [
          {
            path: "/",
            element: (
              <SidebarProvider>
                <BaseLayout />
              </SidebarProvider>
            ),
            children: [
              {
                index: true,
                element: <HomePage />,
              },
            ],
          },
        ],
        {
          basename: import.meta.env.BASE_URL,
        }
      ),
    []
  );

  return <RouterProvider router={router} />;
}
