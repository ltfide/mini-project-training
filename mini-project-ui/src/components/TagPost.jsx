import React from "react";
import { Link } from "react-router-dom";

const TagPost = (props) => {
   return (
      <div className="py-1 px-3 bg-slate-100 rounded-full text-slate-800 cursor-pointer hover:bg-slate-200">
         <Link to={`/t/${props.topic.slug}`}>{props.topic.title}</Link>
      </div>
   );
};

export default TagPost;
