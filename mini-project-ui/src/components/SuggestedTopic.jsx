import React from "react";
import { useParams } from "react-router-dom";
import { stringToDateMonth } from "../utils/DateUtil";

const SuggestedTopic = ({ list }) => {
   let { postSlug } = useParams();
   return (
      <div
         className={`mt-2 cursor-pointer ${
            postSlug == list.slug ? "bg-slate-200 p-2 rounded" : "px-2"
         }`}
      >
         <div className="flex gap-2 items-center text-slate-600">
            <p>{stringToDateMonth(list.created_at)}</p>
            <p>{list.reading_time}</p>
         </div>
         <h3 className="text-[15px] font-semibold text-slate-700">
            {list.title}
         </h3>
      </div>
   );
};

export default SuggestedTopic;
