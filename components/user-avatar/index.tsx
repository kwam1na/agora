import React from "react";
import { UnstyledButton, Group, Box, useMantineTheme } from "@mantine/core";
import { User } from "@/types";
import { UserAvatarWithEmail } from "../user-avatar-with-email";

export function ButtonWithUserInfo({
  user,
  onClick,
}: {
  user?: User;
  onClick: Function;
}) {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${theme.colors.gray[2]}`,
      }}
    >
      <UnstyledButton
        sx={{
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.black,

          "&:hover": {
            backgroundColor: theme.colors.gray[0],
          },
        }}
        onClick={() => onClick()}
      >
        <Group style={{ justifyContent: "space-between" }}>
          <UserAvatarWithEmail user={user} />
        </Group>
      </UnstyledButton>
    </Box>
  );
}
