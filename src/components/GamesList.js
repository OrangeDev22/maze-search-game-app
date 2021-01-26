import React, { useState, useRef, useCallback, useEffect } from "react";
import "../css/GamesList.css";
import debouce from "just-debounce-it";
import { Button, CircularProgress } from "@material-ui/core";
import { useGames } from "../contexts/GamesProvider";
import Gamecard from "./Gamecard";

function GamesList({ games }) {
  const visorRef = useRef();
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const { setPage } = useGames();

  const onChange = useCallback(
    debouce((entries, observer) => {
      const element = entries[0];
      console.log(element.isIntersecting);
      if (element.isIntersecting) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    })
  );

  useEffect(() => {
    if (loadMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, loadMore]);

  useEffect(function () {
    const observer = new IntersectionObserver(onChange, {
      rootMargin: "50px",
    });
    observer.observe(visorRef.current);

    return () => observer.disconnect();
  });

  if (games.length === 0) {
    return <div ref={visorRef}></div>;
  }

  return (
    <div className="games_list" key="gamesList">
      <div className="games_list_container">
        {games.map((game, index) => {
          return <Gamecard game={game} index={index} key={index} />;
        })}
      </div>
      <div className="game_list_visor" ref={visorRef}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setLoadMore(true)}
          style={{ width: "20rem", padding: "0.8em" }}
        >
          {loading && loadMore ? (
            <CircularProgress color="secondary" />
          ) : (
            "Load More"
          )}
        </Button>
      </div>
    </div>
  );
}

export default React.memo(GamesList);
