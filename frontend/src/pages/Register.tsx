import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      session {
        access_token
      }
      user {
        email
      }
    }
  }
`;

type RegisterResponse = {
  register: {
    session: {
      access_token: string;
    };
    user: {
      email: string;
    };
  };
};

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerMutation, { data, loading, error }] =
    useMutation<RegisterResponse>(REGISTER_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await registerMutation({ variables: { email, password } });
      const token = res.data?.register.session.access_token;
      if (token) {
        localStorage.setItem("authToken", token);
        alert("✅ Account created successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section
      className="bg-muted h-screen w-screen"
      aria-label="Registration section"
    >
      <div className="flex h-full items-center justify-center">
        <div
          className="flex flex-col items-center gap-6 lg:justify-start"
          role="main"
        >
          {/* Logo */}
          <a
            href="https://www.shadcnblocks.com"
            aria-label="Go to Shadcn Blocks website"
          >
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg"
              alt="Mesfinances logo"
              className="h-10"
            />
          </a>

          {/* Form card */}
          <form
            onSubmit={handleSubmit}
            aria-labelledby="register-title"
            aria-describedby="register-description"
            aria-busy={loading}
            className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md"
          >
            <h1 id="register-title" className="text-xl font-semibold">
              Create Account
            </h1>
            <p id="register-description" className="sr-only">
              Enter your email and password to create a new account.
            </p>

            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                aria-required="true"
                aria-invalid={!!error}
                required
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
                aria-required="true"
                aria-invalid={!!error}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              aria-label="Submit registration form"
            >
              {loading ? "Creating..." : "Register"}
            </Button>

            {error && (
              <p
                className="text-red-500 text-sm text-center"
                role="alert"
                aria-live="assertive"
              >
                {error.message}
              </p>
            )}
            {data && (
              <p
                className="text-green-500 text-sm text-center"
                role="status"
                aria-live="polite"
              >
                Account created for {data.register.user.email}
              </p>
            )}
          </form>

          <div
            className="text-muted-foreground flex justify-center gap-1 text-sm"
            aria-label="Already have an account section"
          >
            <p>Already have an account?</p>
            <a
              href="/login"
              className="text-primary font-medium hover:underline"
              aria-label="Go to login page"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
