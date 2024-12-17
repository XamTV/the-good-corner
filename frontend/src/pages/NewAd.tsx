import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryEditor } from "../components/CategoryEditor";
import { TagEditor } from "../components/TagEditor";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AD, GET_CATEGORIES, GET_TAGS } from "../services/queries";
import { CREATE_AD, UPDATE_AD } from "../services/mutations";

export default function NewAd() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = params.id && Number(params.id);

  const { data } = useQuery(GET_AD, {
    variables: { readAdId: id as string },
    skip: !id,
  });
  const ad = data?.readAd;

  const [error, setError] = useState<string>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState("");
  const [owner, setOwner] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>();
  const [tagsIds, setTagsIds] = useState<number[]>([]);

  useEffect(() => {
    if (ad) {
      setTitle(ad.title);
      setDescription(ad.description);
      setPrice(ad.price);
      setLocation(ad.location);
      setPicture(ad.picture);
      setOwner(ad.owner);
      setCategoryId(ad.category?.id ? Number(ad.category?.id) : null);

      const tagsIds: number[] = [];
      for (const tag of ad.tags || []) {
        tagsIds.push(Number(tag.id));
      }
      setTagsIds(tagsIds);
    }
  }, [ad]);

  const { data: categoryData } = useQuery(GET_CATEGORIES);
  const categories = categoryData?.readCategories;

  useEffect(() => {
    if (categories?.length && categoryId) {
      setCategoryId(Number(categories[0].id));
    }
  }, [categories]);

  const { data: tagsData } = useQuery(GET_TAGS);
  const tags = tagsData?.readTags;

  const [doCreateAd, { loading: CreateLoading }] = useMutation(CREATE_AD, {
    refetchQueries: [GET_AD],
  });

  const [doUpdateAd, { loading: updateLoading }] = useMutation(UPDATE_AD, {
    refetchQueries: [GET_AD],
  });

  const loading = CreateLoading || updateLoading;

  async function doSubmit() {
    setError(undefined);
    try {
      if (ad) {
        const { data } = await doUpdateAd({
          variables: {
            updateAdId: ad.id,
            data: {
              title,
              description,
              price,
              location,
              picture,
              owner,
              category: categoryId ? { id: `${categoryId}` } : null,
              tags: tagsIds.map((id) => ({ id: `${id}` })),
            },
          },
        });
        navigate(`/ads/${data?.updateAd?.id}`, { replace: true });
      } else {
        const { data } = await doCreateAd({
          variables: {
            data: {
              title,
              description,
              price,
              location,
              picture,
              owner,
              category: { id: `${categoryId}` },
              tags: tagsIds.map((id) => ({ id: `${id}` })),
            },
          },
        });
        navigate(`/ads/${data?.createAd.id}`, { replace: true });
      }
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue");
    }
  }

  const [showCategoryEditor, setShowCategoryEditor] = useState(false);
  const [showTagEditor, setShowTagEditor] = useState(false);

  if (loading) {
    return <p>Chargement</p>;
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          doSubmit();
        }}
      >
        <label>
          Titre * :
          <input
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Prix (en euros) :
          <input
            type="number"
            value={price / 100}
            onChange={(e) => setPrice(Number(e.target.value) * 100)}
          />
        </label>
        <br />
        <label>
          Description :
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Localisation :
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <br />
        <label>
          Image (URL) :
          <input
            type="text"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
        </label>
        <br />
        <label>
          Auteur :
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </label>
        <br />
        <label>
          Catégorie :
          <select
            value={categoryId ?? ""}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            {categories?.map((category) => (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => {
            setShowCategoryEditor(!showCategoryEditor);
          }}
        >
          {showCategoryEditor === true ? "Cacher" : "Nouvelle catégorie"}
        </button>
        {showCategoryEditor && (
          <CategoryEditor
            onCategoryCreated={(id) => {
              setShowCategoryEditor(false);

              setCategoryId(id);
            }}
          />
        )}
        <br />
        <div>
          Tags :
          {tags?.map((tag) => (
            <label key={tag.id}>
              <input
                type="checkbox"
                checked={tagsIds.includes(Number(tag.id)) === true}
                onClick={() => {
                  const tagId = Number(tag.id);
                  if (tagsIds.includes(tagId) === true) {
                    const newArray = tagsIds.filter((entry) => entry !== tagId);
                    setTagsIds(newArray);
                  } else {
                    setTagsIds([...tagsIds, tagId]);
                  }
                }}
              />
              {tag.title}
            </label>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setShowTagEditor(!showTagEditor);
          }}
        >
          {showTagEditor === true ? "Cacher" : "Nouveau tag"}
        </button>
        {showTagEditor && (
          <TagEditor
            onTagCreated={(id) => {
              setShowTagEditor(false);

              setTagsIds([...tagsIds, id]);
            }}
          />
        )}
        <br />
        <br />
        <button>{ad ? "Modifier mon annonce" : "Créer mon annonce"}</button>
      </form>
    </div>
  );
}
