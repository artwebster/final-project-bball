import { createContext, useEffect, useState } from "react";
import dayjs from "dayjs";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [games, setGames] = useState(null);
  const [odds, setOdds] = useState(null);
  const [newsItems, setNewsItems] = useState(null);
  const [standings, setStandings] = useState(null);

  const today = dayjs().format("YYYY-MM-DD");
  const time = Math.floor(dayjs().unix());
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
  }

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

  // fetching game and odds data on load, everything else on demand
  useEffect(()=> {
    getGames();
    getOdds();
  },[])

  return (
    <DataContext.Provider
      value={{ games, odds, newsItems, standings, getNews, getStandings, getOdds, getGames }}
    >
      {children}
    </DataContext.Provider>
  );
};
