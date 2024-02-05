import { MenuItem, Select } from "@mui/material";

import { AmericanFlagImg, VietnamFlagImg } from "@/assets";

import { usePrepareHook } from "./helpers";

const ChangeLanguageButton = () => {
  const { i18n, classes, handleChangeLanguage } = usePrepareHook();

  return (
    <Select
      className={classes.select}
      onChange={handleChangeLanguage}
      defaultValue={i18n.resolvedLanguage ?? "en"}
    >
      <MenuItem value="en">
        <img
          alt="American flag"
          src={AmericanFlagImg}
          className={classes.flag}
        />
      </MenuItem>
      <MenuItem value="vi">
        <img className={classes.flag} src={VietnamFlagImg} alt="Vietnam flag" />
      </MenuItem>
    </Select>
  );
};

export default ChangeLanguageButton;
