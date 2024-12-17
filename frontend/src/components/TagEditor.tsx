import { useState } from "react";
import { CREATE_TAG } from "../services/mutations";
import { GET_TAGS } from "../services/queries";
import { useMutation } from "@apollo/client";

export type TagType = {
  id: number;
  title: string;
};

export function TagEditor(
  props: Readonly<{ onTagCreated: (newId: number) => void }>
) {
  const [name, setName] = useState("");

  const [doCreateCategory, { loading }] = useMutation(CREATE_TAG, {
    refetchQueries: [GET_TAGS],
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
    if (data?.createTag.id !== undefined) {
      props.onTagCreated(Number(data.createTag.id));
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
        Nom du tag :
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <button type="button" onClick={doSubmit}>
        Créer mon tag
      </button>
    </div>
  );
}
