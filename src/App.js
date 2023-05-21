import { redirect, RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { Auth } from "./pages/auth/auth";
import { ChatPage } from "./pages/chat-page/chat-page";
import { storageService } from "./service/storage/storage";

export const links = {
  chat: "/",
  auth: "/auth",
};

const routes = [
  {
    path: links.auth,
    element: <Auth />,
    loader: () => {
      const currentUser = storageService().get("currentUser");
      return currentUser;
    },
  },
  {
    path: links.chat,
    element: <ChatPage />,
    loader: () => {
      const currentUser = storageService().get("currentUser");
      if (!currentUser) {
        return redirect(links.auth);
      }
      return currentUser;
    },
  },
];

const router = createBrowserRouter(routes);

export const App = () => {
  return <RouterProvider router={router} />;
};
