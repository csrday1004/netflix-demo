import React from "react";
import "./TrailerModal.style.css";
import YouTube from "react-youtube";

export const TrailerModal = ({ setModal,trailerKey }) => {
  console.log('트레일러모달',trailerKey)
  const opts = {
    height: "480",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div className="tailer-modal-bg">
      <div className="tailer-modal">
        <div className="유튜브 youtube">
          <YouTube videoId={trailerKey} opts={opts} />;
        </div>
        <div>
          <button
            className="close-btn"
            onClick={() => {
              setModal(false);
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
