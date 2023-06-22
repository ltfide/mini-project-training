import React, { useEffect, useState } from "react";
import axiosClient from "../axios";

const TopicListNav = () => {
   // const topics = ["Java", "PHP", "C", "HTML", "CPP", "Python"];
   const [topics, setTopics] = useState([]);

   useEffect(() => {
      axiosClient
         .get("/categories")
         .then((res) => setTopics(res.data.categories));
   }, []);

   return (
      <nav className="mt-6 py-4 border-b-[1.5px] mb-10 sticky top-0 bg-white z-20">
         <ul className="flex gap-6 text-slate-500 text-[14px]">
            {topics.map((topic) => (
               <li
                  key={topic?.id}
                  className="hover:text-slate-900 cursor-pointer"
               >
                  {topic?.name}
               </li>
            ))}
         </ul>
      </nav>
   );
};

export default TopicListNav;
