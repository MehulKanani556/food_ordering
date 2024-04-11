"use client";
// import SectionHeader from "@/components/layout/SectionHeader";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

// export default function Forgot() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const session = useSession();
//   const [user, setUser] = useState(null);
//   const { status } = session;
//   const [password, setPassword] = useState('');
//   const [conPassword, setConPassword] = useState('');

//   useEffect(() => {
//     if (status === "authenticated") {
//       fetch("/api/profile").then((response) => {
//         response.json().then((data) => {
//           setUser(data);
//         });
//       });
//     }
//   }, [session, status]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
// if (password !== conPassword) {
//   setMessage("Passwords do not match. Please try again.");
//   return;
// }
//     try {
//       console.log("Reset email sent to:", email);

      
//     } catch (error) {
//       console.error("Error sending reset email:", error);
//       setMessage("An error occurred. Please try again later.");
//     }
//   };
//   return (
//     <section className="mt-8">
//       <div className="max-w-xl mx-auto">
//         <div className="flex justify-center">
//           <SectionHeader mainHeader={"Forgot Password"}></SectionHeader>
//         </div>
//         <form className="mt-8" onSubmit={handleSubmit}>
//           <label>Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={user?.email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <label>Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <label>Confirm password:</label>
//           <input
//             type="password"
//             id="cnpass"
//             value={conPassword}
//             onChange={(e) => setConPassword(e.target.value)}
//             required
//           />
//           {message && <p>{message}</p>}
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </section>
//   );
// }

import React, { useEffect, useState } from "react";
import SectionHeader from "@/components/layout/SectionHeader";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function Forgot() {
  const [message, setMessage] = useState("");
  const session = useSession();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(user?.email || '');
  const { status } = session;
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [conPasswordError, setConPasswordError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile")
        .then((response) => {
          response.json().then((data) => {
            setUser(data);
          });
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [session, status]);

  const validatePassword = (value) => {
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setConPasswordError("Passwords do not match");
    } else {
      setConPasswordError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
    validateConfirmPassword(conPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConPassword(value);
    validateConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any validation errors
    if (passwordError || conPasswordError) {
      setMessage("Please fix the errors before submitting.");
      return;
    }else{
      const savingPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/forgot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({password}),
        });
        if (response.ok) resolve();
        else reject();
      });
      await toast.promise(savingPromise, {
        loading: "Changing...",
        success: "Password Changed!",
        error: "Error",
      });
    }
    
   
  };

  return (
    <section className="mt-8">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-center">
          <SectionHeader mainHeader={"Forgot Password"}></SectionHeader>
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            id="email"
            value={user?.email} // Set value to the state variable directly
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          {passwordError && (
            <span className="text-red-500">
              {passwordError}
              <br />
            </span>
          )}
          <label>Confirm password:</label>
          <input
            type="password"
            id="cnpass"
            value={conPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {conPasswordError && (
            <span className="text-red-500">{conPasswordError}</span>
          )}
          <button type="submit">Submit</button>
          {message && <p className="mt-4">{message}</p>}
        </form>
      </div>
    </section>
  );
}
