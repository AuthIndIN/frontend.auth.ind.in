"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { LucideLogIn } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import Loader from "./loader";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUser } from "@/internal/auth";

const loginFormSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required.")
    .min(3, "Username must be at least 3 characters."),
  password: z
    .string()
    .nonempty("Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .max(32, "Password must be at most 32 characters."),
});

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isLoginFormSubmitting, setIsLoginFormSubmiting] = useState(false);

  async function onLoginFormSubmit(data: z.infer<typeof loginFormSchema>) {
    setIsLoginFormSubmiting(true);
    const result = await loginUser(data);
    if (!result) {
      toast("Invalid credentials i.e. incorrect username or password");
      setIsLoginFormSubmiting(false);
      return;
    }

    if (searchParams.has("next")) {
      const next = searchParams.get("next");
      if (next) router.push(next);
    }

    router.refresh();
    setIsLoginFormSubmiting(false);
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to explore your connected experience.
        </CardDescription>
        <CardAction>
          <LucideLogIn className="animate-bounce" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <form
          id="form-login"
          onSubmit={loginForm.handleSubmit(onLoginFormSubmit)}
        >
          <FieldGroup className="gap-y-3">
            <Controller
              name="username"
              control={loginForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-y-1">
                  <FieldLabel htmlFor="form-login-username">
                    Username
                  </FieldLabel>
                  <FieldDescription>
                    Please enter your username.
                  </FieldDescription>
                  <Input
                    {...field}
                    id="form-login-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="Username"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={loginForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-y-1">
                  <FieldLabel htmlFor="form-login-password">
                    Password
                  </FieldLabel>
                  <FieldDescription>
                    Please enter your password.
                  </FieldDescription>
                  <Input
                    {...field}
                    id="form-login-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form="form-login"
          disabled={isLoginFormSubmitting}
        >
          {isLoginFormSubmitting ? (
            <Loader />
          ) : (
            <>
              <LucideLogIn /> Login
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
