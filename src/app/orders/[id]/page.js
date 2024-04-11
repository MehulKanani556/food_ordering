/* eslint-disable react/jsx-key */
"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeader from "@/components/layout/SectionHeader";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AddressInputs from "@/components/layout/AddressInputs";
import CartProduct from "@/components/menu/CartProduct";
import Loader from "@/components/layout/Loader";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order,setOrder] = useState();
  const [loadingOrders, setLoadingOrders] = useState(true);

  const {id} = useParams();
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if(id){
      setLoadingOrders(true);
      fetch('/api/orders?_id=' + id).then(res =>{
        res.json().then(orderData =>{
          setOrder(orderData);
          setLoadingOrders(false);
        })
      })
    }
  }, []);
  let subtotal = 0;
  
  if(order?.cartProducts){
    for (const product of order?.cartProducts){
      subtotal += cartProductPrice(product);

    }
  }


  return (
    <section className="max-w-2xl mx-auto  mt-8">
      <div className="text-center">
        <SectionHeader mainHeader="Your order" />
        <div className="mt-4 mb-8">
          <p>Thank you for order.</p>
          <p>We will call you when your order will be on the way.</p>
        </div>
      </div>
      {loadingOrders && <div className=""> <Loader /></div>}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div className="">
            {order.cartProducts.map((product) => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500 ">
              Total :
              <span className="text-black font-bold ml-2">₹{subtotal}</span>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs disabled={true} addressProps={{ ...order }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
