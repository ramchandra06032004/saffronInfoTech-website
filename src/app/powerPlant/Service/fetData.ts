import { fetchSolarPowerPlant } from "@/repoLayer/fetchPowerPlant";
import { fetchUserData } from "@/repoLayer/fetchUserData";

export const fetchData = async (callBackFunction: CallableFunction) => {
  

  const userResponse = await fetchUserData();
  const { solarPowerPlants } = userResponse;
  const powerPlantsData = await fetchSolarPowerPlant(solarPowerPlants);

  callBackFunction(powerPlantsData);
};
