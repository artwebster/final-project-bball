import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components"
import { AccountContext } from "../Hooks/AccountContext";

const Account = () => {
    const { userInfo, setUserInfo } = useContext(AccountContext);
    const history = useHistory();

    if (!userInfo) return <div>Please <Link to={"/signin"}>click here</Link> to sign in.</div>

    const handleSignOut = () => {
        setUserInfo(null);
        history.push("/signin");
    }


    return (
        <Wrapper>
            <h1>Welcome, {userInfo.username}!</h1>
            <Button onClick={handleSignOut}>Sign out</Button>
        </Wrapper>
    )
};

const Wrapper = styled.div`
`;

const Button = styled.button`
    border: 1px solid red;
`;

export default Account;