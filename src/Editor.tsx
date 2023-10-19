import React, { useEffect, useRef, useState } from "react";
import "./Editor.css";
import interact from "interactjs";
import blueS from "./assets/blues.png";
import pinkS from "./assets/pinks.png";
import whiteS from "./assets/white.png";

const ShirtDesigner = () => {
  const arr = [blueS, pinkS, whiteS];
  const refs = useRef([]);
  const [images, setImages] = useState([]);
  const newRef = useRef();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // @ts-ignore
    const imagesArray = [...images];

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          if (!imagesArray.includes(reader.result)) {
            imagesArray.push(reader.result);
          }

          // @ts-ignore
          setImages(imagesArray);
        }
      };
      // @ts-ignore
      reader.readAsDataURL(file);
    });
  };

  const handleKeyDown = (event, idx) => {
    if (event.key === "Delete") {
      console.log("we are here: ", images);
      // images.splice(idx, 1);
      setImages((images) => [...images.splice(idx, 1)]);
    }
  };

  const renderPreviewImages = () => {
    return images.map((image, index) => {
      return (
        <img
          tabIndex={index}
          onKeyDown={(event) => handleKeyDown(event, index)}
          key={index}
          src={image}
          alt={`Preview Image ${index}`}
          ref={(element) => {
            refs.current[index] = element;
            element &&
              interact(element)
                .resizable({
                  // resize from all edges and corners
                  edges: { left: true, right: true, bottom: true, top: true },

                  listeners: {
                    move(event) {
                      var target = event.target;
                      var x = parseFloat(target.getAttribute("data-x")) || 0;
                      var y = parseFloat(target.getAttribute("data-y")) || 0;

                      // update the element's style
                      target.style.width = event.rect.width + "px";
                      target.style.height = event.rect.height + "px";

                      // translate when resizing from top or left edges
                      x += event.deltaRect.left;
                      y += event.deltaRect.top;

                      target.style.transform =
                        "translate(" + x + "px," + y + "px)";

                      target.setAttribute("data-x", x);
                      target.setAttribute("data-y", y);
                      // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
                    },
                  },
                  modifiers: [
                    // keep the edges inside the parent
                    interact.modifiers.restrictEdges({
                      outer: "parent",
                    }),

                    // minimum size
                    interact.modifiers.restrictSize({
                      min: { width: 100, height: 100 },
                    }),
                  ],
                  inertia: true,
                })
                .draggable({
                  onmove: (event) => {
                    const target = event.target;
                    const x =
                      (parseFloat(target.getAttribute("data-x")) || 0) +
                      event.dx;
                    const y =
                      (parseFloat(target.getAttribute("data-y")) || 0) +
                      event.dy;

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute("data-x", x);
                    target.setAttribute("data-y", y);
                  },
                  modifiers: [
                    interact.modifiers.restrict({
                      restriction: "parent",
                      // endOnly: true
                    }),
                  ],
                });
          }}
          className="draggable image"
          style={{
            marginTop: (index + 1) * 10 + "px",
          }}
        />
      );
    });
  };

  return (
    <div style={{ border: "1px solid green", width: "70vw" }}>
      <input type="file" multiple onChange={handleImageChange} />
      <div className="container">
        <div className="images-container mask1">
          <img className="backg-image mask1" src={whiteS} alt="white" />
          {renderPreviewImages()}
          <div
            ref={(tempRef) => {
              newRef.current = tempRef;
              tempRef &&
                interact(tempRef)
                  .resizable({
                    edges: { left: true, right: true, bottom: true, top: true },
                    listeners: {
                      move(event) {
                        var target = event.target;
                        var x = parseFloat(target.getAttribute("data-x")) || 0;
                        var y = parseFloat(target.getAttribute("data-y")) || 0;

                        // update the element's style
                        target.style.width = event.rect.width + "px";
                        target.style.height = event.rect.height + "px";

                        // translate when resizing from top or left edges
                        x += event.deltaRect.left;
                        y += event.deltaRect.top;

                        target.style.transform =
                          "translate(" + x + "px," + y + "px)";

                        target.setAttribute("data-x", x);
                        target.setAttribute("data-y", y);
                        // target.textContent =
                        //   Math.round(event.rect.width) +
                        //   "\u00D7" +
                        //   Math.round(event.rect.height);
                      },
                    },
                    modifiers: [
                      // keep the edges inside the parent
                      interact.modifiers.restrictEdges({
                        outer: "parent",
                      }),

                      // minimum size
                      interact.modifiers.restrictSize({
                        min: {
                          width: tempRef.clientWidth,
                          height: tempRef.clientHeight,
                        },
                      }),
                    ],
                    inertia: true,
                  })
                  .draggable({
                    onmove: (event) => {
                      const target = event.target;
                      const x =
                        (parseFloat(target.getAttribute("data-x")) || 0) +
                        event.dx;
                      const y =
                        (parseFloat(target.getAttribute("data-y")) || 0) +
                        event.dy;

                      target.style.transform = `translate(${x}px, ${y}px)`;
                      target.setAttribute("data-x", x);
                      target.setAttribute("data-y", y);
                    },
                    modifiers: [
                      interact.modifiers.restrict({
                        restriction: "parent",
                        // endOnly: true
                      }),
                    ],
                  });
            }}
            style={{
              border: "1px solid red",
              height: newRef.current?.clientHeight || "fit-content",
            }}
          >
            test
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShirtDesigner;
