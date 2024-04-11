/* eslint-disable react/jsx-key */
"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { dbTimeForHuman } from "@/libs/datetime-functions";
import Link from "next/link";
import Loader from "@/components/layout/Loader";
export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, data: profile } = useProfile();
  useEffect(() => {
    fetchOrders(); 
  }, []);
  function fetchOrders() {
    setLoadingOrders(true);
    fetch("/api/orders").then((res) => {
      res.json().then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
    });
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8">
        {loadingOrders && (
          <div className="">
            {" "}
            <Loader />
          </div>
        )}
        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-100 p-4 mb-2 rounded-lg flex flex-col md:flex-row items-center  gap-6"
            >
              <div className="flex flex-col md:flex-row gap-6 grow items-center">
                <div className="">
                  <div
                    className={
                      (order.paid ? "bg-green-500" : "bg-red-400") +
                      " p-2 text-white rounded-md w-24 text-center"
                    }
                  >
                    {order.paid ? "Paid" : "Not paid"}
                  </div>
                </div>
                <div className="grow">
                  <div className="flex gap-2 mb-1 items-center">
                    <div className="grow ">{order.userEmail}</div>
                    <div className="text-gray-500 text-sm ">
                      {dbTimeForHuman(order.createdAt)}
                    </div>
                  </div>
                  {/* <div className="text-gray-500 text-xs">

                    {order.cartProducts.map((p) => p.name).join(", ")}
                  </div> */}
                  {order?.cartProducts?.length > 0 && (
                    <div className="text-gray-500 text-xs">
                      {order.cartProducts.map((p) => p.name).join(", ")}
                    </div>
                  )}
                </div>
              </div>
              <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                <Link href={"/orders/" + order._id} className="button">
                  Show order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
