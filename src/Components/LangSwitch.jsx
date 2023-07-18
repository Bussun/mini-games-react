import React from "react";
import { useTranslation } from "react-i18next";

function LangSwitch() {
  const { i18n } = useTranslation();

  return (
    <>
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="bg">Български</option>
      </select>
    </>
  );
}

export default LangSwitch;
