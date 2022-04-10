import { createContext, useEffect, useState } from "react";
import dayjs from "dayjs";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [games, setGames] = useState(null);
  const [gamesSched, setGamesSched] = useState(null)
  const [gameId, setGameId] = useState(null);
  const [odds, setOdds] = useState(null);
  const [newsItems, setNewsItems] = useState(null);
  const [standings, setStandings] = useState(null);
  const [date, setDate] = useState(dayjs());
  
  const today = date.format("YYYY-MM-DD");
  const time = Math.floor(date.unix());
  const endTime = time + 86400;

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

  const getOdds = () => {
    console.log("getOdds fired");
    fetch(`/api/get-game-odds?from=${time}&to=${endTime}`)
      .then((res) => res.json())
      .then((data) => setOdds(data.data.events))
      .catch((err) => console.log("err", err));
  };

  const getGames = () => {
    console.log("getGames fired");
    fetch(`https://www.balldontlie.io/api/v1/games?dates[]=${today}`)
      .then((res) => res.json())
      .then((data) => setGames(data.data));
  };

  const getGamesSched = (date) => {
    const start = date.format("YYYY-MM-DD");
    const end = date.add(7, "day").format("YYYY-MM-DD");
        fetch(`https://www.balldontlie.io/api/v1/games?per_page=100&start_date=${start}&end_date=${end}`)
        .then((res) => res.json())
        .then((data) => {
          let newArr = [];
          data.data.forEach((game) => {
            newArr.push(game);
          });
          setGamesSched(newArr);
        })
  }

  // fetching game and odds data on load, everything else on demand
  useEffect(() => {
    getGames();
    getOdds();
  }, [date]);

  // resetting the focused game whenever the date changes
  useEffect(()=> {
    setGameId(null);
  }, [date])

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
        setDate,
        setGameId,
        getNews,
        getStandings,
        getOdds,
        getGames,
        getGamesSched,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
