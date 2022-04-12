import styled from "styled-components";

const ForgotPasswordBox = ({ setPageDisplay }) => {

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const email = ev.target[0].value
    fetch("/api/check-email", {
      method: "POST",
      body: JSON.stringify({email}),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(data => setPageDisplay({message: data.message, ref: "password", status: data.status}))
    .catch(err => console.log("error:", err))
  }

  return (
    <>
      <Title>RESET PASSWORD</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="email" name={"email"} placeholder={"Email"} required />
        <PasswordButton type="submit">Reset your password</PasswordButton>
      </Form>
      <Line />
      <SignUpLine>
        <button onClick={() => setPageDisplay("signin")}>
          Back to sign in
        </button>
      </SignUpLine>
    </>
  );
};

const Title = styled.p`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 0;
  z-index: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  > * {
    margin: 10px 0;
  }
`;

const Input = styled.input`
  font-size: 16px;
  opacity: 0.5;
  /* width: 250px; */
`;

const Line = styled.div`
margin: 10px 0;
  height: 0;
  margin: 10px 0;
  /* width: 320px; */
  border-bottom: 1px solid white;
`;

const PasswordButton = styled.button`
  display: inline-block;
  background-color: black;
  border: none;
  border-radius: 3px;
  color: white;
  padding: 0.8rem 1.7rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: 0.3s ease;
  cursor: pointer;
  &:hover {
    background: slateblue;
  }
`;

const SignUpLine = styled.div`
margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  z-index: 2;
  > button {
    font-size: 14px;
    font-weight: 700;
    color: white;
    /* outline: none; */
    background: none;
    border: none;
    cursor: pointer;
  }
`;

export default ForgotPasswordBox;