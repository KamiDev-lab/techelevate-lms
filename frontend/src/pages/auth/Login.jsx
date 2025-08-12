import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useLoginUserMutation } from "@/features/api/authApi";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password) {
      toast.error("Email and password are required.");
      return;
    }
     console.log(input)
    try {
      const res = await login(input).unwrap();
      toast.success(res?.message || "Login successful");
      // Save token or user to localStorage if needed
      // localStorage.setItem("token", res.token);
      navigate("/"); // or wherever you want to go
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md border border-gray-200 rounded-md p-6 shadow-md"
      >
        <h1 className="font-bold text-2xl mb-5 text-center">Login</h1>

        <div className="my-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="kamran@gmail.com"
            required
          />
        </div>

        <div className="my-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="Your password"
            required
          />
          <Link to="/forgot-password">
            <p className="text-red-500 hover:underline text-sm font-semibold text-right mt-1">
              Forgot Password?
            </p>
          </Link>
        </div>

        {isLoading ? (
          <Button disabled className="w-full my-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </Button>
        ) : (
          <Button type="submit" className="w-full my-4">
            Login
          </Button>
        )}

        <p className="text-sm text-center mt-2">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
