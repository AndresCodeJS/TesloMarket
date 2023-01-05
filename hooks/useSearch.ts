import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IOrder, IProduct } from "../interfaces";
import Cookie from "js-cookie";
import { dbProducts } from "../database";
import { Product } from "../models";

type SearchTerm =  string | string[] | undefined

export const useSearch = (url:string,
    searchTerm:SearchTerm
): [product: IProduct[],searching:boolean] => {
  const [products, setProducts] = useState(
    [{
        _id: '',
        description: '',
        images: [''],
        inStock: 0,
        price: 0,
        slug: '',
        tags: [''],
        title: '',
        gender:'unisex',
        type:'shirts',
        sizes: []
    }]
  );

  const [searching, setSearching] = useState(true)

  const router = useRouter();

  useEffect(() => {
    getProducts()
  }, [url]);


  const getProducts = async () => {
  
    try {
       
        
        const {data} = await axios.post(url);
        console.log('el resultado es:',data )
        if(!data){
            return
        }
        setProducts( data )
        setSearching(false)
    } catch (error) {
        setSearching(false)
      console.log(error);
      router.replace("/");
    }
  };

  return [products,searching];
};
