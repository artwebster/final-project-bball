import styled from "styled-components";
import { useHistory } from "react-router-dom";


const Message = ({ setPageDisplay, pageDisplay}) => {

    const history = useHistory();
    
    if (pageDisplay.status === 200 && pageDisplay.ref === "signup") {
        setTimeout(()=> {
            history.push("/account") 
        }, 4000)
    }

    return (
        <Wrapper>
        <MessageDiv>{pageDisplay.message}</MessageDiv>
        {(pageDisplay.status !== 200) && <LinkDiv onClick={() => setPageDisplay(`${pageDisplay.ref}`)}>Try again</LinkDiv>}
        {(pageDisplay.ref === "password" && pageDisplay.status === 200) && <LinkDiv onClick={() => setPageDisplay("signin")}>Back to sign in</LinkDiv>}
        {(pageDisplay.status === 200 && pageDisplay.ref === "signup") && <LinkDiv onClick={() => history.push("/account")}>Or, click here to go now</LinkDiv>}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MessageDiv = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 10px;
`;

const LinkDiv = styled.button`
    z-index: 2;
    font-size: 14px;
    font-weight: 700;
`;

export default Message;