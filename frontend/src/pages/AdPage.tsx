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
    variables: { readAdId: id! },
  });

  const ad = data?.readAd;

  const [doDeleteAd, { loading: loadingDelete }] = useMutation<{
    deleteAd: AdProps;
  }>(DELETE_AD);

  const loading = loadingGet || loadingDelete;

  if (loading) {
    return <Loader />;
  }

  const handleDelete = async () => {
    await doDeleteAd({ variables: { deleteAdId: id } });
    navigate("/");
  };

  const handleEdit = () => {
    navigate(`/ads/${id}/edit`);
  };

  return (
    <div className="bg-orange-100 rounded-lg p-6 shadow-lg max-w-4xl mx-auto mt-10">
      <h1 className="text-orange-500 font-bold text-3xl mb-4">{ad?.title}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={ad?.picture}
          alt={ad?.title}
          className="w-full md:w-1/2 h-auto rounded-lg shadow-md"
        />
        <div className="flex flex-col justify-between flex-1">
          <p className="text-gray-700 text-lg">{ad?.description}</p>
          <p className="text-gray-800 font-semibold text-xl mt-4">
            Prix : {((ad?.price ?? 0) / 100).toFixed(2)} €
          </p>
          <p className="text-gray-600 mt-2">
            Catégorie :{" "}
            <span className="text-gray-800 font-medium">
              {ad?.category?.title ?? "Non spécifiée"}
            </span>
          </p>
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
            >
              Supprimer l'offre
            </button>
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Modifier l'offre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
