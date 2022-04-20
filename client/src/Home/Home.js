import { useContext } from "react";
import styled from "styled-components";
import Fantasy from "../Fantasy/Fantasy";
import Games from "../Games/Games";
import { AccountContext } from "../Hooks/AccountContext";
import { DataContext } from "../Hooks/DataContext";
import Loading from "../Loading";
import News from "../News/News";

const Home = () => {
  const { screenSize } = useContext(AccountContext);
  const { newsItems, games, getNews } = useContext(DataContext);

  if (screenSize === "small" || screenSize === "medium")
    return (
      <div>
        <Games />
      </div>
    );

  if (!newsItems || !games || !screenSize) {
    getNews();
    return <Loading />;
  }

  return (
    <Wrapper>
      <Container>
        <NewsDiv>
          <News />
        </NewsDiv>
        <GamesDiv>
          <Games />
        </GamesDiv>
        <FantasyDiv>
          <Fantasy refComp={true} />
        </FantasyDiv>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NewsDiv = styled.div`
  max-width: 250px;
  width: 25%;
`;

const GamesDiv = styled.div`
  width: 55%;
`;

const FantasyDiv = styled.div`
  width: 20%;
  max-width: 300px;
`;

export default Home;
