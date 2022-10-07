import { User } from "@/types";
import { Group, Avatar, Text, Box } from "@mantine/core";

export const UserAvatarWithEmail = ({ user }: { user?: User }) => {
  return (
    <Group>
      <Avatar src={user?.imageSRC} radius="xl" />
      <Box sx={{ flex: 1 }}>
        <Text size="sm" weight={500}>
          {user?.name}
        </Text>
        <Text color="dimmed" size="xs">
          {user?.email}
        </Text>
      </Box>
    </Group>
  );
};
