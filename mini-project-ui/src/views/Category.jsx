import React, { useEffect, useState } from "react";
import { BiCategoryAlt, BiTime } from "react-icons/bi";
import TagComp from "./../components/TagPost";
import { Link, useLocation, useParams } from "react-router-dom";
import Axios from "axios";
import { stringToDateMonthYearTime } from "../utils/DateUtil";

const Category = () => {
   let location = useLocation();
   const [categoryName, setCategoryName] = useState("");
   const [data, setData] = useState([]);
   const [categories, setCategories] = useState([]);

   let { categorySlug } = useParams();

   const fetchRecommendedCategories = (keyword) => {
      Axios.get(
         `http://localhost:1234/api/v1/categories/recommended?q=${keyword}`
      )
         .then((res) => {
            setCategories(res.data.data);
         })
         .catch((error) => {
            setCategories([]);
         });
   };

   const fetchDataPost = (slug) => {
      Axios.get(`http://localhost:1234/api/v1/posts/category/?q=${slug}`).then(
         (res) => {
            setCategoryName(res.data.data.category);
            setData(res.data.data.posts);

            const title = res.data.data.category;
            fetchRecommendedCategories(title);
         }
      );
   };

   useEffect(() => {
      fetchDataPost(categorySlug);
   }, [location]);

   return (
      // <div className="container mt-20">
      //
      // </div>
      <div>
         <div className="container mx-auto mt-12">
            <div className="flex justify-between flex-wrap">
               <div className="w-[70%] border-r-[1px] pr-[4rem]">
                  <div className="flex items-center gap-2 mt-8 border-b pb-4">
                     <BiCategoryAlt className="w-6 h-6" />
                     <h2 className="text-2xl">{categoryName}</h2>
                  </div>

                  <div className="mt-8">
                     {data.map((post) => (
                        <div className="border-b pb-4 mb-6" key={post.id}>
                           <div className="mt-2 flex gap-2 items-center mb-1">
                              {/* <CiClock2 className="w-5 h-5 text-slate-800" /> */}
                              <BiTime className="w-5 h-5 -mt-[2px]" />
                              <p className="text-slate-800 text-[14px]">
                                 {stringToDateMonthYearTime(post?.created_at)}
                              </p>
                           </div>
                           <div className="content cursor-pointer">
                              <Link to={"/p/" + post?.slug}>
                                 <h1 className="text-[18px] font-semibold text-slate-800">
                                    {post?.title}
                                 </h1>
                                 <p className="text-slate-600 text-[16px]">
                                    {post?.summary}
                                 </p>
                              </Link>
                           </div>
                           <div className="flex gap-2 mt-2">
                              {post.tags.map((tag) => (
                                 <TagComp topic={tag} key={tag.id} />
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="w-[30%] pl-6">
                  {categories?.length != 0 && (
                     <div className="mt-8 py-3 border-b-[1px] pb-6">
                        <h1 className="text-base font-semibold text-slate-800">
                           Recommended categories
                        </h1>
                        <div className="mt-4 flex gap-2 flex-wrap">
                           {categories.map((category) => (
                              <Link
                                 to={`/c/${category?.slug}`}
                                 key={category.id}
                                 onClick={() => fetchDataPost(category?.slug)}
                              >
                                 <div
                                    key={category.id}
                                    className="py-2 px-4 bg-slate-100 rounded-full text-slate-800 cursor-pointer hover:bg-slate-200 font-poppins"
                                 >
                                    {category?.title}
                                    {/* <button
                                    onClick={() =>
                                       fetchDataPost(category?.slug)
                                    }
                                    >
                                    {category?.title}
                                 </button> */}
                                 </div>
                              </Link>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Category;
