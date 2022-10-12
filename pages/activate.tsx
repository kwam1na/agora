import * as React from "react";
import {
  Button,
  LoadingOverlay,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import Link from "next/link";
import styles from "./styles/activate.module.scss";

const ActivateAccount = () => {
  const [activated, setActivated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <div className={styles.container}>
      <LoadingOverlay visible={isLoading} />
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <Title order={1}>Hello there!</Title>
          <Title order={3} color="dimmed">
            Let&apos;s get your account activated
          </Title>
          <div className={styles.inputFields}>
            <TextInput
              label={"Email"}
              placeholder={"Enter your email"}
              tabIndex={isLoading ? -1 : 0}
            />
            {!activated ? (
              <TextInput
                label={"Activation code"}
                placeholder={"Enter your activation code"}
                tabIndex={isLoading ? -1 : 0}
              />
            ) : (
              <PasswordInput
                label={"Password"}
                placeholder={"Enter your password"}
                tabIndex={isLoading ? -1 : 0}
              />
            )}

            <Button
              size="lg"
              color={"dark"}
              mt={"24px"}
              onClick={() => setIsLoading((a) => !a)}
              tabIndex={isLoading ? -1 : 0}
            >
              Continue
            </Button>

            <div className={styles.newUser}>
              <Text>Already have an account?</Text>
              <Link href={isLoading ? "javascript:" : "/signin"} tabIndex={-1}>
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}></div>
    </div>
  );
};

export default ActivateAccount;
