import React, { useEffect, useState } from "react";
import avatarLogo from "./../assets/avatar.png";
import { stringToDateMonthYearTime } from "../utils/DateUtil";
import { HiDotsHorizontal } from "react-icons/hi";
import { TfiPencil, TfiTrash } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "./core/DeleteModal";
// import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import hljs from "highlight.js/lib/core";

import axios from "axios";
import java from "highlight.js/lib/languages/java";
import axiosClient from "../axios";

hljs.registerLanguage("java", java);

const PostContent = ({ post }) => {
   const [toggle, setToggle] = useState(false);
   const [toggleDelete, setToggleDelete] = useState(false);
   const navigate = useNavigate();

   if (toggleDelete) {
      document.body.classList.add("overflow-hidden");
   } else {
      document.body.classList.remove("overflow-hidden");
   }

   const handleDeleteClick = () => {
      axiosClient.delete(`/posts/${post?.id}`).then((res) => {
         if (res.status == 200) {
            setToggleDelete(false);
            setTimeout(() => {
               navigate("/");
            }, 1000);
         }
      });
   };

   useEffect(() => {
      const pres = document.querySelectorAll("pre");
      pres.forEach((pre) => hljs.highlightElement(pre));
   }, [post]);

   return (
      <div className="mt-6 py-3 pb-6">
         {toggleDelete && (
            <DeleteModal
               message="Are you sure you want to delete this post?"
               closeBtn={() => setToggleDelete(!toggleDelete)}
               deleteBtn={() => handleDeleteClick(post?.slug)}
            />
         )}
         <div className="flex gap-4 items-center">
            <img
               src={avatarLogo}
               className="w-12 h-12 rounded-full bg-slate-200"
            />
            <div className="post-detail">
               <p className="text-slate-600 text-sm pb-1">Lutfi</p>
               <p className="text-slate-600 text-xs line">
                  {stringToDateMonthYearTime(post?.createdAt)} |
                  <Link
                     to={`/c/${post.category?.slug}`}
                     className="hover:text-slate-900"
                  >
                     {" "}
                     {post.category?.name}
                  </Link>
               </p>
            </div>

            <div className="mr-0 ml-auto relative">
               <HiDotsHorizontal
                  className="h-[20px] w-[20px] cursor-pointer text-slate-500 hover:text-slate-800"
                  onClick={() => setToggle(!toggle)}
               />
               {toggle && (
                  <div className="absolute sidebar items-center right-0 py-2 w-[120px] rounded bg-white shadow select-none">
                     <Link
                        to={`/${post.slug}/edit`}
                        className="flex gap-3 hover:bg-slate-200 px-3 py-[6px]"
                     >
                        <TfiPencil className="w-4 h-5" />
                        <p className="text-slate- text-[13px] cursor-pointer">
                           Edit
                        </p>
                     </Link>
                     <button
                        className="flex gap-3 hover:bg-slate-200 px-3 py-[6px] w-full text-red-600"
                        onClick={() => {
                           setToggleDelete(!toggleDelete);
                           setToggle(!toggle);
                        }}
                     >
                        <TfiTrash className="w-4 h-5" />
                        <p className="text-slate- text-[13px] cursor-pointer">
                           Delete
                        </p>
                     </button>
                  </div>
               )}
            </div>
         </div>

         <div className="mt-8">
            <h1 className="text-3xl text-slate-700 font-bold post-title">
               {post?.title}
            </h1>

            <div className="my-8 leading-7">
               {/* <img src={thumb} alt="java" /> */}

               <div
                  className="my-8  text-[17px] post-content break-words"
                  dangerouslySetInnerHTML={{ __html: post?.content }}
               ></div>
            </div>
         </div>
         <div>
            <p className="text-slate-700 text-sm italic">
               Last Updated: {stringToDateMonthYearTime(post?.updatedAt)}
            </p>
         </div>
      </div>
   );
};

export default PostContent;
