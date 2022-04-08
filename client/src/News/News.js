import { useEffect, useState } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";

const News = () => {
  const [newsItems, setNewsItems] = useState(null);
  const [focus, setFocus] = useState(null);
  const [readingStatus, setReadingStatus] = useState(false);

  useEffect(() => {
    fetch("/api/get-news-articles")
    .then(res => res.json())
    .then(data => setNewsItems(data.data.articles))
    .catch(err => console.log("error:", err))
  }, []);

  return (
    <Wrapper>
      <Title onClick={()=> {
        setFocus(null)
        setReadingStatus(false)
        }}>News</Title>
      {newsItems ? (
        newsItems.map((article, index) => (
          <NewsItem
            key={article.url}
            articleInfo={article}
            focus={focus}
            setFocus={setFocus}
            index={index}
            readingStatus={readingStatus}
            setReadingStatus={setReadingStatus}
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </Wrapper>
  );
};

const Title = styled.button`
  font-size: 3rem;
  font-weight: 700;
  background: none;
  border: none;
  cursor: pointer;
`;

const Wrapper = styled.div``;

export default News;
