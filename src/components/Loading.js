import React from "react";
import { CircularProgress } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

function Loading() {
  return (
    <div
      className="circular_progress_wrapper"
      style={{ width: 77, height: 77, margin: "auto", marginTop: "2em" }}
    >
      <CircularProgress
        style={{ width: "100%", height: "100%", color: grey[700] }}
      />
    </div>
  );
}

export default Loading;
