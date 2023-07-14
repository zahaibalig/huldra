import React, { useEffect, useState } from "react";
import { getAsset } from "../utils/loadAssets";

const RankedText = ({ url, width, height, className, label, storageType, scrollClassName }) => {
  const [textUrl, setTextUrl] = useState("");
  const [textContent, setTextContent] = useState("");

  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    setSubscribed(true);

    (async () => {
      const textUrl = await getAsset(url);
      setTextUrl(textUrl);
      console.log("textUrl", textUrl);
      const fetchText = async () => {
        try {
          const response = await fetch(textUrl);
          const text = await response.text();
          setTextContent(text);
        } catch (error) {
          console.error("Error fetching text:", error);
        }
      };

      fetchText();
    })();

    return () => setSubscribed(false);
  }, [url, subscribed]);
  return (
    <div className={className}>
      <span className="text-label">{label}</span>
      <p className={scrollClassName}>{textContent}</p>
    </div>
  );
};

export default RankedText;
