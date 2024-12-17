import { useNavigate, useParams } from "react-router-dom";
import { AdProps } from "../components/RecentAds";
import Loader from "../components/Loader";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AD } from "../services/queries";
import { DELETE_AD } from "../services/mutations";

export default function AdPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading: loadingGet, data } = useQuery(GET_AD, {
    variables: { readAdId: id! }, // verify
  });

  const ad = data?.readAd;

  const [doDeleteAd, { loading: loadingDelete }] = useMutation<{
    deleteAd: AdProps;
  }>(DELETE_AD);

  function onUpdate() {
    navigate(`/ads/${id}/edit`);
  }

  async function doSubmit() {
    await doDeleteAd({
      variables: {
        deleteAdId: id,
      },
    });
  }

  const loading = loadingDelete || loadingGet;
  if (loading) {
    return <Loader />;
  }
  return (
    <section className="ad-detailed-container">
      <h1 className="ad-detailed-title "> {ad?.title} </h1>
      <img className="ad-detailed-picture" src={ad?.picture} alt={ad?.title} />
      <p className="ad-detailed-p1"> {ad?.description} </p>
      <p className="ad-detailed-p2">
        Prix : {((ad?.price ?? 0) / 100).toFixed(2)} €
      </p>
      <p className="ad-detailed-p3">catégorie : {ad?.category?.title} </p>
      <button
        className="button ad-detailed-button"
        onClick={async () => {
          await doSubmit();
          navigate("/");
        }}
      >
        Supprimer l'offre
      </button>
      <button className="button ad-detailed-button2" onClick={onUpdate}>
        Modifier l'offre
      </button>
    </section>
  );
}
