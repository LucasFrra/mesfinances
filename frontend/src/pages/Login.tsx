import { gql } from "@apollo/client";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/AuthContext";
import { useMutation } from "@apollo/client/react";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      session {
        access_token
      }
      user {
        email
      }
    }
  }
`;

type LoginResponse = {
  login: {
    session: { access_token: string | null };
    user: { email: string };
  };
};

export default function Login() {
  const navigate = useNavigate();
  const { login: saveToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation, { loading, error }] =
    useMutation<LoginResponse>(LOGIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginMutation({ variables: { email, password } });
      const token = res.data?.login.session?.access_token;

      if (token) {
        saveToken(token);
        navigate("/dashboard");
      } else {
        alert("Please confirm your email before logging in.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="bg-muted h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg"
          alt="MesFinances logo"
          className="h-10"
        />

        <form
          onSubmit={handleSubmit}
          className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md"
        >
          <h1 className="text-xl font-semibold">Sign in</h1>

          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in..." : "Login"}
          </Button>

          <div className="flex items-center w-full my-2">
            <div className="grow border-t border-muted"></div>
            <span className="px-2 text-muted-foreground text-xs uppercase">
              or
            </span>
            <div className="grow border-t border-muted"></div>
          </div>

          <Button
            type="button"
            disabled
            className="w-full bg-muted text-muted-foreground hover:bg-muted cursor-not-allowed"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
              className="w-4 h-4 mr-2"
            />
            Continue with Google
          </Button>

          {error && (
            <p className="text-red-500 text-sm text-center" role="alert">
              {error.message}
            </p>
          )}
        </form>

        <div className="text-muted-foreground flex justify-center gap-1 text-sm">
          <p>Don't have an account?</p>
          <Link
            to="/register"
            className="text-primary font-medium hover:underline"
          >
            Create one
          </Link>
        </div>
      </div>
    </section>
  );
}
