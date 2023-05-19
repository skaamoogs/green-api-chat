import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { Auth } from "./pages/auth/auth";
import { ChatPage } from "./pages/chat-page/chat-page";
import { storageService } from "./service/storage/storage";

export const links = {
  chat: "/",
  auth: "/auth",
};

const routes = [
  { path: links.auth, element: <Auth /> },
  {
    path: links.chat,
    element: <ChatPage />,
    loader: () => storageService().get("currentUser"),
  },
];

const router = createBrowserRouter(routes);

export const App = () => {
  return <RouterProvider router={router} />;
};
