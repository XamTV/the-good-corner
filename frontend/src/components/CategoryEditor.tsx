import { useState } from "react";
import { AdProps } from "./RecentAds";
import { useMutation } from "@apollo/client";
import { CREATE_CATEGORY } from "../services/mutations";
import { GET_CATEGORIES } from "../services/queries";

export type CategoryType = {
  id: number;
  title: string;
  ads?: AdProps[];
};

export function CategoryEditor(
  props: Readonly<{
    onCategoryCreated: (newId: number) => void;
  }>
) {
  const [name, setName] = useState("");

  const [doCreateCategory, { loading }] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [GET_CATEGORIES],
  });

  async function doSubmit() {
    const { data } = await doCreateCategory({
      variables: {
        data: {
          title: name,
        },
      },
    });
    setName("");
    if (data?.createCategory.id !== undefined) {
      props.onCategoryCreated(Number(data.createCategory.id));
    }
  }

  if (loading) {
    return <p>Chargement ...</p>;
  }
  return (
    <div
      style={{
        border: "1px solid black",
        padding: 16,
      }}
    >
      <label>
        Nom de la catégorie :
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <button type="button" onClick={doSubmit}>
        Créer ma catégorie
      </button>
    </div>
  );
}
