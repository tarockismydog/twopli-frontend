import axios from "axios";

export const getTodaySongs = async () => {
  const res = await axios.get("/api/music/today");
  return res.data;
};

export const selectSong = async (data: any) => {
  return axios.post("/api/music/select", data);
};
