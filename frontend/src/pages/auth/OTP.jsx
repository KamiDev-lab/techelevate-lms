import { useState, useEffect } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
InputOTP,
InputOTPGroup,
InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
useResendOtpMutation,
useVerifyOtpMutation,
} from "@/features/api/authApi";

const OTP = () => {
const [otp, setOtp] = useState("");
const [loading, setLoading] = useState(false);
const [timer, setTimer] = useState(0);

const navigate = useNavigate();
const [searchParams] = useSearchParams();
const email = searchParams.get("email");

const [verifyOtp] = useVerifyOtpMutation();
const [resendOtp] = useResendOtpMutation();

const handleChange = (value) => {
setOtp(value);
};

const submitHandler = async (e) => {
e.preventDefault();

if (otp.length !== 6) {
  toast.error("OTP must be 6 digits.");
  return;
}

try {
  setLoading(true);
  const res = await verifyOtp({ token: otp }).unwrap();
  toast.success(res?.message || "OTP verified successfully");
  navigate("/");
} catch (err) {
  toast.error(err?.data?.message || "Invalid OTP");
} finally {
  setLoading(false);
}
};

const resendHandler = async () => {
try {
await resendOtp({ email }).unwrap();
toast.success("OTP resent to your email");
setTimer(60); // Restart the timer
// eslint-disable-next-line no-unused-vars
} catch (error) {
toast.error("Failed to resend OTP");
}
};

// Timer logic
useEffect(() => {
let interval;
if (timer > 0) {
interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
}
return () => clearInterval(interval);
}, [timer]);

return (
<div className="flex items-center justify-center min-h-screen px-4">
<form
onSubmit={submitHandler}
className="w-full max-w-md border p-6 rounded-md shadow-md flex flex-col items-center"
>
<h1 className="font-bold text-2xl mb-2 text-center">Verify OTP</h1>
<p className="text-sm text-gray-500 mb-6 text-center">A verification token has been sent to your email.</p>

    <InputOTP
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      value={otp}
      onChange={handleChange}
    >
      <InputOTPGroup>
        {Array.from({ length: 6 }).map((_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>

    {loading ? (
      <Button className="w-2/3 mt-6" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Verifying...
      </Button>
    ) : (
      <Button type="submit" className="w-[40%] mt-6">
        Verify OTP
      </Button>
    )}

    <p className="text-sm mt-4 text-center">
      Didn&apos;t get an OTP?{" "}
      {timer > 0 ? (
        <span className="text-gray-500">Resend in {timer}s</span>
      ) : (
        <span onClick={resendHandler} className="text-blue-600 cursor-pointer">
          Resend
        </span>
      )}
    </p>
    <p className="text-sm text-center mt-2">
      <Link to="/login" className="text-blue-600">
        Back to Login
      </Link>
    </p>
  </form>
</div>
);
};

export default OTP;