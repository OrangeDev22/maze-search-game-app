import React from "react";
import { Divider } from "@material-ui/core";

function GameDetailsCard({
  background_image,
  rating,
  genres,
  releaseDate,
  developer,
  publisher,
}) {
  return (
    <div className="game_details_right">
      <div className="game_details_main_image">
        <div className="main_image_container">
          <div className="main_image_wrapper">
            <img src={background_image} alt="" />
          </div>
        </div>
      </div>

      <div>
        <Divider />
        <div
          style={{
            display: "flex",
            marginTop: "1em",
            padding: "0 1em 0 1em",
          }}
        >
          <p>Ratings:</p>
          <p style={{ marginLeft: "auto" }}>{`${
            rating ? `${rating}/5` : "Not rated yet"
          }`}</p>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            marginTop: "1em",
            padding: "0 1em 0 1em",
          }}
        >
          <p>Genres:</p>
          <div
            className="genres_wrapper"
            style={{ display: "flex", marginLeft: "auto" }}
          >
            {genres.map((genre, index) => (
              <p style={{ marginLeft: 4 }} key={index}>
                {genre.name}
                {index !== genres.length - 1 && ","}
              </p>
            ))}
          </div>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            marginTop: "1em",
            padding: "0 1em 0 1em",
          }}
        >
          <p>Release Date:</p>
          <p style={{ marginLeft: "auto" }}>
            {releaseDate ? new Date(releaseDate).toDateString() : "Unavailable"}
          </p>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            marginTop: "1em",
            padding: "0 1em 0 1em",
          }}
        >
          <p>Developer:</p>
          <p style={{ marginLeft: "auto" }}>{developer}</p>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            marginTop: "1em",
            padding: "0 1em 0 1em",
          }}
        >
          <p>Publisher:</p>
          <p style={{ marginLeft: "auto" }}>{publisher}</p>
        </div>
      </div>
    </div>
  );
}

export default GameDetailsCard;
