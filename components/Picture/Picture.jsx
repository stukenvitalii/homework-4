import css from "./Picture.module.css"

export const Picture = ({src,alt}) => {
    return (
      <img src={src} alt={alt} className={css.img}></img>
    );
}