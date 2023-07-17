import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import "./EtchASketch.css";
import BackHome from "../Components/BackHome";

function EtchASketch(props) {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t("eas_docTitle");
    document.body.classList.add("etch-a-sketch");

    const gridContainer = document.querySelector(".eas_gridContainer");
    setGrid(gridContainer);
    createGrid(3, document.querySelector(".eas_gridContainer"));

    return () => {
      document.body.classList.remove("etch-a-sketch");
    };
  }, []);

  const [gridCreated, setGridCreated] = useState(false);
  const [pixels, setPixels] = useState(undefined);
  const [grid, setGrid] = useState(undefined);
  const color = useRef("#000000");
  const isRandomColor = useRef(false);

  function paintPixel(e) {
    console.log(isRandomColor.current);
    if (isRandomColor.current) {
      e.target.style.backgroundColor = getRandomColor();
    } else {
      e.target.style.backgroundColor = color.current;
    }
  }

  function createGrid(size = 64, gridC) {
    if (gridCreated) {
      delGrid();
    }

    for (let i = 0; i < size * size; i++) {
      const newPix = document.createElement('div');
      newPix.classList.add('pixel');
      newPix.addEventListener('mouseover', paintPixel);

      gridC.appendChild(newPix);
    }

    gridC.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridC.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    let newPixels = document.querySelectorAll(".pixel");
    setPixels(newPixels);
    setGridCreated(true);
  }

  function delGrid() {
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
    setGridCreated(false);
  }

  const getRandomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

  function clearGrid() {
    pixels.forEach((pixel) => {
      pixel.style.backgroundColor = "#FFFFFF";
    });
  }
  return (
    <>
      <h1 className="eas_mainTitle">{t("eas_mainTitle")}</h1>
      <BackHome />
      {isMobile === false ? (
        <div className="eas_content">
          <div className="eas_gridContainer"></div>
          <div className="eas_controls">
            <input type="color" name="colorSel" id="colorSel" />
            <button className="btn eas_clearGridBtn" onClick={clearGrid}>
              Clear grid
            </button>
            <button className="btn eas_newGridBtn">New grid</button>
            <button
              className="btn eas_randomColorBtn"
              onClick={(e) => {
                isRandomColor.current = !isRandomColor.current;
                e.target.classList.toggle('enabled');
              }}
            >
              Random colors
            </button>
          </div>
        </div>
      ) : (
        <div className="eas_noMobile">
          <h2 className="eas_noMobileText text_center">
            This app requires a desktop browser to work properly.
          </h2>
        </div>
      )}
    </>
  );
}

export default EtchASketch;
