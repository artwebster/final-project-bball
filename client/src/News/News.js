import { useState, useContext } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import { DataContext } from "../Hooks/DataContext";
import Loading from "../Loading";

const News = () => {
  const { newsItems, getNews } = useContext(DataContext);
  const [focus, setFocus] = useState(null);
  const [readingStatus, setReadingStatus] = useState(false);

  if (!newsItems) {
    getNews();
    return <Loading />;
  }

  return (
    <Wrapper>
      <Container>
        <Title
          onClick={() => {
            setFocus(null);
            setReadingStatus(false);
          }}
        >
          <h1>NEWS</h1>
        </Title>
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
        ))}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

const Container = styled.div`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Title = styled.button``;

export default News;
