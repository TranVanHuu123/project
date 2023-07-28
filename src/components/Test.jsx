import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost, removeProduct } from "../redux/showReducer";
import Card from "./Card";
import iconNike from "../assets/images/nike.png";
const Test = () => {
  const shoes = useSelector((state) => state.shoes.shoesList);
  const cartItems = useSelector((state) => state.shoes.cartItems);
  const [quantityMap, setQuantityMap] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [click, setClick] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      const quantity = quantityMap[item.id] || 1;
      total += item.price * quantity;
    });
    setTotalPrice(total);
  }, [cartItems, quantityMap]);

  const handleIncreaseQuantity = (productId) => {
    setQuantityMap((prevMap) => ({
      ...prevMap,
      [productId]: (prevMap[productId] || 1) + 1,
    }));
  };

  const handleDecreaseQuantity = (productId) => {
    setQuantityMap((prevMap) => {
      const newQuantity = Math.max((prevMap[productId] || 1) - 1, 0);
      if (newQuantity === 0) {
        const { [productId]: _, ...newMap } = prevMap;
        return newMap;
      } else {
        return {
          ...prevMap,
          [productId]: newQuantity,
        };
      }
    });
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeProduct(productId));
    setClick(true);
  };

  const handleAddToCart = (productId) => {
    dispatch(addPost(productId));
  };

  return (
    <div className="grid grid-cols-1 gap-8 mx-auto mt-8 md:grid-cols-2">
      <ProdustList
        shoes={shoes}
        click={click}
        handleAddToCart={handleAddToCart}
      ></ProdustList>
      <div>
        <ItermCarts
          totalPrice={totalPrice}
          cartItems={cartItems}
          handleDecreaseQuantity={handleDecreaseQuantity}
          quantityMap={quantityMap}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleRemoveItem={handleRemoveItem}
        ></ItermCarts>
      </div>
    </div>
  );
};

function ProdustList({ shoes, click, handleAddToCart }) {
  return (
    <div className="p-3 rounded-[28px] bg-white shadow-2xl overflow-auto h-[800px]">
      <div className="fixed z-10 flex w-full p-3 overflow-hidden ">
        <div className="">
          <img
            src={iconNike}
            alt="img"
            className="object-cover w-16 h-10"
          ></img>
          <h1 className="text-Black font-bold text-[2rem]">Our Products</h1>
        </div>
      </div>
      <div className="gap-6 grid-cols-1 grid mt-[100px]">
        {shoes.map((shoes) => (
          <Card
            click={click}
            handleAddToCart={handleAddToCart}
            shoes={shoes}
            key={shoes.id}
          ></Card>
        ))}
      </div>
    </div>
  );
}

function ItermCarts({
  totalPrice,
  cartItems,
  handleDecreaseQuantity,
  quantityMap,
  handleIncreaseQuantity,
  handleRemoveItem,
}) {
  return (
    <div className=" rounded-[28px] shadow-2xl p-3 bg-white overflow-auto h-[800px]">
      <div className="z-10 flex items-center justify-between w-full p-3 overflow-hidden ">
        <div className="">
          <img
            src={iconNike}
            alt="img"
            className="object-cover w-16 h-10"
          ></img>
          <h1 className="text-Black font-bold text-[2rem]">Our Products</h1>
        </div>
        <div className="text-3xl font-bold">
          <span>$</span>
          <span>{totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold">Your cart is empty.</h2>
        </div>
      ) : (
        cartItems?.map((item, index) => (
          <div key={index}>
            <div className="flex flex-row items-center mt-8 gap-x-8 md:gap-x-24 ">
              <div className="">
                <div
                  style={{ backgroundColor: item.color }}
                  className=" relative w-[100px] h-[100px] rounded-full"
                >
                  <img
                    className="absolute -top-[81px] left-0  w-[200px] h-[200px] -skew-y-[18deg] "
                    src={item.image}
                    alt=""
                  ></img>
                </div>
              </div>
              <div className="flex flex-col text-left md:gap-y-3 w-[200px]  md:w-[300px]">
                <h1 className="text-2xl font-bold">{item.name}</h1>
                <span className="text-3xl font-bold">${item.price}</span>
                <div className="flex justify-between gap-x-3">
                  <div className="flex items-center gap-x-3">
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="w-10 h-10 flex justify-center items-center rounded-full bg-[#eaeaea]"
                    >
                      <img className="w-6 h-6" alt="" src="./minus.png"></img>
                    </button>
                    <span className="text-xl font-bold">
                      {quantityMap[item.id] || 1}
                    </span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="w-10 h-10 flex justify-center items-center rounded-full bg-[#eaeaea]"
                    >
                      <img className="w-6 h-6" alt="" src="./plus.png"></img>
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-Yellow"
                  >
                    <img className="w-6 h-6" alt="" src="./trash.png"></img>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Test;
