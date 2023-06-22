import React, { useEffect, useState } from "react";
import logo from "./../assets/logo.svg";
import avatarLogo from "./../assets/avatar.png";
import { VscBell, VscBookmark, VscChevronDown } from "react-icons/vsc";
import { FiBookmark, FiEdit } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { BiCategoryAlt } from "react-icons/bi";
import { AiFillTags } from "react-icons/ai";
import { Bookmark, Write } from "../assets/icons";

const Header = () => {
   const location = useLocation();
   const [show, setShow] = useState(true);
   const [searchTerm, setSearchTerm] = useState("");
   const [categoryResults, setCategoryResults] = useState([]);
   const [tagResults, setTagResults] = useState([]);
   const [typingTimeout, setTypingTimeout] = useState(0);

   let temp = 0;
   const handleHeaderScroll = () => {
      let y = window.scrollY;
      if (temp < y && y > 100) {
         setShow(false);
      } else if (temp > y) {
         setShow(true);
      }
      temp = y;
   };

   const handleCloseSearchResult = () => {
      setCategoryResults([]);
      setTagResults([]);
   };

   const fetchCategories = (keyword) => {
      axios
         .get(`http://localhost:1234/api/v1/categories/search?q=${keyword}`)
         .then((res) => {
            if (res.status == 200) {
               setCategoryResults(res.data.data);
            }
         })
         .catch((err) => {
            if (err.response.status == 404) {
               setCategoryResults([]);
            }
         });
   };

   const fetchTags = (keyword) => {
      axios
         .get(`http://localhost:1234/api/v1/tags/search?q=${keyword}`)
         .then((res) => {
            if (res.status == 200) {
               setTagResults(res.data.data);
            }
         })
         .catch((err) => {
            if (err.response.status == 404) {
               setTagResults([]);
            }
         });
   };

   const handleSearch = (event) => {
      const searchTerm = event.target.value.trim();
      setSearchTerm(searchTerm);

      clearTimeout(typingTimeout);
      if (searchTerm != "") {
         setTypingTimeout(
            setTimeout(() => {
               fetchCategories(searchTerm);
               fetchTags(searchTerm);
            }, 500)
         );
      } else {
         handleCloseSearchResult();
      }
   };

   useEffect(() => {
      window.addEventListener("scroll", handleHeaderScroll);
      return () => window.removeEventListener("scroll", handleHeaderScroll);
   }, []);

   return (
      <>
         {show && (
            <div
               className="py-2 px-6 border-b-[1px] fixed-active w-full top-0 left-0 bg-white toBottom"
               id="header"
            >
               <div className="flex justify-between items-center">
                  <div className="flex justify-start gap-4">
                     <Link to={"/"}>
                        <img src={logo} className="w-10" alt="logo" />
                     </Link>
                     <div className="bg-slate-100 rounded-full px-3 w-60 text-sm flex gap-2 items-center">
                        <CiSearch className="h-5 w-5" />
                        <input
                           className="bg-slate-100 outline-none"
                           type="text"
                           name="search"
                           placeholder="Search"
                           autoComplete="off"
                           id="search"
                           onChange={handleSearch}
                        />
                     </div>
                  </div>
                  <div className="flex gap-2 items-center flex-row-reverse">
                     <div className="flex gap-1 items-center cursor-pointer ml-4">
                        <img
                           src={avatarLogo}
                           className="w-9 h-9 rounded-full bg-gray-400"
                        />
                        <VscChevronDown className="text-lg text-zinc-500 cursor-pointer hover:text-zinc-700" />
                     </div>
                     {/* <VscBell className="text-2xl text-zinc-500 cursor-pointer hover:text-zinc-700" />
                      */}
                     {/* <FiBookmark className="text-2xl text-zinc-500 cursor-pointer hover:text-zinc-700 " /> */}
                     <Bookmark
                        w="25px"
                        h="25px"
                        className="cursor-pointer hover:stroke-[#333]"
                     />
                     <Link
                        to={"/new-post"}
                        className="flex gap-2 items-center mr-2 group"
                     >
                        <Write
                           w="25px"
                           h="25px"
                           className="group-hover:stroke-[#333]"
                        />
                        {/* <FiEdit className=" " /> */}
                        <span className="text-[#757575] text-sm group-hover:text-[#333]">
                           Write
                        </span>
                     </Link>
                  </div>
               </div>

               {categoryResults.length != 0 || tagResults.length != 0 ? (
                  <div className="relative">
                     <ul className="absolute top-0 left-0 z-[60] ml-14 mt-2 bg-white py-5 shadow-md rounded w-72">
                        {categoryResults.length != 0 && (
                           <>
                              <div className="px-4 mb-1 text-base">
                                 <h1 className="border-b border-gray-300 pb-1">
                                    CATEGORIES
                                 </h1>
                              </div>
                              {categoryResults.map((category, index) => (
                                 <li className="px-4 py-1" key={index}>
                                    <Link
                                       to={`/c/` + category?.slug}
                                       className="flex items-center gap-2 text-sm"
                                       key={index}
                                       onClick={handleCloseSearchResult}
                                    >
                                       <BiCategoryAlt className="text-gray-700" />
                                       <span>{category.title}</span>
                                    </Link>
                                 </li>
                              ))}
                           </>
                        )}

                        {tagResults.length != 0 && (
                           <>
                              <div className="px-4 mb-1 text-base mt-2">
                                 <h1 className="border-b border-gray-300 pb-1">
                                    TAGS
                                 </h1>
                              </div>
                              {tagResults.map((tag, index) => (
                                 <li className="px-4 py-1" key={index}>
                                    <Link
                                       to={`/t/` + tag?.slug}
                                       className="flex items-center gap-2 text-sm"
                                       key={index}
                                       onClick={handleCloseSearchResult}
                                    >
                                       <AiFillTags className="text-gray-700" />
                                       <span>{tag.title}</span>
                                    </Link>
                                 </li>
                              ))}
                           </>
                        )}
                     </ul>
                     <div
                        className="fixed top-0 right-0 left-0 bottom-0 z-50"
                        onClick={handleCloseSearchResult}
                     ></div>
                  </div>
               ) : (
                  ""
               )}
            </div>
         )}
      </>
   );
};

export default Header;
