import React from "react";

function Gamemeta({
  metaDetails,
  metascore,
  ageRating,
  releaseDate,
  publisher,
  website,
  developer,
}) {
  const metaranking = (metascore) => {
    if (metascore > 74) {
      return "high_score";
    } else if (metascore < 75) {
      return "med_score";
    } else if (metascore < 50) {
      return "low_score";
    } else {
      return "no score";
    }
  };

  return (
    metaDetails && (
      <div className="game_details_meta_container">
        <div className="game_details_meta_panel left">
          <div className="game_meta_block">
            <div className="meta_title">
              <span>Platforms:</span>
            </div>
            <div className="game_details_platforms_wrapper">
              {metaDetails.platforms.map((platform, index) => (
                <span
                  key={`game_details_platforms_${index}`}
                  style={{ marginRight: 4, color: "white" }}
                >{`${platform.platform.name}${
                  index !== metaDetails.platforms.length - 1 ? "," : ""
                }`}</span>
              ))}
            </div>
          </div>
          <div className="game_meta_block">
            <div className="meta_title">
              <span>Genres:</span>
            </div>
            <div className="game_meta_text">
              {metaDetails.genres.map((genre, index) => (
                <span
                  style={{ marginRight: 4, color: "white" }}
                  key={`game_meta_text_${index}`}
                >{`${genre.name}${
                  index !== metaDetails.genres.length - 1 ? "," : ""
                }`}</span>
              ))}
            </div>
          </div>
          {["Developer", "Age Rating"].map((title, index) => (
            <div className="game_meta_block" key={`meta_${title}`}>
              <div className="meta_title">
                <span>{title}</span>
              </div>
              <div className="game_details_meta_developer">
                {index === 0 ? developer : ageRating}
              </div>
            </div>
          ))}
        </div>
        <div className="game_details_panel right">
          {["Metascore", "Release Date", "Publisher", "Website"].map(
            (title, index) => (
              <div className="game_meta_block" key={`meta_block_${title}`}>
                <div className="meta_title">
                  <span>{title}</span>
                </div>
                <div className="game_meta_text">
                  {index === 0 &&
                    (metascore ? (
                      <div
                        className={`metascore ${metaranking(
                          metaDetails.metacritic
                        )}`}
                      >
                        {metascore}
                      </div>
                    ) : (
                      "Not rated yet"
                    ))}
                  {index === 1 &&
                    (releaseDate
                      ? new Date(releaseDate).toDateString()
                      : "Unavailable")}
                  {index === 2 && publisher}
                  {index === 3 &&
                    (website ? (
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "lightblue" }}
                      >
                        {website}
                      </a>
                    ) : (
                      <span style={{ color: "white" }}>Unavailable</span>
                    ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    )
  );
}

export default Gamemeta;
