import React from "react";
import Link from "next/link";
import Image from "next/image";
import notFoundImage from "../../public/NotFound.jpg";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-3xl mb-8">
        <Image
          src={notFoundImage}
          alt="Not Found"
          className="w-full"
          priority
        />
      </div>

      <h1 className="text-5xl font-extrabold text-gray-800 mb-3">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you are looking for doesn’t exist.
      </p>

      <Link
        href="/"
        className="px-6 py-3 bg-gray-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}
