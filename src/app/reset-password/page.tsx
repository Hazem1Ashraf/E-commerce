"use client"; // مهم جداً يكون أول سطر

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordApi } from "@/api/resetPassword.api";

export default function ResetPasswordPageWrapper() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResetPasswordPage />
    </Suspense>
  );
}

function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEmail(searchParams.get("email") || "");
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await resetPasswordApi(email, newPassword);
      router.push("/login");
    } catch {
      setError("Can't reset the password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Reset your password</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          placeholder="example@mail.com"
          required
        />

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          placeholder="New password"
          required
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
