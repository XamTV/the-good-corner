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
        const tagId = Number(tag.id);
        if (!tagsIds.includes(tagId)) {
          tagsIds.push(tagId);
        }
      }
      console.log("tags to add : ", tagsIds);

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
            updateAdId: ad.id, // ID de l'annonce à modifier
            data: {
              title,
              description,
              price,
              location,
              picture,
              owner,
              category: categoryId ? { id: `${categoryId}` } : null, // ID de la catégorie
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

  console.log("TagsIds =>", tagsIds);

  const [showCategoryEditor, setShowCategoryEditor] = useState(false);
  const [showTagEditor, setShowTagEditor] = useState(false);

  if (loading) {
    return <p className="text-center text-gray-500">Chargement...</p>;
  }

  return (
    <div
      className="container mx-auto p-6 max-w-4xl bg-white rounded-lg shadow-lg"
      style={{ maxHeight: "calc(100vh - 20px)" }}
    >
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="overflow-y-auto max-h-[80vh]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            doSubmit();
          }}
          className="space-y-6"
        >
          <div>
            <label className="block font-medium text-lg">Titre *</label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block font-medium text-lg">Prix (en euros)</label>
            <input
              type="number"
              value={price / 100}
              onChange={(e) => setPrice(Number(e.target.value) * 100)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block font-medium text-lg">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block font-medium text-lg">Localisation</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block font-medium text-lg">Image (URL)</label>
            <input
              type="text"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block font-medium text-lg">Auteur</label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block font-medium text-lg">Catégorie</label>
            <div className="flex items-center space-x-4">
              <select
                value={categoryId ?? ""}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="flex-grow border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
              >
                <option>---</option>
                {categories?.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  setShowCategoryEditor(!showCategoryEditor);
                }}
                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
              >
                {showCategoryEditor === true ? "Cacher" : "Nouvelle catégorie"}
              </button>
            </div>
            {showCategoryEditor && (
              <CategoryEditor
                onCategoryCreated={(id) => {
                  setShowCategoryEditor(false);
                  setCategoryId(id);
                }}
              />
            )}
          </div>
          <div>
            <label className="block font-medium text-lg">Tags</label>
            <div className="flex flex-wrap gap-4">
              {tags?.map((tag) => (
                <label
                  key={tag.id}
                  className="inline-flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={tagsIds.includes(Number(tag.id)) === true}
                    onClick={() => {
                      const tagId = Number(tag.id);
                      if (tagsIds.includes(tagId) === true) {
                        const newArray = tagsIds.filter(
                          (entry) => entry !== tagId
                        );
                        setTagsIds(newArray);
                      } else {
                        setTagsIds([...tagsIds, tagId]);
                      }
                    }}
                  />
                  <span className="text-sm">{tag.title}</span>
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowTagEditor(!showTagEditor)}
              className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
            >
              {showTagEditor ? "Cacher" : "Nouveau tag"}
            </button>
            {showTagEditor && (
              <TagEditor
                onTagCreated={(id) => {
                  setShowTagEditor(false);
                  setTagsIds([...tagsIds, id]);
                }}
              />
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white rounded-md px-6 py-2 hover:bg-green-600"
            >
              {ad ? "Modifier l'annonce" : "Créer l'annonce"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
