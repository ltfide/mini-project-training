import React from "react";

const ReadingTime = ({ text }) => {
   // Count the number of words in the text
   const wordsPerMinute = 200;
   const wordCount = text.trim().split(/\s+/).length;

   // Calculate the estimated reading time in minutes
   const readingTime = Math.ceil(wordCount / wordsPerMinute);

   console.log(wordCount);

   // Display the estimated reading time in a human-readable format
   let readingTimeStr = "";
   if (readingTime < 1) {
      readingTimeStr = "less than 1 minute";
   } else if (readingTime === 1) {
      readingTimeStr = "1 minute";
   } else {
      readingTimeStr = `${readingTime} minutes`;
   }

   return <span>{readingTimeStr} read</span>;
};

export default ReadingTime;
