import React, { useState, useEffect } from "react";

function TextFileDisplay({ fileUrl }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fileUrl);
        const textData = await response.text();
        setText(textData);
      } catch (error) {
        console.error("Error fetching text file:", error);
      }
    };

    fetchData();
  }, [fileUrl]);

  return <pre>{text}</pre>;
}

export default TextFileDisplay;
