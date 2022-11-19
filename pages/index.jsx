import React, { useEffect, useState } from "react";
import { Button } from "/components/Button/Button";
import { Picture } from "/components/Picture/Picture";
import css from "./Index.module.css";
import Head from "next/head";

export default function IndexPage() {
  let [content, setContent] = useState(null);
  let [page, setPage] = useState(0);
  let [value, setValue] = useState("");
  let [description, setDescription] = useState("");

  function handleClick(e) {
    if (!value) {
      return;
    }
    e.preventDefault();
    setContent((lastState) => [
      { url: value, title: description },
      ...(lastState || []),
    ]);
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
    <Head>
      <title>Gallery</title>
    </Head>
      <form className={css.form} onSubmit={handleClick}>
        <Button type="submit">Add new picture</Button>
        <input
          className={css.input}
          placeholder="Введите url картинки"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <input
          className={css.input}
          placeholder="Введите описание картинки"
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            // setDescription(e.target.description.split(",")[1]);
          }}
        />
        <Button type="button" onClick={() => setPage((p) => p + 1)}>
          next
        </Button>
        <Button className={css.page}>{page}</Button>
        <Button type="button" onClick={() => setPage((p) => p - 1)}>
          previous
        </Button>
      </form>
      <div className={css.container}>
        {content && content.slice(page * 10, (page + 1) * 10).map((el, i) => (
          <div className={css.block}>
            <div className={css.picture}>
              <Picture
                key={i}
                src={el.url}
                alt={el.title}
                children={el.title}
              ></Picture>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
