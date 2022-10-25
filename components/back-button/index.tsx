import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import Link from "next/link";
const BackButton = ({
  link,
  onClick,
}: {
  link?: string;
  onClick?: () => void;
}) => {
  const InnerButton = ({ onClick }: { onClick?: () => void }) => (
    <Button variant="outline" color={"gray"} onClick={onClick}>
      <IconArrowLeft />
    </Button>
  );

  return link ? (
    <Link href={link!}>
      <InnerButton />
    </Link>
  ) : (
    <div>
      <InnerButton onClick={onClick} />
    </div>
  );
};

export default BackButton;
