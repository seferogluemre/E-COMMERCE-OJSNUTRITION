import React, { useState } from "react";
import { ProductImageProps } from "../../../../types/ProductTypes";

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  width = "100%",
  height = "100%",
  magnifierHeight = 150,
  magnifierWidth = 150,
  zoomLevel = 2.5,
}) => {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  // Responsive kontrol
  const isMobile = window.innerWidth <= 768;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "auto",
      }}
    >
      <img
        src={src}
        style={{ width: "100%", height: "auto", objectFit: "contain" }}
        onMouseEnter={(e) => {
          if (isMobile) return; // Mobilde büyüteç çalışmasın
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          if (isMobile) return;
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();
          const x = e.pageX - left - window.scrollX;
          const y = e.pageY - top - window.scrollY;
          setXY([x, y]);
        }}
        onMouseLeave={() => setShowMagnifier(false)}
        alt="Product"
        className="product-detail_image"
      />

      {/* Magnifier */}
      {!isMobile && (
        <div
          style={{
            display: showMagnifier ? "" : "none",
            position: "absolute",
            pointerEvents: "none",
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            opacity: "1",
            border: "2px solid lightgray",
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
            borderRadius: "4px",
            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          }}
        />
      )}
    </div>
  );
};
