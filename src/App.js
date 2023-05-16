import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { Auth } from "./pages/auth/auth";
import { Chat } from "./pages/chat/chat";

export const links = {
  auth: '/',
  chat: '/chat'
}

const routes = [
  { path: links.auth, element: <Auth /> },
  { path: links.chat, element: <Chat /> },
];

const router = createBrowserRouter(routes);

export const App = () => {
  return <RouterProvider router={router} />;
};
