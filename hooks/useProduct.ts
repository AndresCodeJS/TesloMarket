import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IProduct } from "../interfaces";

export const useProduct = (url:string,
 slug:any
): [product: IProduct, getOrder: () => void, isNew:boolean] => {
  const [product, setProduct] = useState(
    {
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
    },
  );

  const [isNew, setIsNew] = useState(false)

  const router = useRouter();

  /* const { slug = ''} = query; */

  

  useEffect(() => {
    if(slug!=='new'){
    getProduct();
    }else{
    setIsNew(true)
    }
  }, []);


  const getProduct = async () => {
  
    try {
        console.log('entra a getProduct con el url:',url,' y slug:', slug );
        
        const {data} = await axios.post(url);
        console.log('el resultado es:',data )
        if(!data){
            return
        }
        setProduct( data )
    } catch (error) {
      console.log(error);
      router.replace("/");
    }
  };

  return [product, getProduct, isNew];
};
