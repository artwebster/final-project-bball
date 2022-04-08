import styled from "styled-components";

const NewsItem = ({articleInfo, focus, setFocus, readingStatus, setReadingStatus, index}) => {
    
    const handleClick = () => {
        if (focus === index) {
            setReadingStatus(true)
        } else {
            setFocus(index);
            setReadingStatus(false)
        }
    }
    
    if (readingStatus && focus !== index) return null;

    return (
        <Wrapper onClick={handleClick}>
            <Headline>{articleInfo.title}</Headline>
            {(focus===index) && (
                <>
            <Subheading>{articleInfo.description}</Subheading>
            <Image src={articleInfo.image} />
            </>
            )}
            {readingStatus && <p>{articleInfo.content}</p>}
        </Wrapper>
    )
};

const Wrapper = styled.button`
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
`;

const Headline = styled.h4``;

const Subheading = styled.p``;

const Image = styled.img``;

export default NewsItem;