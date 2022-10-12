import { Button, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import Link from "next/link";
import styles from "./login.module.scss";
const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <Title order={1}>Log in</Title>
          <Title order={3} color="dimmed">
            Please enter your account details
          </Title>
          <div className={styles.inputFields}>
            <TextInput label={"Email"} placeholder={"Enter your email"} />
            <PasswordInput
              label={"Password"}
              placeholder={"Enter your password"}
            />
            <div className={styles.forgotLink}>
              <Link href={"/forgot"}>Forgot password</Link>
            </div>
            <Button size="lg" color={"dark"}>
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
