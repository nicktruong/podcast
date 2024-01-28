import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useStyles } from "./styles";

const ChangeLanguageButton = () => {
  const { classes } = useStyles();
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  return (
    <Select
      value={language}
      className={classes.select}
      onChange={(event) => {
        const language = event.target.value;
        setLanguage(language);
        i18n.changeLanguage(language);
      }}
    >
      <MenuItem value="en">
        <img
          className={classes.flag}
          src={`${process.env.PUBLIC_URL}/assets/images/american-flag.jpg`}
          alt="American flag"
        />
      </MenuItem>
      <MenuItem value="vi">
        <img
          className={classes.flag}
          src={`${process.env.PUBLIC_URL}/assets/images/vietnam-flag.jpg`}
          alt="Vietnam flag"
        />
      </MenuItem>
    </Select>
  );
};

export default ChangeLanguageButton;
