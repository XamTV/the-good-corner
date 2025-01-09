import { Link } from "react-router-dom";
import { AdProps } from "./RecentAds";

export default function Ad({
  title,
  id,
  picture,
  price,
  tags,
  onAddToCart,
}: AdProps & { onAddToCart?: () => void }) {
  return (
    <div className=" w-72  bg-white rounded-lg flex-col drop-shadow-xl">
      <Link to={`/ads/${id}`}>
        <div className="flex absolute mt-2 ml-2 ">
          {tags?.map((tag) => (
            <p
              className="text-sm bg-green-200 opacity-85 py-1 px-2  ml-1 rounded-xl font-medium drop-shadow-xl"
              key={tag.id}
            >
              {tag.title}
            </p>
          ))}
        </div>
        <img
          className="w-72 h-40 object-cover rounded-t-lg"
          src={picture}
          alt={title}
        />
        <div className="m-2  justify-between">
          <div className="font-bold text-lg">{title} </div>
          <div className="">{price / 100}€</div>
        </div>
        <section className=" flex flex-row-reverse justify-between  items-center flex-wrap mx-2">
          <button
            className="border-2 border-orange-400 rounded-lg font-bold text-orange-400  p-2 mb-2 px-5"
            onClick={onAddToCart}
          >
            En savoir plus
          </button>
        </section>
      </Link>
    </div>
  );
}
