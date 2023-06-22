import React, { useEffect, useState } from "react";
import axiosClient from "../axios";

const useFetchPost = (slug) => {
   const [post, setPost] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         await axiosClient
            .get(`/posts/${slug}`)
            .then((res) => {
               if (res.status == 200) {
                  setPost(res.data);
                  if (!post) {
                     setTimeout(() => {
                        setIsLoading(false);
                     }, 500);
                  }
               }
            })
            .catch((err) => {
               if (err.response?.status == 404) {
                  setError(true);
               }
            });
      };
      fetchData();
   }, [slug]);

   return [post, isLoading, error];
};

export default useFetchPost;
