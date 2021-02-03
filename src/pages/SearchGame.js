import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../axios";
import { useGames } from "../contexts/GamesProvider";
import GamesList from "../components/GamesList";
import Loading from "../components/Loading";

const API_KEY = process.env.REACT_APP_GAME_RAWG_API_KEY;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchGame() {
  const location = useLocation();
  const currentLocation = location.pathname;
  const query = useQuery();
  const searchName = query.get("name");
  const { games, setGames, setPage } = useGames();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      axios
        .get("/games", {
          params: {
            search: searchName,
            ordering: "-relevance",
            key: API_KEY,
          },
        })
        .then((response) => {
          setGames((prev) => [...prev, ...response.data.results]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!currentLocation) return;

    return () => {
      setGames([]);
      setPage(1);
    };
  }, [currentLocation]);

  useEffect(() => {
    const pictures = games.map((game) => game.background_image);
    const cacheImages = async (pictures) => {
      const promises = await pictures.map((picture) => {
        return new Promise(function (resolve, reject) {
          const img = (new Image().src = picture);
          img.onload = resolve();
          img.onerror = reject();
        });
      });
      await Promise.all(promises);
    };
    cacheImages(pictures);
  }, [games]);

  if (loading) return <Loading />;

  return (
    <div>
      <div style={{ margin: "8px 0px", textAlign: "center" }}>
        <h2>Results of "{searchName}":</h2>
      </div>
      <GamesList games={games} disableFetchMore={true} />
    </div>
  );
}

export default SearchGame;
