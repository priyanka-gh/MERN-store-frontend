import React, {useState,useEffect} from 'react';
import "../styles.css";

import Base from "./Base";
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import Paymentb from './Paymentb';



 const Cart=()=> {
    const [products,setProducts]=useState([]);

    const [reload,setReload]=useState(false)
    useEffect(()=>{
        setProducts(loadCart)
    },[reload])

    const loadAllProducts=(products)=>{
        return (
            <div>
                {products.map((product,index)=>(
                    <Card
                    key={index}
                    product={product}
                    removeFromCart={true}
                    addtoCart={false}
                    setReload={setReload}
                    reload={reload}>
                    </Card>
                ))}
            </div>
        )
    }

    const loadCheckout=()=>{
        return (
            <div>
                <h2>Load Checkout</h2>
            </div>
        )
    }

    return (
        <Base  description="Ready to Checkout">
            <div className="row text-center">
                    <div className="photo col-6">
                        {products.length>0?(
                            loadAllProducts(products)
                            ):(
                                <h3>NO products in cart</h3>
                            )}
                    </div>
                    {/* <div className="col-6">
                        <StripeCheckout
                        products={products}
                        setReload={setReload}>
                        </StripeCheckout>
                    </div> */}
                    <div className="col-1"></div>
                    <div className="col-5"><Paymentb products={products} setReload={setReload}></Paymentb></div>
            </div>
        </Base>
    );
}


export default Cart;