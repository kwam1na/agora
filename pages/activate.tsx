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
import { User } from "@/types";
import { mockUser } from "@/utils/mock-data";
import {
  INITIAL_STATE,
  formReducer,
} from "@/reducers/activateAccoutFormReducer";

const ActivateAccount = () => {
  const [activated, setActivated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState<User>();
  const [state, dispatch] = React.useReducer(formReducer, INITIAL_STATE);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleActivateClick = () => {
    setIsLoading(true);
    console.log(state);
    const timer = setTimeout(() => {
      setUser((u) => mockUser);
      setIsLoading(false);
      setActivated(true);
    }, 3000);
  };

  const handleCreateUserAccountClick = () => {
    alert("Handle create user account..");
  };
  return (
    <div className={styles.container}>
      <LoadingOverlay visible={isLoading} />
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <Title order={1}>
            {!user ? "Hello there!" : `Hello, ${user.name}`}
          </Title>
          <Title order={3} color="dimmed">
            {!activated
              ? "Let's get your account activated"
              : "Complete setting up your account by adding a password"}
          </Title>
          <div className={styles.inputFields}>
            <TextInput
              label={"Email"}
              placeholder={"Enter your email"}
              tabIndex={isLoading ? -1 : 0}
              onChange={handleInputChange}
              name="email"
            />
            {!activated ? (
              <TextInput
                label={"Activation code"}
                placeholder={"Enter your activation code"}
                tabIndex={isLoading ? -1 : 0}
                onChange={handleInputChange}
                name="activationCode"
              />
            ) : (
              <PasswordInput
                label={"Password"}
                placeholder={"Enter your password"}
                tabIndex={isLoading ? -1 : 0}
                onChange={handleInputChange}
                name="password"
              />
            )}

            <Button
              size="lg"
              color={"dark"}
              mt={"24px"}
              onClick={
                !user ? handleActivateClick : handleCreateUserAccountClick
              }
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
