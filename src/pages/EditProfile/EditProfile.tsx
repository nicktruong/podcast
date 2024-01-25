import EditIcon from "@mui/icons-material/Edit";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Box, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

import { NextButton, StyledInput } from "@/components";

import { usePrepare } from "./usePrepare";

const EditProfile = () => {
  const {
    classes,
    user,
    inputRef,
    control,
    errors,
    tempAvatar,
    choosePhoto,
    onSubmit,
    handleAvatarSubmit,
  } = usePrepare();

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Box className={classes.avatarContainer} onClick={choosePhoto}>
          {tempAvatar ?? user?.photoURL ? (
            <img
              className={classes.avatar}
              alt={`${user?.name} avatar`}
              src={tempAvatar ?? user?.photoURL}
            />
          ) : (
            <PersonOutlineIcon className={classes.avatarIcon} />
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

          <Typography fontSize="14px" fontWeight={700} marginBottom="8px">
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

          <NextButton sx={{ marginTop: "20px" }} type="submit">
            Save
          </NextButton>
        </form>
      </Box>
    </Box>
  );
};

export default EditProfile;
