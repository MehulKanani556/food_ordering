/* eslint-disable react/jsx-key */
import Image from "next/image";
import Trash from "@/components/icons/Trash";
import { cartProductPrice } from "../AppContext";

export default function CartProduct({ product, onRemove }) {
  
  return (
    <div className="flex gap-4 border-b py-4 items-center">
      <div className="w-24">
        <Image src={product.image} width={240} height={240} alt="" />
      </div>
      <div className="grow">
        <h3 className="font-bold">{product.name}</h3>
        {product.size && (
          <div className="text-sm">
            Sizes : <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map((extra) => (
              <div key={extra._id}>
                {extra.name} ₹{extra.price}
              </div>
            ))}
          </div>
        )}
        
      </div>
      <div className="text-lg font-semibold">₹{cartProductPrice(product)}</div>
      {!!onRemove && (
        <div className="ml-2">
          <button className="p-2" type="button" onClick={ onRemove}>
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}
