import { useEffect, useState } from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import "./css/styles.css";
import Post from "./views/Post";
import Editor from "./views/Editor";
import Test from "./views/Test";

let ok = 0;

function App() {
   useEffect(() => {
      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   const handleScroll = () => {
      const header = document.querySelector("#header");
      let currentScrollPos = window.scrollY;
      if (ok > currentScrollPos) {
         header.style.top = "0";
      } else {
         header.style.top = "-5rem";
      }
      ok = currentScrollPos;
   };

   return (
      <div className="app">
         <Router>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/post" element={<Post />} />
               <Route path="/editor" element={<Editor />} />
               <Route path="/test" element={<Test />} />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
