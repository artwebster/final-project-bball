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
        }}><h1>NEWS</h1></Title>
        {/* <NewsItemsDiv> */}
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
       {/* </NewsItemsDiv> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.button`
`;

export default News;
