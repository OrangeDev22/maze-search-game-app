import React from "react";
import { FaSteam, FaPlaystation, FaXbox } from "react-icons/fa";
import { SiGogDotCom, SiNintendo, SiEpicgames } from "react-icons/si";

function Stores({ stores }) {
  return (
    <div className="stores_container">
      <h2>Available stores</h2>
      <div className="stores">
        {stores &&
          stores.map((store, index) => (
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
