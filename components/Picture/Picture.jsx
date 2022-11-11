import React from "react";
import css from "./Picture.module.css";

export const Picture = ({ src, alt, children }) => {
  return (
    <div className={css.eachpicture}>
      <img src={src} alt={alt} className={css.img}></img>
      <p className={css.txt}>{children}</p>
    </div>
  );
};
