/* eslint-disable @next/next/no-img-element */
import AddToCartButton from "@/components/menu/AddToCartButton"
export default function MenuItemTile({onAddToCart,...item}){
    const {
      image,
      name,
      description,
      basePrice,
      sizes,
      extraIngredientPrices,
    } = item;
    const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0;
    return (
      <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25">
        <div className="text-center">
          <img src={image} className=" max-h-24 block mx-auto" alt="pizza" />
        </div>

        <h4 className="font-bold my-3 text-xl">{name}</h4>
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
        <AddToCartButton hasSizesOrExtras={hasSizesOrExtras} image={image} onClick={onAddToCart} basePrice={basePrice} />
      </div>
    );
}