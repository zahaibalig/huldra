import React, { useEffect, useState } from "react";
import { getAsset } from "../utils/loadAssets";

const RankedText = ({ url, className, label, scrollClassName }) => {
  const [textContent, setTextContent] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    setSubscribed(true);

    (async () => {
      const textUrl = await getAsset(url);
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
