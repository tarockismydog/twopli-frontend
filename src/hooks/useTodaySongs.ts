import { useQuery } from "@tanstack/react-query";
import { getTodaySongs } from "../api/musicApi";

export const useTodaySongs = () => {
  return useQuery({
    queryKey: ["todaySongs"],
    queryFn: getTodaySongs,
  });
};
