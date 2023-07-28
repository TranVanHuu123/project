import { useState } from "react";
import iconcheck from "../assets/images/check.png";

const Card = ({ shoes, handleAddToCart }) => {
  const [click, setClick] = useState(true);

  return (
    <div className="">
      <div className="flex flex-col justify-between h-full p-3 ">
        <div
          style={{ backgroundColor: shoes.color }}
          className={`h-[300px] relative flex justify-center items-center  rounded-2xl`}
        >
          <img
            className="object-cover absolute  h-[400px] -skew-y-[18deg] "
            src={shoes.image}
            alt="omg"
          ></img>
        </div>
        <h1 className="mt-3 text-2xl font-bold text-left">{shoes.name}</h1>
        <p className="mt-3 text-xs text-left">{shoes.description}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="text-xl font-bold">
            <span>$</span>
            <span>{shoes.price}</span>
          </div>

          {click ? (
            <button
              onClick={() => {
                handleAddToCart(shoes.id);
                setClick(false);
              }}
              className="px-4 py-3 font-bold bg-Yellow rounded-3xl"
            >
              ADD TO CART
            </button>
          ) : (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-Yellow">
              <img className="w-8 h-8" src={iconcheck} alt=""></img>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
