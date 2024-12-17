import { useParams } from "react-router-dom";

import Ad from "../components/Ad";
import Loader from "../components/Loader";
import { useQuery } from "@apollo/client";
import { GET_ADS_BY_CATEGORY_ID } from "../services/queries";

export default function CategoryPage() {
  const { id } = useParams();

  const { loading, data } = useQuery(GET_ADS_BY_CATEGORY_ID, {
    variables: { readCategoryId: id as string },
    fetchPolicy: "cache-and-network",
  });

  const categorizedAds = data?.readCategory?.ads;

  console.log(categorizedAds);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="recent-ads">
      {categorizedAds?.map((categorizedAd) => (
        <section className="ad-card-container" key={categorizedAd.id}>
          <Ad
            title={categorizedAd.title}
            picture={categorizedAd.picture}
            price={categorizedAd.price}
            id={Number(categorizedAd.id)}
            description={categorizedAd.description}
            location={categorizedAd.location}
            owner={categorizedAd.owner}
          />
        </section>
      ))}
    </div>
  );
}
