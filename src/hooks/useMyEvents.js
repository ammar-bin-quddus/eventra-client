import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useMyEvents = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myEvents = [], isLoading, refetch } = useQuery({
    queryKey: ["myEvents", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/events/mine");
      return res.data;
    },
  });

  return { myEvents, isLoading, refetch };
};

export default useMyEvents;
