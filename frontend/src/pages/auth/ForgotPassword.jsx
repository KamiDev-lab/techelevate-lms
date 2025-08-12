import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { useForgotPasswordMutation } from '@/features/api/authApi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Please enter your email");

    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res?.message || "Reset link sent successfully");
      setEmail(""); // optional: reset field
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
        <form
          onSubmit={handleForgotPassword}
          className="w-full max-w-md border border-gray-200 rounded-md p-6 shadow-sm"
        >
          <h1 className="font-bold text-2xl mb-5 text-center">Forgot Password</h1>

          <div className="mb-4">
            <Label htmlFor="email">Enter your email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {isLoading ? (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
