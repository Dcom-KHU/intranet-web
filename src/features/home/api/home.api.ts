import { api } from "../../../api/client";
import type { HomeDashboardResponseDto } from "../dto/home.dto";
import { toHomeDashboard } from "../mapper/home.mapper";

export const getHomeDashboard = async () => {
  const response = await api.get<HomeDashboardResponseDto>("/api/home");

  console.log("getHomeDashboard response:", response.data); // Log the entire response data for debugging
  return toHomeDashboard(response.data.data);
};
