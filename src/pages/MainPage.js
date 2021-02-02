import React, { useEffect, useState } from "react";
import axios from "../axios";
import ImageSLider from "../components/ImageSlider";
import GamesList from "../components/GamesList";
import { useGames } from "../contexts/GamesProvider";
import { useApp } from "../contexts/AppProvider";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";
// import { ClickAwayListener } from "@material-ui/core";

const API_KEY = process.env.REACT_APP_GAME_RAWG_API_KEY;

function MainPage() {
  const location = useLocation();
  const { games, setGames, page, setPage } = useGames();
  const [currentLocation, setCurrentLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const pageSize = 20;
  const { screenWidth } = useApp();

  useEffect(() => {
    async function fetchData() {
      axios
        .get("/games/lists/main", {
          params: {
            ordering: "-relevance",
            discover: true,
            page_size: pageSize,
            page,
            key: API_KEY,
          },
        })
        .then((res) => {
          setGames((prev) => [...prev, ...res.data.results]);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
          setCurrentLocation(location.pathname);
        });
    }

    fetchData();
  }, [page, setGames]);

  useEffect(() => {
    if (!location) return;

    return () => {
      setGames([]);
      setPage(1);
    };
  }, [location.pathname]);

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
      {screenWidth > 979 && (
        <ImageSLider games={games.slice(0, 7)} key="ImageSlider" />
      )}
      <div
        style={{
          margin: `${screenWidth > 979 ? "1em 0 " : "4px 0"}`,
          padding: `${screenWidth > 979 ? " 1em 0" : "4px 0 "}`,
          textAlign: "center",
        }}
      >
        <h2>Top trending games</h2>
      </div>
      <GamesList games={games} key="GamesList" />
    </div>
  );
}

export default MainPage;
