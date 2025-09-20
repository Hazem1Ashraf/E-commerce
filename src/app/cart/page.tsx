"use client";
import ClearCartItem from "@/CartAction/clearCartItem.action";
import getLoggedUserCart from "@/CartAction/getUserCart.action";
import RemoveItemFromCart from "@/CartAction/removeCartItem.action";
import UpdateCartQuantity from "@/CartAction/updateCartQuantity.action";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import { toast } from "sonner";
import { CartContext } from "../context/CartContext";
import { CartProductType } from "./../../types/cart.type";
import Link from "next/link";

export default function Cart() {
const [products, setProducts] = useState<CartProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [removeDesible, setremoveDesible] = useState(false);
  const [updateDesible, setupdateDesible] = useState(false);
const { numberOfCartitem, setnumberOfCartitem } = useContext(CartContext)!;

  const [cartId, setcartId] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const totalPrice = products.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  async function getUserCart() {
    try {
      setLoading(true);
      const res = await getLoggedUserCart();
      if (res.status === "success") {
        setProducts(res.data.products);
        setLoading(false);
        setcartId(res.cartId);
      }
    } catch {
      toast.error("❌ Error loading cart", {
        duration: 2000,
        position: "top-center",
      });
    }
  }

  async function deleteProduct(id: string) {
    try {
      setremoveDesible(true);
      const res = await RemoveItemFromCart(id);

      if (res.status === "success") {
        setProducts(res.data.products);
        toast.success("Product Deleted Successfully", {
          duration: 2000,
          position: "top-center",
        });
        let sum = 0;
        res.data.products.forEach((product: CartProductType) => {
          sum += product.count;
        });
        setnumberOfCartitem(sum);
        setremoveDesible(false);
      } else {
        toast.error("Can't delete the product", {
          duration: 2000,
          position: "top-center",
        });
        setremoveDesible(false);
      }
    } catch {
      toast.error("Error deleting product", {
        duration: 2000,
        position: "top-center",
      });
    }
  }

  async function updateProduct(id: string, count: string, sign: string) {
    try {
      setupdateDesible(true);
      const res = await UpdateCartQuantity(id, count);

      if (res.status === "success") {
        setProducts(res.data.products);
        toast.success("Product Updated Successfully", {
          duration: 2000,
          position: "top-center",
        });
        if (sign === "+") {
          setnumberOfCartitem(numberOfCartitem + 1);
        } else if (sign === "-") {
          setnumberOfCartitem(numberOfCartitem - 1);
        }
        setupdateDesible(false);
      } else {
        toast.error("Can't update the product", {
          duration: 2000,
          position: "top-center",
        });
        setupdateDesible(false);
      }
    } catch {
      toast.error("❌ Error updating product", {
        duration: 2000,
        position: "top-center",
      });
    }
  }

  async function deleteCartItem() {
    try {
      const res = await ClearCartItem();
      if (res.message === "success") {
        setProducts([]);
        toast.success("Product Updated Successfully", {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch {
      toast.error("Error clearing cart", {
        duration: 2000,
        position: "top-center",
      });
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="ml-3 text-lg text-gray-600">Loading cart...</span>
      </div>
    );
  }

  if (!products.length) {
    return (
      <p className="text-center text-gray-600 text-lg mt-10">
        Your cart is empty 🛒
      </p>
    );
  }
  return (
    <>
      <div className="overflow-x-auto sm:rounded-lg">
        <div className="w-3/4 mx-auto my-12">
          <div className="w-4/4 mt-4 p-4 flex items-center justify-between font-bold text-lg border-t">
            <span>Total:</span>
            <span>${totalPrice}</span>
            <Button
              onClick={() => deleteCartItem()}
              className="cursor-pointer my-0 text-white bg-red-600 hover:bg-red-800 px-4 py-2 rounded"
            >
              Clear Cart
            </Button>
          </div>

          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3 text-center">Qty</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item: CartProductType) => (
                <tr
                  key={item._id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="p-2 md:p-4 flex justify-center items-center">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={80}
                      height={80}
                      className="object-cover rounded-lg "
                    />
                  </td>

                  <td className="px-4 py-4 font-semibold text-gray-900 text-center">
                    {item.product.title}
                  </td>

                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() =>
                          updateProduct(
                            item.product._id,
                            `${item.count - 1}`,
                            "-"
                          )
                        }
                        disabled={updateDesible}
                        className={`w-3/4 text-lg font-bold px-2 py-1 border rounded-full hover:bg-gray-600 ${
                          updateDesible
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`}
                      >
                        {updateDesible ? (
                          <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin inline-block"></span>
                        ) : (
                          "-"
                        )}
                      </button>

                      <span className="w-3/4 text-centerrounded-lg text-gray-900 text-sm">
                        {item.count}
                      </span>

                      <button
                        onClick={() =>
                          updateProduct(
                            item.product._id,
                            `${item.count + 1}`,
                            "+"
                          )
                        }
                        disabled={updateDesible}
                        className={`w-3/4 text-lg font-bold px-2 py-1 border rounded-full hover:bg-gray-600 ${
                          updateDesible
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`}
                      >
                        {updateDesible ? (
                          <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin inline-block"></span>
                        ) : (
                          "+"
                        )}
                      </button>
                    </div>
                  </td>

                  <td className="px-4 py-4 font-semibold text-gray-900 text-center">
                    ${item.price * item.count}
                  </td>

                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => deleteProduct(item.product._id)}
                      disabled={removeDesible}
                      className={`font-medium text-red-600 hover:underline ${
                        removeDesible
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                    >
                      {removeDesible ? (
                        <span className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin inline-block"></span>
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!showOptions ? (
            <Button
              onClick={() => setShowOptions(true)}
              className="w-full text-white bg-blue-600 hover:bg-blue-800 px-4 py-3 rounded-lg"
            >
              Checkout
            </Button>
          ) : (
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <Link href={`/checkout/${cartId}`} className="w-full">
                <Button className="w-full text-white bg-blue-600 hover:bg-blue-800 px-4 py-3 rounded-lg">
                  Checkout (Visa)
                </Button>
              </Link>

              <Link href={`/cashOnDelivery/${cartId}`} className="w-full">
                <Button className="w-full text-white bg-green-600 hover:bg-green-800 px-4 py-3 rounded-lg">
                  Cash on Delivery
                </Button>
              </Link>

              
            </div>
          )}
        </div>
      </div>
    </>
  );
}
