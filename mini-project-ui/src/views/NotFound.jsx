import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
   return (
      <>
         <div className="flex items-center justify-center h-screen">
            <div className="text-center">
               <h1 className="text-8xl font-bold text-slate-600">404</h1>
               <p className="text-xl text-gray-600 mt-8">
                  Oops! Looks like the page you're looking for is unavailable.
               </p>
               <Link
                  to={"/"}
                  className="mt-8 inline-block px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg"
               >
                  Back to Home
               </Link>
            </div>
         </div>
      </>
   );
};

export default NotFound;
