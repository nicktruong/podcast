import { GoPerson } from "react-icons/go";
import { Controller } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Typography } from "@mui/material";

import { StyledInput } from "@/components";

import { usePrepareHook } from "./helpers";

const EditProfile = () => {
  const {
    user,
    errors,
    classes,
    control,
    inputRef,
    tempAvatar,
    onSubmit,
    choosePhoto,
    handleAvatarSubmit,
  } = usePrepareHook();

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Box className={classes.avatarContainer} onClick={choosePhoto}>
          {tempAvatar || user?.photoURL ? (
            <img
              className={classes.avatar}
              alt={`${user?.name} avatar`}
              src={tempAvatar || user?.photoURL}
            />
          ) : (
            <GoPerson className={classes.avatarIcon} />
          )}
          <Box className={classes.overlay}>
            <Typography className={classes.text}>Choose photo</Typography>
            <EditIcon className={classes.editIcon} />
          </Box>
          <input
            type="file"
            onChange={(e) => handleAvatarSubmit(e.target.files?.[0])}
            ref={inputRef}
            hidden
          />
        </Box>

        <form className={classes.form} onSubmit={onSubmit}>
          <Typography fontSize="14px" fontWeight={700} marginBottom="8px">
            Name
          </Typography>

          <Controller
            name="name"
            control={control}
            render={({ field }) => {
              return (
                <StyledInput
                  className={classes.input}
                  id="name"
                  type="name"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name && <span>{errors.name.message}</span>}
                  {...field}
                />
              );
            }}
          />

          <Typography
            fontSize="14px"
            marginTop="16px"
            fontWeight={700}
            marginBottom="8px"
          >
            Bio
          </Typography>
          <Controller
            name="bio"
            control={control}
            render={({ field }) => {
              return (
                <textarea
                  rows={5}
                  id="description"
                  className="border border-[#4d4d4d] bg-transparent rounded w-full py-[8px] px-[14px] focus:outline-none hover:border-white focus:border-[#1ed760] focus:border-2"
                  {...field}
                />
              );
            }}
          />

          <Button variant="next" sx={{ marginTop: "20px" }} type="submit">
            Save
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EditProfile;
