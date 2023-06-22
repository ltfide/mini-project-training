import React, { useState } from "react";
import { Link } from "react-router-dom";
import thumb from "./../assets/thumb.jpg";
import TagComp from "./TagPost";
import avatarLogo from "./../assets/avatar.png";
import {
   monthShortList,
   stringToDateMonthYear,
   stringToDateMonthYearTime,
} from "../utils/DateUtil";
import { HiDotsHorizontal } from "react-icons/hi";
import { TfiPencil, TfiTrash } from "react-icons/tfi";
import DeleteModal from "./core/DeleteModal";
import Axios from "axios";

const PostCard = ({ post, handlePostDelete }) => {
   const [toggle, setToggle] = useState(false);
   const [toggleDelete, setToggleDelete] = useState(false);

   const handleDeleteClick = (postSlug) => {
      handlePostDelete(postSlug);
   };

   post.created_at = stringToDateMonthYear(post.created_at);
   return (
      <div className="mt-6 border-b-[1px] pb-10">
         <div className="author flex items-center gap-2 text-sm text-gray-500 select-none">
            <img
               src={avatarLogo}
               className="w-7 h-7 bg-slate-500 rounded-full"
            />
            <p className=" text-slate-900">Lutfi</p>
            <p className=" ">| {stringToDateMonthYearTime(post.createdAt)}</p>
            {post.category?.name && (
               <>
                  |
                  <Link
                     className="hover:text-gray-800 cursor-pointer"
                     to={`/c/${post.category?.id}`}
                  >
                     {post.category.name}
                  </Link>
               </>
            )}
         </div>

         <Link
            to={`/p/${post.slug}`}
            className="mt-2 cursor-pointer flex justify-between"
         >
            <div className={1 > 0 ? "w-[77%] " : ""}>
               <h3 className="text-[28px] font-semibold text-slate-800">
                  {post.title}
               </h3>
               <p
                  className="text-slate-600 text-[18px] leading-6"
                  dangerouslySetInnerHTML={{ __html: post?.summary }}
               ></p>
            </div>
            {1 < 0 && (
               <div className="mt-5 bg-slate-500 w-[112px] h-[112px]">
                  <img
                     src={thumb}
                     className="object-cover w-full h-full"
                     alt="thumb"
                  />
               </div>
            )}
         </Link>

         {toggleDelete && (
            <DeleteModal
               message="Are you sure you want to delete this post?"
               closeBtn={() => setToggleDelete(!toggleDelete)}
               deleteBtn={() => handleDeleteClick(post?.slug)}
            />
         )}

         <div className="mt-6 relative ">
            <div className="mt-4 flex items-center flex-wrap justify-between relative">
               <div className="flex gap-2"></div>
               <div className="clicked absolute right-0 border border-transparent p-1">
                  <HiDotsHorizontal
                     className="h-[20px] w-[20px] cursor-pointer text-slate-500 hover:text-slate-800"
                     onClick={() => setToggle(!toggle)}
                  />
               </div>
            </div>
            {toggle && (
               <div className="absolute sidebar items-center right-0 py-2 w-[120px] rounded bg-white shadow select-none">
                  <Link
                     to={`${post.slug}/edit`}
                     className="flex gap-3 hover:bg-slate-200 px-3 py-[6px]"
                  >
                     <TfiPencil className="w-4 h-5" />
                     <p className="text-slate- text-[13px] cursor-pointer">
                        Edit
                     </p>
                  </Link>
                  <button
                     className="flex gap-3 hover:bg-slate-200 px-3 py-[6px] w-full"
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
   );
};

export default PostCard;
