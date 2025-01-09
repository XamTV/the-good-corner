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
    <div className="bg-orange-100 rounded-lg p-4">
      <h2 className="text-orange-400 font-bold text-2xl mx-3 my-2">
        Annonces récentes
      </h2>

      <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
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
              tags={ad.tags}
            />
          ))
          .reverse()}
      </section>
    </div>
  );
}
