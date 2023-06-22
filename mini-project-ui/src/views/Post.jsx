import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostContent from "../components/PostContent";
import SuggestedTopic from "../components/SuggestedTopic";
import PostSkeleton from "../components/util/PostSkeleton";
import "./../css/rich-editor.css";
import NotFound from "./NotFound";
import useFetchPost from "../hooks/useFetchPost";
import axiosClient from "../axios";

const Post = () => {
   let { postSlug } = useParams();
   const navigate = useNavigate();
   const [post, isLoading, error] = useFetchPost(postSlug);

   document.title = post != null ? post.title : "MediumX";

   if (error) {
      return <NotFound />;
   }

   if (isLoading) {
      return <PostSkeleton />;
   }

   return (
      <div className="container mx-auto pt-14 outline-none" id="post">
         <div className="flex justify-between">
            <div className="w-[70%] border-r-[1px] pr-[4rem]">
               <PostContent post={post} />
            </div>
            <div className="w-[30%] pl-6 max-h-screen sticky top-0 scroll"></div>
         </div>
      </div>
   );
};

export default Post;
