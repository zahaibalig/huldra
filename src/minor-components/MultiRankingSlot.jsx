import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const MultiRankingSlot = ({ name, index, moveImage, swapImages }) => {
  const ref = useRef(null);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "IMAGE",
    drop: (item) => {
      if (item.index !== undefined && item.index !== index) {
        swapImages(item.index, index);
      } else if (item.index === undefined) {
        moveImage(item.name, index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE",
    item: { name, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div className="multi-ranking-slot-container">
      <div
        ref={ref}
        className={`multi-ranking-slot ${isDragging ? "dragging" : ""} ${
          isOver && canDrop ? "can-drop" : ""
        }`}
      >
        <div className="multi-ranking-slot-index-label">{index + 1}</div>
        <img src={name} alt={name} className="multi-ranking-slot-pic" />
      </div>
    </div>
  );
};

export default MultiRankingSlot;
