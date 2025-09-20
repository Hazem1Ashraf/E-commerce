"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyResetCodeApi } from "@/api/verifyResetCode.api";

export default function VerifyResetCodePageWrapper() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyResetCodePage />
    </Suspense>
  );
}

function VerifyResetCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const e = searchParams.get("email") || "";
    setEmail(e);
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await verifyResetCodeApi(code);
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch {
      setError("Can't reset code now. Try again later.");
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
        <h2 className="text-xl font-bold mb-4">Enter verification code</h2>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          placeholder="e.g. 535863"
          required
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>
      </form>
    </div>
  );
}
