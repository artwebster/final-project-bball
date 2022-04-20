import styled from "styled-components";
import { useState } from "react";
import SignInBox from "./SignInBox";
import SignUpBox from "./SignUpBox";
import ForgotPasswordBox from "./ForgotPasswordBox";
import Message from "./Message";

const SignIn = () => {
  const [pageDisplay, setPageDisplay] = useState("signin");

  return (
    <PageWrapper>
      <ContentWrapper>
        {pageDisplay === "signin" && (
          <SignInBox setPageDisplay={setPageDisplay} />
        )}
        {pageDisplay === "signup" && (
          <SignUpBox setPageDisplay={setPageDisplay} />
        )}
        {pageDisplay === "password" && (
          <ForgotPasswordBox setPageDisplay={setPageDisplay} />
        )}
        {pageDisplay.message && (
          <Message setPageDisplay={setPageDisplay} pageDisplay={pageDisplay} />
        )}
      </ContentWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--secondary-color);
  margin: 4rem 0.5rem;
  padding: 3.5rem;
  width: 30rem;
  height: 27rem;
  border-radius: 0.6rem;
  z-index: 1;
`;

export default SignIn;
