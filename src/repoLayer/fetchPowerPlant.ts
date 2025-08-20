import axios from "axios";
export const fetchSolarPowerPlant = async (solarPowerPlants: [string]) => {
  try {
    const powerPlantResponse = await axios.post("/api/getPowerPlant", {
      powerPlantIds: solarPowerPlants,
    });
    if (powerPlantResponse.status === 200) {
      return powerPlantResponse.data.powerPlants;
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch power plants"
    );
  }
};
