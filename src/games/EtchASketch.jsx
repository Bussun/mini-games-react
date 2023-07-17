import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import "./EtchASketch.css";
import BackHome from "../Components/BackHome";

function EtchASketch(props) {
    const {t} = useTranslation();
    useEffect(() => {
        document.title = t("eas_docTitle");
        document.body.classList.add("etch-a-sketch");

        return() => {
            document.body.classList.remove("etch-a-sketch");
        }
    }, []);

  return (
    <>
      <h1 className="eas_mainTitle">{t("eas_mainTitle")}</h1>
      <BackHome />
      {isMobile === false 
      ? <div className="eas_content">
            <div className="eas_grid-container"></div>
            <div className="eas_controls">
              <input type="color" name="colorSel" id="colorSel" />
              <button className="btn eas_clearGridBtn">Clear grid</button>
              <button className="btn eas_newGridBtn">New grid</button>
              <button className="btn eas_randomColorBtn">Random colors</button>
            </div>
        </div>
      : <div className="eas_noMobile">
          <h2 className="eas_noMobileText text_center">This app requires a desktop browser to work properly.</h2>
        </div>
      }
    </>
  );
}

export default EtchASketch;
