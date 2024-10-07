"use client";

import Link from "next/link";
import {authStore} from "@/store/authStore";
import {observer} from "mobx-react-lite";

import {useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

const LoginForm = observer(() => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const body = Object.fromEntries(data.entries());

    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/pair", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error("Login failed", response.status);
        return;
      }

      const rData = await response.json();

      if (rData.access && rData.refresh) {
        authStore.login(rData.username, rData.access, rData.refresh);

        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        console.error("Missing tokens in response");
      }
    } catch (error) {
      console.error("Error during login request", error);
    }
  }

  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" name="username" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" required name="password" />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="hidden mt-4 text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
});

export default LoginForm;
