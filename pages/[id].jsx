import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import { Picture } from "/components/Picture/Picture";

const BlogItem = ({ data }) => {
  const router = useRouter();

  if (router.isFallback) return <h1>Loading...</h1>;
  return (
    <div>
      <Head>
        <title>Picture</title>
      </Head>
      <Picture src={data.url} alt={data.title} children={data.title}></Picture>
    </div>
  );
};

export default BlogItem;

export async function getStaticProps(context) {
  const photo = await fetch(
    `https://jsonplaceholder.typicode.com/photos/${context.params.id}`
  ).then((res) => res.json());
  return {
    props: {
      data: photo,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths(context) {
  return {
    paths: [{ params: { id: "1" } }],
    fallback: true,
  };
}
