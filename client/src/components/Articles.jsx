import { useState, useEffect } from "react";
import { getNews } from "../service/api";
//import { Box } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

// //components
import Article from "./Article";

const Articles = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const dailyNews = async () => {
      const response = await getNews(page);
      console.log(new Set([...news, ...response.data]));
      setNews([...new Set([...news, ...response.data])]);
    };
    dailyNews();
  }, [page, news]);

  useEffect(() => {
    console.log(news);
  }, [news]);

  // useEffect(() => {
  //   dailyNews();
  // }, []);

  // const dailyNews = async () => {
  //   let response = await getNews();
  //   setNews(response.data);
  // };
  return (
    <InfiniteScroll
      dataLength={news.length}
      next={() => setPage((page) => page + 1)}
      hasMore={true}
    >
      {news.map((article) => (
        <Article article={article} />
      ))}
    </InfiniteScroll>

    // <Box>
    //   {news.map((article) => (
    //     <Article article={article} />
    //   ))}
    // </Box>
  );
};

export default Articles;
