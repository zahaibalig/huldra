import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { getAsset } from "../utils/loadAssets";
import { Input } from "@mui/material";
import { Button } from "reactstrap";

const AnnotationAudio = ({ url, width, height, className, label, handleSubmit }) => {
  const [audioUrl, setAudioUrl] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [timeStamps, setTimeStamps] = useState(0);
  const [comments, setComments] = useState("");
  useEffect(() => {
    setSubscribed(true);
    (async () => {
      const audioUrl = await getAsset(url);
      setAudioUrl(audioUrl);
    })();
    return () => setSubscribed(false);
  }, [url, subscribed]);
  console.log(audioUrl);
  return (
    <div className={className}>
      <span className="audio-label">{label}</span>
      <ReactPlayer
        width="400px"
        height="200px"
        controls
        url={audioUrl}
        onProgress={(progress) => setTimeStamps(progress.playedSeconds)}
      />
      <Input
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        style={{
          marginTop: "20px",
          border: "1px solid #000",
          borderRadius: "4px",
          padding: "8px 12px",
        }}
        placeholder="Enter comments here..."
      />
      <div>
        <Button
          onClick={() => {
            setComments("");
            handleSubmit(timeStamps, comments);
          }}
          style={{
            margin: "10px",
            backgroundColor: "#fdb913",
            color: "#000",
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AnnotationAudio;
