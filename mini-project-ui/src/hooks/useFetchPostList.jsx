import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetchPostList = (category) => {
   const [listsOK, setListsOK] = useState(null);

   useEffect(() => {
      const fetchPostList = async () => {
         await axios
            .get(`http://localhost:1234/api/v1/posts/list/${category}`)
            .then((res) => {
               setListsOK(res.data.data);
            });
      };

      fetchPostList();
   }, []);

   return [listsOK];
};

export default useFetchPostList;
