import { Link } from "react-router-dom";
import { AdProps } from "./RecentAds";

export default function Ad({
  title,
  id,
  picture,
  price,
  onAddToCart,
}: AdProps & { onAddToCart?: () => void }) {
  return (
    <div className="ad-card-container">
      <Link className="ad-card-link" to={`/ads/${id}`}>
        <img className="ad-card-image" src={picture} alt={title} />
        <div className="ad-card-text">
          <div className="ad-card-title">{title} </div>
          <div className="ad-card-price">{(price / 100).toFixed(2)} €</div>
        </div>
      </Link>
      {onAddToCart && (
        <button className="button" onClick={onAddToCart}>
          Ajouter au panier
        </button>
      )}
    </div>
  );
}
