import React from "react";

const Button = ({ children, onClick, classList = "" }) => {
   return (
      <button className={`icon icon-expand ${classList}`} onClick={onClick}>
         {children}
      </button>
   );
};

export default Button;
