import Image from "next/image";
import Right from "../icons/Right";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="hero md:mt-4">
            <div className="py-8 md:py-12">
                <h1 className="text-4xl font-bold ">
                    Everything <br />
                    is better<br />
                    with a&nbsp;
                    <span className="text-primary">
                         Pizza
                    </span>
                </h1>
                <p className="my-6 text-gray-500 text-sm">
                    Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life
                </p>
                <div className="flex gap-4 text-sm">
                    <button className="bg-primary uppercase  flex gap-2 items-center justify-center text-white  px-4 py-2 rounded-full">
                        <Link href={"/menu"}>Order now </Link><Right />
                    </button>
                    {/* <button className="flex border-0 gap-2 py-2 items-center text-gray-600 font-semibold rounded-full ">
                        Learn more <Right />
                    </button> */}
                </div>
            </div>
            <div className="relative hidden md:block">
                <Image src={'/pizza.png'} alt={'Pizza image'} layout="fill" objectFit="contain" />
            </div>
        </section>
    );
}