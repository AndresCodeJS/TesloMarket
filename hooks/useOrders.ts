import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IOrder } from "../interfaces";
import Cookie from "js-cookie";

export const useOrders = (
  url: string
): [orders: IOrder[], getOrder: () => void] => {
  const [orders, setOrders] = useState([
    {
      orderItems: [
        {
          _id: "",
          title: "",
          size: "",
          quantity: 0,
          slug: "",
          image: "",
          price: 0,
          gender: "",
        },
      ],
      user:{
        _id:'',
        email:'',
        name:''
      },
      shippingAddress: {
        firstName: "",
        lastName: "",
        address: "",
        zip: "",
        city: "",
        country: "",
        phone: "",
      },
      numberOfItems: 0,
      subTotal: 0,
      tax: 0,
      total: 0,
      isPaid: false,
    },
  ]);

  const router = useRouter();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    console.log("EL TOKEN ES:", Cookie.get("token"));

    console.log('LA URL ES ', url)

    try {
      if (!Cookie.get("token")) {
        return;
      }
      const { data } = await axios.post(url, {
        token: Cookie.get("token"),
      });

      console.log("el resultado es", data);

      const ordersAux = data.orders;

      if (!ordersAux) {
        return;
      }

      setOrders(ordersAux);
    } catch (error) {
      console.log(error);
      router.replace("/");
    }
  };

  return [orders, getOrders];
};
