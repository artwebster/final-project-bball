import styled from "styled-components";
import dayjs from "dayjs";

const NewsItem = ({
  articleInfo,
  focus,
  setFocus,
  readingStatus,
  setReadingStatus,
  index,
}) => {
  const pubTime = dayjs(articleInfo.publishedAt).format("h:mm A, ddd MMM D");

  const handleClick = () => {
    if (focus === index) {
      setReadingStatus(true);
    } else {
      setFocus(index);
      setReadingStatus(false);
    }
  };

  if (readingStatus && focus !== index) return null;

  return (
    <Wrapper onClick={handleClick}>
      <PublishTime>{pubTime}</PublishTime>
      <Headline>{articleInfo.title}</Headline>
      {focus === index && (
        <>
          <Subheading>{articleInfo.description}</Subheading>
          <Image src={articleInfo.image} />
        </>
      )}
      {readingStatus && (
        <>
          <p>{articleInfo.content}</p>
          <a href={articleInfo.url}>Read full article...</a>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  text-align: left;
  margin: 0.6rem 0;
  background-color: var(--inbetween-color);
  border-radius: 4px;
  > a {
    margin: 4px;
  }
`;

const PublishTime = styled.div`
  font-size: 0.8rem;
  background-color: var(--news-top);
  border-radius: 4px 4px 0 0;
`;

const Headline = styled.h4`
  font-weight: 500;
  font-size: 1rem;
  padding: 5px 8px;
  background-color: var(--secondary-color);
  border-radius: 0 0 4px 4px;
`;

const Subheading = styled.p`
  font-weight: 300;
`;

const Image = styled.img``;

export default NewsItem;
