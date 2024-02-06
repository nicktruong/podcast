import { MenuItem, Select } from "@mui/material";

import { AmericanFlagImg, VietnamFlagImg } from "@/assets";

import { usePrepareHook } from "./helpers";

const ChangeLanguageButton = () => {
  const { i18n, classes, handleChangeLanguage } = usePrepareHook();

  return (
    <Select
      className={classes.select}
      onChange={handleChangeLanguage}
      defaultValue={i18n.resolvedLanguage}
    >
      <MenuItem value="en">
        <img
          className={classes.flag}
          src={AmericanFlagImg}
          alt="American flag"
        />
      </MenuItem>
      <MenuItem value="vi">
        <img className={classes.flag} src={VietnamFlagImg} alt="Vietnam flag" />
      </MenuItem>
    </Select>
  );
};

export default ChangeLanguageButton;
