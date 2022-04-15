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

  const today = date.format("YYYY-MM-DD");
  const time = Math.floor(date.unix());

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

  const getOdds = (gameDate, awayTeam, homeTeam) => {
    console.log("getOdds fired");
    fetch(
      `/api/get-game-odds-new?date=${gameDate}&away=${awayTeam}&home=${homeTeam}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data straight from fetch", data);
        setOdds((state) => ({
          ...state,
          [data.game]: data.odds,
        }));
      });
  };

  const getGames = () => {
    console.log("getGames fired");
    if (date > dayjs()) {
      fetch(`/api/get-games/${today}`)
      .then(res => res.json())
      .then(data => {
        setGames(data.data);
        data.data.forEach((game) => {
          getOdds(
          game.date,
          game.awayTeam,
          game.homeTeam
        )
          });
      })
    } else {
      fetch(`https://www.balldontlie.io/api/v1/games?dates[]=${today}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data.data hit me", data.data);
          let newArr = [];
          data.data.forEach((game) => {
            getOdds(
              game.date.slice(0, 10),
              game.visitor_team.abbreviation,
              game.home_team.abbreviation
            );
            newArr.push({
              bdl_id: game.id,
              date: game.date.slice(0, 10),
              homeTeam: {
                abbr: game.home_team.abbreviation,
                city: game.home_team.city,
                fullName: game.home_team.full_name,
              },
              homeTeamScore: game.home_team_score,
              awayTeamScore: game.visitor_team_score,
              awayTeam: {
                abbr: game.visitor_team.abbreviation,
                city: game.visitor_team.city,
                fullName: game.visitor_team.full_name,
              },
              status: game.status,
              time: game.time,
              id: `${game.date.slice(0, 10)}&${
                game.visitor_team.abbreviation
              }&${game.home_team.abbreviation}`,
            });
          });

          setGames(newArr);
        });
    }
  };

  const getGamesSched = (date) => {
    const start = date.format("YYYY-MM-DD");
    const end = date.add(7, "day").format("YYYY-MM-DD");
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

  // fetching game and odds data on load, everything else on demand
  // and resetting the focused game whenever the date changes
  useEffect(() => {
    getGames();
    // getOdds();
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
