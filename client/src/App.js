import { BrowserRouter, Route, Switch } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

import Header from "./Header/Header";
import Games from "./Games/Games";
import News from "./News/News";
import Schedule from "./Schedule/Schedule";
import Standings from "./Standings/Standings";
import SignIn from "./SignIn/SignIn";
import Account from "./Account/Account";
import Fantasy from "./Fantasy/Fantasy";
import Pickem from "./Fantasy/Pickem/Pickem";
import { useContext } from "react";
import { AccountContext } from "./Hooks/AccountContext";
import BatchImp from "./batchImp";

const App = () => {

const { size } = useContext(AccountContext)
console.log("mobile size???", size);


  return (
    <PageWrapper>
      <BrowserRouter>
        <Container>
          <GlobalStyles />
          <Header />
          <Switch>
            <Route exact path="/news">
              <News />
            </Route>
            <Route exact path="/schedule">
              <Schedule />
            </Route>
            <Route exact path="/standings">
              <Standings />
            </Route>
            <Route exact path="/fantasy">
              <Fantasy />
            </Route>
            <Route exact path="/pickem">
              <Pickem />
            </Route>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/account">
              <Account />
            </Route>
            <Route exact path="/batchimp">
              <BatchImp />
            </Route>
            <Route path="/">
              <Games />
            </Route>
          </Switch>
        </Container>
      </BrowserRouter>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* width: 35rem; */
  /* height: 50rem; */
  /* border: 1px solid red; */
`;

export default App;
