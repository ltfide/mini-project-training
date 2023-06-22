import React, { useEffect, useState } from "react";
import { VscArrowUp } from "react-icons/vsc";

const ScrollToTop = () => {
   const [toggleScrollTop, setToggleScrollTop] = useState(false);

   const handleToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   };

   useEffect(() => {
      window.addEventListener("scroll", () => {
         setToggleScrollTop(window.scrollY > 300);
      });
   }, []);

   return (
      <>
         {toggleScrollTop && (
            <div className="fixed bottom-8 right-24">
               <button
                  className="p-2 rounded-full bg-green-600 hover:bg-green-500 active:bg-green-600"
                  onClick={handleToTop}
               >
                  <VscArrowUp className="text-xl  text-slate-50" />
               </button>
            </div>
         )}
      </>
   );
};

export default ScrollToTop;
