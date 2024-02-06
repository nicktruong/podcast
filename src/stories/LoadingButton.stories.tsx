import LoadingButton from "../components/LoadingButton/LoadingButton";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "components/LoadingButton",
  component: LoadingButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoadingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
    variant: "next",
    children: "Loading Button",
  },
};
