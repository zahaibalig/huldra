import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { getAsset } from "../utils/loadAssets";
import { Input } from "@mui/material";
import { Button } from "reactstrap";

const AnnotationVideo = ({ url, width, height, className, label }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [timeStamps, setTimeStamps] = useState(0);
  const [comments, setComments] = useState("");
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    setSubscribed(true);
    (async () => {
      const videoUrl = await getAsset(url);
      setVideoUrl(videoUrl);
    })();
    const storedAnnotations = JSON.parse(localStorage.getItem("annotations"));
    if (storedAnnotations) {
      setAnnotations(storedAnnotations);
    }
    return () => setSubscribed(false);
  }, [url, subscribed]);
  const handleSubmit = () => {
    if (comments !== "") {
      const previousAnnotations = JSON.parse(localStorage.getItem("annotations"));
      if (previousAnnotations?.length > 0) {
        let newAnnotations = [
          ...previousAnnotations,
          {
            timeStamp: timeStamps.toFixed(2),
            comment: comments,
          },
        ];
        localStorage.setItem("annotations", JSON.stringify(newAnnotations));
      } else {
        let firstAnnotations = [
          {
            timeStamp: timeStamps.toFixed(2),
            comment: comments,
          },
        ];
        localStorage.setItem("annotations", JSON.stringify(firstAnnotations));
      }
      setAnnotations(JSON.parse(localStorage.getItem("annotations")));
      setComments("");
    }
  };
  return (
    <div className={className}>
      <span className="video-label">{label}</span>
      <ReactPlayer
        width={width}
        height={height}
        controls
        url={videoUrl}
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
      <Button
        onClick={() => {
          handleSubmit();
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
  );
};

export default AnnotationVideo;
