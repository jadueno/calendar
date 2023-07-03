import { useMemo, useState, ChangeEvent } from "react";
import {
  Button,
  Input,
  Label,
  Subtitle,
  Title,
  BoxArea,
  Link,
} from "../../components";
import { useUserStore } from "../../hooks";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { startSavingUser } = useUserStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    password_check: "",
  });

  const nameError = useMemo(() => {
    if (!formSubmitted) {
      return false;
    }

    return formValues.name.length <= 0 ? true : false;
  }, [formValues.name, formSubmitted]);

  const mailError = useMemo(() => {
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

    if (formValues.name.length <= 0) {
      Swal.fire("Name", "You must tell us your name", "error");
      return;
    }

    if (formValues.email.length <= 0) {
      Swal.fire("Mail", "You must tell us your email", "error");
      return;
    }

    if (
      formValues.password.length <= 0 ||
      formValues.password !== formValues.password_check
    ) {
      Swal.fire("Password", "You must tell us your password", "error");
      return;
    }

    await startSavingUser(formValues);
    navigate("/auth");
    setFormSubmitted(false);
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Title content="Jadueno calendar" dark />
          <BoxArea dark>
            <Subtitle content="Sign in to your account" dark />
            <form onSubmit={onSubmit}>
              <div>
                <Label content="Your name" dark />
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formValues.name}
                  error={nameError}
                  onChange={onInputChanged}
                />
              </div>
              <div>
                <Label content="Your email" dark />
                <Input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formValues.email}
                  error={mailError}
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
                  onChange={onInputChanged}
                />
              </div>
              <div>
                <Label content="Repeat password" dark />
                <Input
                  type="password"
                  name="password_check"
                  placeholder="••••••••"
                  value={formValues.password_check}
                  onChange={onInputChanged}
                />
              </div>
              <Button type="submit" content="Sign in" className="mb-4" />
            </form>
            <div className="text-center text-sm">
              <Link goTo="auth" dark>
                Volver
              </Link>
            </div>
          </BoxArea>
        </div>
      </section>
    </>
  );
};
