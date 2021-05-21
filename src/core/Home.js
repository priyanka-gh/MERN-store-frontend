import React, {useState,useEffect} from 'react';
import "../styles.css";

import Base from "./Base";
import Card from './Card';
import { getProducts } from './helper/coreapicalls';



export default function Home() {
    const [products,setProducts]=useState([]);
    const [error,setError]=useState(false)

    const loadAllProducts=()=>{
        getProducts().then(data=>{
            if(data.error){
                setError(data.error);
            }else{
                setProducts(data);
            }
        })
    }
    useEffect(()=>{
        loadAllProducts()
    },[])
    return (
        <Base  description="Welcome to the Tshirt store">
            <div className="row text-center">
                <div className="row">
                    {products.map((product,index)=>{
                        return(
                            <div key={index} className="col-3 " >
                                <Card product={product}></Card>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    );
}
