import { useState } from "react";
import Ad from "./Ad";
import { useQuery } from "@apollo/client";
import { GET_ADS } from "../services/queries";
import { CategoryType } from "./CategoryEditor";
import { TagType } from "./TagEditor";

export type AdProps = {
  id: number;
  title: string;
  description: string;
  location: string;
  owner: string;
  price: number;
  picture: string;
  category?: CategoryType;
  tags?: TagType[];
};

export default function RecentAds() {
  const [amount, setAmount] = useState(0);

  const { loading, data } = useQuery(GET_ADS, {
    fetchPolicy: "cache-and-network",
  });

  const ads = data?.readAds;
  console.log(ads);

  if (loading) {
    return <p>Chargement...</p>;
  }
  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Montant du panier : {(amount / 100).toFixed(2)} € </p>
      <section className="recent-ads">
        {ads
          ?.map((ad) => (
            <Ad
              key={ad.id}
              onAddToCart={() => setAmount(amount + ad.price)}
              title={ad.title}
              picture={ad.picture}
              price={ad.price}
              id={Number(ad.id)}
              description={ad.description}
              owner={ad.owner}
              location={ad.location}
            />
          ))
          .reverse()}
      </section>
    </>
  );
}
