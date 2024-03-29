import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useGames } from "../contexts/GamesProvider";
import GamesList from "../components/GamesList";
import axios from "../axios";
import Loading from "../components/Loading";
const API_KEY = process.env.REACT_APP_GAME_RAWG_API_KEY;
function TrendingDate() {
  const { time } = useParams();
  const history = useHistory();
  const location = useLocation();
  const currentLocation = location.pathname;
  const [limitDate, setLimitDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const pageSize = 20;
  const { games, setGames, page, setPage } = useGames();

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  useEffect(() => {
    setLoading(true);
    const today = new Date();
    let pastDate = new Date();
    switch (time) {
      case "this-week":
        pastDate.setDate(today.getDate() - 7);
        setLimitDate(`${formatDate(pastDate)},${formatDate(today)}`);
        setTitle("Popular this week");
        break;
      case "last-month":
        pastDate.setDate(today.getDate() - 30);
        setLimitDate(`${formatDate(pastDate)},${formatDate(today)}`);
        setTitle("Popular last month");
        break;
      case "last-year":
        const lastYear = today.getFullYear() - 1;
        setLimitDate(`${lastYear}-01-31,${lastYear}-12-31`);
        setTitle("Popular last year");
        break;
      default:
        history.push("/");
        break;
    }
  }, [time, history]);

  useEffect(() => {
    function fetchData() {
      if (limitDate) {
        axios
          .get("/games", {
            params: {
              ordering: "-relevance",
              page,
              page_size: pageSize,
              dates: limitDate,
              key: API_KEY,
            },
          })
          .then((response) => {
            setGames((prev) => [...prev, ...response.data.results]);
          })
          .finally(() => setLoading(false));
      }
    }
    if (loading && page > 1) {
      setPage(1);
    } else {
      fetchData();
    }
  }, [limitDate, page, setGames]);

  useEffect(() => {
    if (!currentLocation) return;

    return () => {
      setGames([]);
    };
  }, [currentLocation, setGames, setPage]);

  if (loading) return <Loading />;

  return (
    <div>
      <div style={{ textAlign: "center", margin: "8px 0" }}>
        <h2>{title}</h2>
      </div>
      <GamesList games={games} />
    </div>
  );
}

export default React.memo(TrendingDate);
