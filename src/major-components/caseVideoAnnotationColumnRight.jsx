import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

const CaseVideoAnnotationColumnRight = ({ className, title, annotations, deleteAnnotation }) => {
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    setSubscribed(true);
    (async () => {})();
    return () => setSubscribed(false);
  }, [subscribed]);

  return (
    <div className={className}>
      <h4>{title}</h4>
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
  );
};

export default CaseVideoAnnotationColumnRight;
