import { useState, useContext } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import { DataContext } from "../Hooks/DataContext";
import Loading from "../Loading";

const News = () => {
  const { newsItems, getNews } = useContext(DataContext)
  const [focus, setFocus] = useState(null);
  const [readingStatus, setReadingStatus] = useState(false);

  if (!newsItems) {
    getNews();
    return <Loading />;
  }

  return (
    <Wrapper>
      <Title onClick={()=> {
        setFocus(null)
        setReadingStatus(false)
        }}>News</Title>
      {newsItems.map((article, index) => (
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
       }
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Title = styled.button`
  font-size: 3rem;
  font-weight: 700;
`;

export default News;
