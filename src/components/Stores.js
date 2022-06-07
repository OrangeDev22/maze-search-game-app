import axios from "../axios";
import React, { useEffect, useState } from "react";
import { FaSteam, FaPlaystation, FaXbox } from "react-icons/fa";
import { SiGogDotCom, SiNintendo, SiEpicgames } from "react-icons/si";

const API_KEY = process.env.REACT_APP_GAME_RAWG_API_KEY;

function Stores({ stores, gameId }) {
  const [storesState, setStores] = useState([]);

  useEffect(() => {
    axios
      .get(`/games/${gameId}/stores`, {
        params: {
          key: API_KEY,
        },
      })
      .then((response) => {
        const storesWithUrls = response.data.results;
        if (storesWithUrls) {
          setStores(() =>
            stores.map((store) => ({
              ...store,
              url: storesWithUrls.find(
                (storeWithUrl) => storeWithUrl.id === store.id
              ).url,
            }))
          );
        }
      })
      .catch((error) => console.error("--error", error));
  }, []);

  return (
    <div className="stores_container">
      <h2>Available stores</h2>
      <div className="stores">
        {storesState.length > 0 &&
          storesState.map((store, index) => (
            <a
              key={index}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="store_wrapper">
                <p style={{ margin: 0 }}>{store.store.name}</p>
                {store.store.name.toLowerCase() === "steam" && (
                  <FaSteam size={18} />
                )}
                {store.store.name.toLowerCase() === "playstation store" && (
                  <FaPlaystation size={18} />
                )}
                {store.store.name.toLowerCase() === "gog" && (
                  <SiGogDotCom size={18} />
                )}
                {store.store.name.toLowerCase() === "xbox store" && (
                  <FaXbox size={18} />
                )}
                {store.store.name.toLowerCase() === "nintendo store" && (
                  <SiNintendo size={18} />
                )}
                {store.store.name.toLowerCase() === "epic games" && (
                  <SiEpicgames size={18} />
                )}
              </div>
            </a>
          ))}
      </div>
    </div>
  );
}

export default Stores;
