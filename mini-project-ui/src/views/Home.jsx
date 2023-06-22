import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ToastSuccess from "../components/core/ToastSuccess";
import PostCard from "../components/PostCard";
import TopicListNav from "../components/TopicListNav";
import axiosClient from "../axios";

const Home = () => {
   const [posts, setPosts] = useState([]);
   const [categories, setCategories] = useState([]);
   const [toast, setToast] = useState(false);

   const [currentPage, setCurrentPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);

   const fetchAllCategories = () => {
      axiosClient.get(`/categories?size=8`).then((res) => {
         setCategories(res.data.categories);
      });
   };

   function fetchPosts() {
      axiosClient.get(`/posts`).then((res) => {
         setPosts(res.data.posts);
      });
   }

   function handleScroll() {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 100 && hasMore) {
         // fetchPosts();
         console.log("OK");
      }
   }

   useEffect(() => {
      // fetchAllData();
      fetchPosts();
      fetchAllCategories();
   }, []);

   useEffect(() => {
      document.title = "Mini Project"; // mengubah title dengan nilai pageTitle
   }, []);

   useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   if (posts.length < 1) {
      return (
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            LOADINGGGG...
         </div>
      );
   }

   return (
      <div>
         {toast && (
            <div
               className={`fixed left-1/2 z-[100] -translate-x-1/2 animate-toast-in-success`}
            >
               <ToastSuccess message="Post deleted successfully" />
            </div>
         )}

         <div className="container mx-auto mt-12">
            <div className="flex justify-between flex-wrap">
               <div className="w-[70%] border-r-[1px] pr-[4rem]">
                  <TopicListNav />
                  {posts.map((post) => (
                     <PostCard post={post} key={post.id} />
                  ))}
               </div>
               <div className="w-[30%] pl-6 sticky top-0 h-[800px]">
                  <div className="mt-6 py-3 border-b-[1px] pb-6">
                     <h1 className="text-base font-semibold text-slate-800">
                        Recommended topics
                     </h1>
                     <div className="mt-4 flex gap-2 flex-wrap">
                        {categories.map((category) => (
                           <Link to={`/c/${category?.slug}`} key={category.id}>
                              <div className="py-2 px-4 bg-slate-100 rounded-full text-slate-800 font-poppins cursor-pointer hover:bg-slate-200">
                                 {category?.name}
                              </div>
                           </Link>
                        ))}
                     </div>
                  </div>
                  <div className="my-6">
                     <h1 className="text-base font-semibold text-slate-800">
                        Recently Viewed
                     </h1>
                     <div className="my-3">
                        <p className="text-slate-800 text-sm">Spring Boot</p>
                        <h3 className="text-black/80 text-base font-bold my-[2px]">
                           Application Context
                        </h3>
                        <span className="text-slate-800 text-sm">
                           29 Mar 23
                        </span>
                        <span className="mx-1 text-slate-800">|</span>
                        <span className="text-slate-800 text-sm">
                           2 min read
                        </span>
                     </div>
                     <div className="my-3">
                        <p className="text-slate-800 text-sm">JWT</p>
                        <h3 className="text-black/80 text-base font-bold my-[2px]">
                           Secure Spring boot with JWT
                        </h3>
                        <span className="text-slate-800 text-sm">
                           10 Jan 23
                        </span>
                        <span className="mx-1 text-slate-800">|</span>
                        <span className="text-slate-800 text-sm">
                           2 min read
                        </span>
                     </div>
                     <div className="my-3">
                        <p className="text-slate-800 text-sm">Spring</p>
                        <h3 className="text-black/80 text-base font-bold my-[2px]">
                           Java Thread
                        </h3>
                        <span className="text-slate-800 text-sm">
                           19 Feb 23
                        </span>
                        <span className="mx-1 text-slate-800">|</span>
                        <span className="text-slate-800 text-sm">
                           3 min read
                        </span>
                     </div>
                     <div className="my-3">
                        <p className="text-slate-800 text-sm">Microservices</p>
                        <h3 className="text-black/80 text-base font-bold my-[2px]">
                           Monitoring Spring Microservices with Zipkin
                        </h3>
                        <span className="text-slate-800 text-sm">
                           29 Sep 23
                        </span>
                        <span className="mx-1 text-slate-800">|</span>
                        <span className="text-slate-800 text-sm">
                           4 min read
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
