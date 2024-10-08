import { SignupForm } from "@/components/signupPage";
import React from "react";

export default function page() {
  return (
    <div className="bg-gradient-to-b min-w-screen lg:p-16 md:p-16 p-4 pt-16 min-h-screen from-gray-900 to-black">
      <div className="max-w-sm mx-auto  bg-gradient-to-b from-gray-900 to-black">
        <SignupForm />
      </div>
    </div>
  );
}
