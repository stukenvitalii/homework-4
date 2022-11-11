import React, { useEffect, useState } from "react";
import { Button } from "/components/Button/Button";
import { Picture } from "/components/Picture/Picture";
import { Title } from "/components/Title/Title";
import css from "./Index.module.css";

export default function IndexPage() {
  let [content, setContent] = useState([]);
  let [page, setPage] = useState(0);
  let [value, setValue] = useState("");
  let [description,setDescription] = useState("");

  function handleClick(e) {
    if (!value) {
      return;
    }
    e.preventDefault();
    setContent((lastState) => [{ url: value, description: description},  ...(lastState || [])]);
    setDescription("");
    setValue("");
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((obj) => setContent(obj));
  }, []);

  // console.log(content);
  return (
    <div className={css.header}>
      <form onSubmit={handleClick}>
        <Button type="submit">Add new picture(url,description)</Button>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            // setDescription(e.target.description.split(",")[1]);            
            }
          }
        />
        <input
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.description);
            // setDescription(e.target.description.split(",")[1]);            
            }
          }
        />
        <Button type="button" onClick={() => setPage((p) => p + 1)}>
          next
        </Button>
        <span>{page}</span>
        <Button type="button" onClick={() => setPage((p) => p - 1)}>
          previous
        </Button>
      </form>
      <div className={css.container}>
        {content.slice(page * 10, (page + 1) * 10).map((el, i) => (
          <div className={css.block}>
            <div className={css.picture}>
            <Picture key={i} src={el.url} alt={el.title}></Picture>
            </div>
            <div className={css.title_}>
              <Title>{el.title}</Title>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
