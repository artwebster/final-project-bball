import { createContext, useEffect, useState } from "react";
import dayjs from "dayjs";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [games, setGames] = useState(null);
  const [gamesSched, setGamesSched] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [odds, setOdds] = useState(null);
  const [newsItems, setNewsItems] = useState(null);
  const [standings, setStandings] = useState(null);
  const [date, setDate] = useState(dayjs());
  const [liveScores, setLiveScores] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [leaderboardY, setLeaderboardY] = useState(null);

  const today = date.format("YYYY-MM-DD");

  const getLeaderboard = () => {
    fetch("/api/get-leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setLeaderboard(data.data.scoreBoard);
        setLeaderboardY(data.data.scoreBoardY);
      });
  };

  const getNews = () => {
    fetch("/api/get-news-articles")
      .then((res) => res.json())
      .then((data) => setNewsItems(data.data.articles))
      .catch((err) => console.log("error:", err));
  };

  const getStandings = () => {
    fetch("/api/get-standings")
      .then((res) => res.json())
      .then((data) => setStandings(data.data))
      .catch((err) => console.log("error:", err));
  };

  const getOdds = (gameId) => {
    console.log("getOdds fired");
    fetch(`/api/get-game-odds/${gameId}`)
      .then((res) => res.json())
      .then((data) => {
        setOdds((state) => ({
          ...state,
          [data.game]: data.odds,
        }));
      });
  };

  const getGames = () => {
    console.log("getGames fired");
    fetch(`/api/get-games/${today}`)
      .then((res) => res.json())
      .then((data) => {
        const games = data.data;
        const sortedGames = games.sort(
          (a, b) =>
            Number(a.startTime.slice(0, 2)) - Number(b.startTime.slice(0, 2))
        );
        setGames(sortedGames);
      });
  };

  const getLiveScores = () => {
    if (today !== dayjs().format("YYYY-MM-DD")) return;
    console.log("getLiveScores fired");
    fetch("/api/get-live-scores")
      .then((res) => res.json())
      .then((data) => setLiveScores(data.data));
  };

  const getGamesSched = (date) => {
    console.log("getGamesSched fired");
    const start = date.format("YYYY-MM-DD");
    const end = date.add(7, "day").format("YYYY-MM-DD");
    console.log(start);
    console.log(end);
    fetch(
      `https://www.balldontlie.io/api/v1/games?per_page=100&start_date=${start}&end_date=${end}`
    )
      .then((res) => res.json())
      .then((data) => {
        let newArr = [];
        data.data.forEach((game) => {
          newArr.push(game);
        });
        setGamesSched(newArr);
      });
  };

  // fetching (live) game data on load, everything else on demand
  // and resetting the focused game whenever the date changes
  useEffect(() => {
    getGames();
    getLiveScores();
    setGameId(null);
  }, [date]);

  return (
    <DataContext.Provider
      value={{
        games,
        gamesSched,
        gameId,
        odds,
        newsItems,
        standings,
        date,
        liveScores,
        leaderboard,
        leaderboardY,
        setDate,
        setGameId,
        getNews,
        getStandings,
        getOdds,
        getGames,
        getGamesSched,
        getLeaderboard,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
