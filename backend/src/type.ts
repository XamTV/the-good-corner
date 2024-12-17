export type Ad = {
  id: number;
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  category_id: number;
  createdAt: string;
};

export type Category = {
  id: number;
  title: string;
};
