"use client";
import Image from "next/image";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoginInProgress(true);
    
    await signIn('credentials',{email,password,callbackUrl:'/'});
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      callbackUrl:'/';
    }

   
    
    // Login successful, redirect or handle as needed
    setLoginInProgress(false); 

  }
  return (
    <section className="mt-8">
      <h1 className="text-center font-semibold text-primary text-4xl mb-4 ">
        Login
      </h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          name="email"
          disabled={loginInProgress}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          name="password"
          disabled={loginInProgress}
          onChange={(e) => setPassword(e.target.value)}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          
        />
        <button type="submit" disabled={loginInProgress}>
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          <Image src={"/google.png"} width={24} height={24} alt={""}></Image>
          Login with google
        </button>
      </form>
    </section>
  );
}
