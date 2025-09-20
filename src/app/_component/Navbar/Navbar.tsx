"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/app/context/CartContext";

export default function Navbar() {
const { numberOfCartitem } = useContext(CartContext)!;
  const { data: session } = useSession();

  function handleSignOut() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <nav className="bg-green-600 text-white">
      <div className="container w-full lg:w-[80%] mx-auto p-4 flex flex-col lg:flex-row gap-4 justify-between items-center">
        <div className="left">
          <ul className="flex gap-4 lg:gap-6 items-center">
            <li className="text-2xl items-center flex">
              <Link href="/">
                <i className="fa-solid fa-cart-shopping"></i>FreshCard
              </Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>

            {session && (
              <li>
                <Link className="relative" href="/cart">
                  Cart
                  {numberOfCartitem>0&& <span className="absolute top-[-15] end-[-10] flex size-5 justify-center items-center rounded-full bg-white text-emerald-600">
                    {numberOfCartitem}
                  </span>}
                </Link>
              </li>
            )}

            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/wishlist">wishlist</Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href="/brand">Brand</Link>
            </li>
          </ul>
        </div>

        <div className="right">
          <ul className="flex gap-4 items-center">
            {!session ? (
              <>
                <li>
                  <Link href="">
                    <i className="fab fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <i className="fab fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <i className="fab fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <i className="fab fa-linkedin"></i>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <i className="fab fa-github"></i>
                  </Link>
                </li>
                <li></li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
                <li>
                  <Link href="/login">login</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <span className="cursor-pointer" onClick={handleSignOut}>
                    Signout
                  </span>
                </li>
                {session && <li>Hi {session?.user?.name}</li>}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
