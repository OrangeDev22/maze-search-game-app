import React, { useEffect, useState } from "react";
import axios from "../axios";
import ImageSLider from "./ImageSlider";
import GamesList from "./GamesList";
import { useGames } from "../contexts/GamesProvider";
import { ClickAwayListener } from "@material-ui/core";

const API_KEY = process.env.REACT_APP_GAME_RAWG_API_KEY;

function MainPage() {
  const { games, setGames, page } = useGames();
  const pageSize = 20;

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
        });
    }

    fetchData();
  }, [page]);

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

  return (
    <main>
      <ImageSLider games={games.slice(0, 7)} key="ImageSlider" />
      <GamesList games={games} key="GamesList" />
    </main>
  );
}

export default MainPage;
