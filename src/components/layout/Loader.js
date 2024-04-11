import Image from "next/image";

export default function Loader(){
    return (
      <div className="spinner-div">
        <div className="spinner">
          <Image
            src={"/1.png"}
            width={50}
            height={50}
            className="pizza-part pizza-part-1"
          />
          <Image
            src={"/1.png"}
            width={50}
            height={50}
            className="pizza-part pizza-part-2"
          />
          <Image
            src={"/1.png"}
            width={50}
            height={50}
            className="pizza-part pizza-part-3"
          />
          <Image
            src={"/1.png"}
            width={50}
            height={50}
            className="pizza-part pizza-part-4"
          />
        </div>
      </div>
    );
}