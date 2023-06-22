import Axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import logo from "./../assets/logo.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import ToastSuccess from "../components/core/ToastSuccess";
import RichEditorEdit from "../components/RichEditorEdit";
import ScrollToTop from "../components/core/ScrollToTop";
import axiosClient from "../axios";

const EditPost = () => {
   const { postSlug } = useParams();
   const [animate, setAnimate] = useState("scale-0");
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [category, setCategory] = useState(null);
   const [tags, setTags] = useState([]);
   const navigate = useNavigate();
   const [toast, setToast] = useState(false);
   const [id, setId] = useState("");
   const [pageTitle, setPageTitle] = useState("");

   const handleTitle = (e) => {
      setTitle(e.target.value);
   };

   const addCategory = (e) => {
      if (e.key == "Tab") {
         e.preventDefault();
         let filterWhiteSpace = e.target.value.replace(/\s+/g, " ");
         let categoryParam = filterWhiteSpace
            .split(" ")
            .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
            .join(" ");
         if (categoryParam.length > 1) {
            setCategory(categoryParam);
            e.target.value = null;
         }

         document.getElementById("tags").focus();
      }
   };

   const addTag = (e) => {
      if (e.key == "Tab") {
         e.preventDefault();

         let filterWhiteSpace = e.target.value.replace(/\s+/g, " ");
         let tag = filterWhiteSpace
            .split(" ")
            .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
            .join(" ");
         if (tag.length > 1 && !tags.includes(tag)) {
            setTags([...tags, tag]);
            e.target.value = null;
         }
      }
   };

   const removeCategory = () => {
      setCategory("");
   };

   const removeTag = (param) => {
      setTags(tags.filter((tag) => tag != param));
   };

   const handleCloseModal = () => {
      setAnimate("animate-blowup-out-modal");
      setToast(null);
   };

   const payload = {
      id: id,
      title: title,
      content: content,
      category_name: category,
      arr_tags: tags,
   };

   if (animate == "animate-blowup-in-modal") {
      document.querySelector("body").classList.add("overflow-hidden");
   } else {
      document.querySelector("body").classList.remove("overflow-hidden");
   }

   const onSubmit = (ev) => {
      ev.preventDefault();
      axiosClient.put("/posts/edit", payload).then((res) => {
         if (res.status == 200) {
            setToast({
               status: 200,
               message: res.data,
            });
            setTimeout(() => {
               document
                  .querySelector("body")
                  .classList.remove("overflow-hidden");
               navigate("/");
            }, 1000);
         }
      });
   };

   const fetchDataPost = () => {
      axiosClient.get(`/posts/${postSlug}`).then((res) => {
         setId(res.data.data.id);
         setTitle(res.data.data.title);
         setContent(res.data.data.content);
         setCategory(res.data.data.category?.title);
         setPageTitle(res.data.data.title);
         const tagsParam = [];
         res.data.data.tags.map((val) => tagsParam.push(val.title));
         setTags(tagsParam);
      });
   };

   useEffect(() => {
      fetchDataPost();
   }, []);

   useEffect(() => {
      document.title = "Editing " + pageTitle;
   }, [pageTitle]);

   return (
      <div className="bg-slate-100 px-4 sm:px-10 md:px-20 py-4 min-h-screen relative">
         <div className="flex justify-between items-center relative mb-1">
            <Link to={"/"}>
               <img src={logo} className="w-10" alt="logo" />
            </Link>
            <button
               className="px-6 py-2 bg-green-600 text-slate-50 rounded-full"
               onClick={() => setAnimate("animate-blowup-in-modal")}
            >
               Save
            </button>
         </div>

         <div className="max-w-4xl mx-auto mt-6 sm:mt-4 md:mt-0">
            <form onSubmit={onSubmit}>
               <div id="title">
                  <input
                     className="w-full px-4 py-2 outline-none text-3xl bg-slate-100"
                     type="text"
                     value={title}
                     placeholder="Title"
                     onChange={handleTitle}
                  />
               </div>
               <RichEditorEdit handleInput={setContent} content={content} />
               <div
                  className={` bg-slate-100 absolute top-0 left-0 bottom-0 right-0 z-20 ${animate}`}
               >
                  <div className="absolute top-0 right-0 mt-10 mr-2 sm:mr-10 md:mr-32 lg:mr-80">
                     <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="defaultModal"
                        onClick={handleCloseModal}
                     >
                        <FiX className="w-6 h-6 text-slate-600" />
                     </button>
                  </div>

                  {toast && (
                     <div
                        className={`absolute left-1/2 z-20 -translate-x-1/2 animate-toast-in-success`}
                     >
                        <ToastSuccess message={toast?.message} />
                     </div>
                  )}

                  <div className={`mx-auto max-w-4xl mt-20`}>
                     <div className="w-full px-4 sm:w-3/4 md:px-0 md:w-1/2 mx-auto">
                        <label
                           htmlFor="category"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                           Category
                        </label>
                        <div className="content-tags">
                           <ul>
                              {category && (
                                 <li className="flex gap-2 items-center">
                                    {category}
                                    <FiX
                                       className="cursor-pointer"
                                       onClick={removeCategory}
                                    />
                                 </li>
                              )}
                              <input
                                 type="text"
                                 id="category"
                                 onKeyDown={addCategory}
                                 placeholder="Add a category"
                                 autoComplete="off"
                              />
                           </ul>
                        </div>
                     </div>
                     <div className="mt-10">
                        <button className="px-6 py-2 mx-auto block bg-green-600 text-slate-50 rounded-full">
                           Save
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>

         <ScrollToTop />
      </div>
   );
};

export default EditPost;
