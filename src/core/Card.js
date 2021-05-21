import React ,{useState,useEffect}from 'react'
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper'
import {Redirect} from 'react-router-dom'
import './card.css'
    const Card = ({product,
        addtoCart=true,
        removeFromCart=false,
        setReload=f=>f,
        reload=undefined
    }) => {
      const [redirect,setRedirect]=useState(false)
      const [count,setCount]=useState(product.count)
      const cardTitle=product?product.name:"A photo from pexels"
      const cardDescription=product?product.description:"A photo from pexels"
      const cardPrice=product?product.price:"A photo from pexels"

      const addToCart=()=>{
        addItemToCart(product,()=>setRedirect(true))
      }

      const getARedirect=(redirect)=>{
        if(redirect){
          return <Redirect to ="/cart"></Redirect>
        }
      }
        const showAddToCart=addtoCart=>{
            return(
                addtoCart&&(
                    <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                  >
                    Add to Cart
                  </button>
                )
            )
        }
        const showRemoveFromCart=(removeFromCart)=>{
            return(
                removeFromCart&&(
                    <button
                    onClick={() => {
                      removeItemFromCart(product._id);
                      setReload(!reload)
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                  >
                    Remove from cart
                  </button>
                )
            )

        }
        return (
          <div className="card text-dark border-info" >
            <div className="card-header  text-dark">{cardTitle}</div>
            <div className="card-body " >
              {getARedirect(redirect)}
              <ImageHelper product={product}></ImageHelper>
              <p className="lead bg-info font-weight-normal text-wrap rounded">
                {cardDescription}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
              <div className="row">
                <div className="col-12">
                  {showAddToCart(addtoCart)}
                </div>
                <div className="col-12">
                  {showRemoveFromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };


export default Card