import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../views/Home";
import Post from "../views/Post";
import NewPost from "../views/NewPost";
import NotFound from "../views/NotFound";
import DefaultLayout from "./../components/DefaultLayout";
import ScrollToTop from "../utils/ScrollToTop";
import Category from "../views/Category";
import EditPost from "../views/EditPost";

const router = createBrowserRouter([
   {
      path: "/",
      element: <DefaultLayout />,
      children: [
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/p/:postSlug",
            element: <Post />,
         },
         {
            path: "/c/:categorySlug",
            element: <Category />,
         },
      ],
   },
   {
      path: "/new-post",
      element: <NewPost />,
   },
   {
      path: "/:postSlug/edit",
      element: <EditPost />,
   },
   {
      path: "*",
      element: <NotFound />,
   },
]);

export default router;
