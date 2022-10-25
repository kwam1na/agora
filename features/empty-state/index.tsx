import { Button, Text, Title } from "@mantine/core";
import { IconUsers } from "@tabler/icons";
import styles from "./empty-state.module.scss";

interface EmptyStateProps {
  illustration?: React.ReactNode;
  headerText: string;
  body: string;
  onCTAClick?: () => void;
  ctaText?: string;
}
const EmptyState = ({
  illustration,
  headerText,
  body,
  onCTAClick,
  ctaText,
}: EmptyStateProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {illustration && (
          <div className={styles.illustration}>{illustration}</div>
        )}
        <div className={styles.header}>
          <Title order={1}>{headerText}</Title>
        </div>
        <div className={styles.body}>
          <Text>{body}</Text>
        </div>
        {onCTAClick && (
          <div className={styles.cta}>
            <Button
              size="md"
              color={"dark"}
              variant="outline"
              onClick={onCTAClick}
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
