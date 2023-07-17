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

    if (isMobile === false) {
        const gridContainer = document.querySelector(".eas_gridContainer");
        setGrid(gridContainer);
        createGrid(64, document.querySelector(".eas_gridContainer"));
    }

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

  function askSize() {
    let gridSize = Number(prompt(t("eas_newGrid_sizePrompt")));
    if (isNaN(gridSize)) {
      gridSize = 64;
      alert(t("eas_newGrid_invalidValue"));
    } else if (gridSize > 100) {
      gridSize = 100;
    } else if (gridSize < 1) {
      gridSize = 1;
    }
  
    createGrid(gridSize, grid);
  }

  return (
    <>
      <h1 className="eas_mainTitle">{t("eas_mainTitle")}</h1>
      <BackHome />
      {isMobile === false ? (
        <div className="eas_content">
          <div className="eas_gridContainer"></div>
          <div className="eas_controls">
            <input type="color" name="colorSel" id="eas_colorSel" onChange={(e) => {color.current = e.target.value}} />
            <button className="btn eas_btn" onClick={clearGrid}>{t("eas_controls_clearGridBtn")}</button>
            <button className="btn eas_btn" onClick={askSize}>{t("eas_controls_newGridBtn")}</button>
            <button
              className="btn eas_btn"
              onClick={(e) => {
                isRandomColor.current = !isRandomColor.current;
                e.target.classList.toggle('enabled');
              }}
            >
              {t("eas_controls_randomColorsBtn")}
            </button>
          </div>
        </div>
      ) : (
        <div className="eas_noMobile">
          <h2 className="eas_noMobileText text_center">
            {t("eas_noMobileText")}
          </h2>
        </div>
      )}
    </>
  );
}

export default EtchASketch;
