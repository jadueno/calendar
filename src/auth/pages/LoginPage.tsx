import { useMemo, useState, ChangeEvent } from "react";
import {
  Button,
  Input,
  Label,
  Subtitle,
  Title,
  Text,
  Link,
  BoxArea,
} from "../../components";
import { useUserStore, User } from "../../hooks";
import Swal from "sweetalert2";

export const LoginPage = () => {
  const { setActiveUser, userList } = useUserStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const passwordError = useMemo(() => {
    if (!formSubmitted) {
      return false;
    }

    return formValues.password.length <= 0 ? true : false;
  }, [formValues.password, formSubmitted]);

  const emailError = useMemo(() => {
    if (!formSubmitted) {
      return false;
    }

    return formValues.email.length <= 0 ? true : false;
  }, [formValues.email, formSubmitted]);

  const onInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (formValues.email.length <= 0) {
      Swal.fire("Mail", "You must tell us your email", "error");
      return;
    }

    if (formValues.password.length <= 0) {
      Swal.fire("Password", "You must provide a suitable password", "error");
      return;
    }

    const activeUser = userList.filter((user: User) => {
      if (
        user.email === formValues.email &&
        user.password === formValues.password
      ) {
        return user;
      }
    });

    if (activeUser[0] !== undefined) {
      await setActiveUser(activeUser[0]);
      setFormSubmitted(false);
    } else {
      Swal.fire("Error", "Email or password not found", "error");
      return;
    }
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Title content="Jadueno calendar" dark />
          <BoxArea dark>
            <Subtitle content="Login to your account" dark />
            <form onSubmit={onSubmit}>
              <div>
                <Label content="Your email" dark />
                <Input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formValues.email}
                  error={emailError}
                  onChange={onInputChanged}
                />
              </div>
              <div>
                <Label content="Password" dark />
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formValues.password}
                  error={passwordError}
                  onChange={onInputChanged}
                />
              </div>
              <Button type="submit" content="Log in" classList="mb-4" />
              <Text dark>
                Don’t have an account yet?{" "}
                <Link goTo="auth/signup" dark>
                  Sign up
                </Link>
              </Text>
            </form>
          </BoxArea>
        </div>
      </section>
    </>
  );
};
