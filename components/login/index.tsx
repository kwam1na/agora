import { Button, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import styles from "./login.module.scss";
import * as EmailValidator from "email-validator";
import * as React from "react";

const Login = () => {
  const [email, setEmail] = React.useState<string | null>(null);
  const [showEmailWarning, setShowEmailWarning] = React.useState(false);
  const [password, setPassword] = React.useState<string | null>(null);
  const [enteredDetails, setEnteredDetails] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const handleOnLoginClick = () => {
    // console.log("Details: ", email, password);
    // setShowError((e) => !e);
    window.location.href = "/dashboard";
  };

  const handleOnEnterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowError(false);
    let enteredEmail = email || "",
      enteredPassword = password || "";
    switch (e.target.name) {
      case "email":
        if (EmailValidator.validate(e.target.value)) {
          setEmail(e.target.value);
          enteredEmail = e.target.value;
          setShowEmailWarning(false);
        } else {
          setShowEmailWarning(true);
          setEmail(null);
          enteredEmail = "";
        }
        break;

      case "password":
        if (e.target.value !== "") {
          setPassword(e.target.value);
          enteredPassword = e.target.value;
        } else {
          setPassword(null);
          enteredPassword = "";
        }
        break;

      default:
        return;
    }

    setEnteredDetails(enteredEmail !== "" && enteredPassword !== "");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Agora</title>
      </Head>
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <Title order={1}>Log in</Title>
          <Title order={3} color="dimmed">
            Please enter your account details
          </Title>
          <div className={styles.inputFields}>
            <TextInput
              label={"Email"}
              placeholder={"Enter your email"}
              name="email"
              onChange={handleOnEnterText}
              error={showEmailWarning && "Please enter a valid email address"}
            />
            <PasswordInput
              label={"Password"}
              placeholder={"Enter your password"}
              name="password"
              onChange={handleOnEnterText}
            />
            {showError && (
              <Text size={"xs"} color="red">
                The email address or password entered is incorrect. Try again.
              </Text>
            )}
            <div className={styles.forgotLink}>
              <Link href={"/forgot"}>Forgot password</Link>
            </div>
            <Button
              size="lg"
              color={"dark"}
              disabled={!enteredDetails}
              onClick={handleOnLoginClick}
            >
              Log in
            </Button>

            <div className={styles.newUser}>
              <Text>First time?</Text>
              <Link href={"/activate"}>Activate your account</Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}></div>
    </div>
  );
};

export default Login;
