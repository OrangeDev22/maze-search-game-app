import React from "react";

function GameAbout({ about }) {
  return (
    <div className="game_details_info">
      <div className="game_details_main">
        {about && (
          <div className="game_details_description">
            {about.split("#").map((section, index) => {
              if (index > 0) {
                return section.split("\n").map((text, i) => {
                  return i === 0 ? (
                    <h3 key={`game_details_about_title_${i}`}>{text}</h3>
                  ) : (
                    <p key={`game_details_about_text_${i}`}>{text}</p>
                  );
                });
              } else {
                return (
                  <div
                    className="game_details_about"
                    key={`game_details_about_title_header_${index}`}
                  >
                    <h3>About</h3>
                    <p>{section}</p>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default GameAbout;
