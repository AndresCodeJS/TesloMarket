import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Cookie from "js-cookie";
import { IProduct } from "../interfaces";

export const useAllProducts = (
  url: string
): [products: IProduct[], getProducts: () => void] => {
  const [products, setProducts] = useState([
    {
      _id: '',
      description: '',
      images: [],
      inStock: 0,
      price: 0,
      slug: '',
      tags: [],
      title: '',
      gender:'',
      type:'shirts',
      sizes: []
    },
  ]);

  const router = useRouter();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
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

      const productsAux = data.products;

      if (! productsAux) {
        return;
      }

      setProducts( productsAux);
    } catch (error) {
      console.log(error);
      router.replace("/");
    }
  };

  return [products, getProducts];
};