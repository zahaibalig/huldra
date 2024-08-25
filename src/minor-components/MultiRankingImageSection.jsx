import React from "react";
import { useDrag } from "react-dnd";

const ImageSection = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "IMAGE",
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`image-section ${isDragging ? "dragging" : ""}`}>
      <img src={name} alt={name} className="image-section img" />
    </div>
  );
};

export default ImageSection;
