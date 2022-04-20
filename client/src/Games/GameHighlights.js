import { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../Hooks/DataContext";

const GameHighlights = ({gameInfo}) => {
    const { games } = useContext(DataContext);
    // console.log("games", games);
    // console.log("gameInfo", gameInfo);

    if (!gameInfo.ytLink) return <ErrorDiv>No highlights available at the moment, please check back later</ErrorDiv>
    
    const youtubeLink = `https://www.youtube.com/embed/${gameInfo.ytLink}`
    
    return (
        <Wrapper>
        <VideoDiv><Video src={youtubeLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></Video></VideoDiv>
        <Description>{gameInfo.ytDesc}</Description>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    width: 100%;
    max-width: 750px;
    margin: 0 auto;
`;

const Description = styled.div`
    font-size: 0.9rem;
`;

const VideoDiv = styled.div`
    height: 0;
    margin: 1rem auto;
    z-index: 1;
    position: relative;
    padding-bottom: 56.25%;
    display: block;
    overflow: hidden;
`;

const Video = styled.iframe`
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    position: absolute;
`;
// const VideoDiv = styled.div`
//     width: 100%;
//     height: auto;
//     /* position: relative; */

//     > iframe {
//         width: 100%;
//         height: auto;
//     }
// `;

const ErrorDiv = styled.div`
    padding: 2rem;
`;

export default GameHighlights;