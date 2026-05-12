"use client";

import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/leads");
    } catch (err: any) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[#000B3D] rounded-[2.5rem] p-10 md:p-12 shadow-2xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-gray-400">Access your leads dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80 block ml-4">Email Address</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@designncode.com"
              className="w-full px-6 py-4 rounded-full bg-white text-black outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80 block ml-4">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-6 py-4 rounded-full bg-white text-black outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center px-4">{error}</p>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-white text-[#000B3D] rounded-full font-bold text-lg hover:bg-gray-100 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-[#000B3D] border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => router.push("/")}
            className="text-white/60 hover:text-white transition-colors text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </main>
  );
}
