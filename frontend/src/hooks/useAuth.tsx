import { useQuery } from "@apollo/client";
import { WHOAMI } from "../services/queries";

export const useAuth = () => {
  const { data, error, loading } = useQuery(WHOAMI);

  return { authenticated: !!data?.whoami, me: data?.whoami, error, loading };
};
