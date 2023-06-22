import React from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";
import Header from "./Header";

const DefaultLayout = () => {
   return (
      <div>
         <ScrollToTop />
         <Header />
         <main>
            <Outlet />
         </main>
      </div>
   );
};

export default DefaultLayout;
