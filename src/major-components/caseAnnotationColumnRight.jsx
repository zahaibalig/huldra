import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

const CaseAnnotationColumnRight = ({ className, title, text, textClassName, sectionVideoUrl }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  useEffect(() => {
    setSubscribed(true);
    (async () => {})();
    const storedAnnotations = JSON.parse(localStorage.getItem("annotations"));
    if (storedAnnotations) {
      setAnnotations(storedAnnotations);
    }
    return () => setSubscribed(false);
  }, [subscribed, annotations]);

  const deleteAnnotation = (index) => {
    const filtered = annotations.filter((_, annotationIndex) => annotationIndex !== index);
    setAnnotations(filtered);
    localStorage.setItem("annotations", JSON.stringify(filtered));
  };

  return (
    <div className={className}>
      <h4>{title}</h4>
      <p className={textClassName}>{text}</p>
      <div className={"survey-box-video-right"}>
        <table style={{ width: "100%", marginTop: "20px" }}>
          <tbody>
            {annotations.map((entry, index) => (
              <tr key={index}>
                <td>{entry.timeStamp}</td>
                <td>{entry.comment}</td>
                <td>
                  <Button
                    onClick={() => deleteAnnotation(index)}
                    style={{
                      backgroundColor: "#FF4500",
                      color: "white",
                      border: "1px solid #000",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaseAnnotationColumnRight;
