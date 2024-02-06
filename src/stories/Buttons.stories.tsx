import { Button } from "@mui/material";

import { FacebookIconImg } from "../assets";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = {
  args: {
    variant: "contained",
    children: "Contained Button",
  },
};

export const Auth: Story = {
  args: {
    variant: "auth",
    children: "Auth Button",
    startIcon: (
      <img
        alt="Facebook Icon"
        width={24}
        height={24}
        className="absolute left-5 top-1/2 -translate-y-1/2"
        src={FacebookIconImg}
      />
    ),
  },
};

export const Next: Story = {
  args: {
    variant: "next",
    children: "Next Button",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "Outlined Button",
  },
};

export const Round: Story = {
  args: {
    variant: "round",
    children: "Round Button",
  },
};

export const RoundedContained: Story = {
  args: {
    variant: "roundedContained",
    children: "RoundedContained Button",
  },
};

export const RoundedOutlined: Story = {
  args: {
    variant: "roundedOutlined",
    children: "RoundedOutlined Button",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    children: "Text Button",
  },
};
