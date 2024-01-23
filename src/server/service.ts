import { axiosInstance } from "./axios";
import { type pokemonType } from "@/types/pokemon";

type getAllTypeResponse = pokemonType[];

// get response list of all pokemon type
export const getAllPokemonType = async () => {
  const response =
    await axiosInstance.get<getAllTypeResponse>("api/pokemonType");
  return response.data;
};

// get response json of how each type affect the defender type
export const getDamagedEffectiveJson = async (defenderType: pokemonType) => {
  const response = await axiosInstance.get<Record<pokemonType, number>>(
    `api/pokemonEffect/${defenderType}`,
  );
  return response.data;
};

// get response json of how each type affect the defender type (2 types)
export const getDamagedMultiplyJson = async (
  defenderType1: pokemonType,
  defenderType2?: pokemonType,
) => {
  if (!defenderType2) {
    const response = await axiosInstance.get<Record<pokemonType, number>>(
      `api/multiplyPokemonDamage/${defenderType1}`,
    );
    return response.data;
  }
  const response = await axiosInstance.get<Record<pokemonType, number>>(
    `api/multiplyPokemonDamage/${defenderType1}/${defenderType2}`,
  );
  return response.data;
};

// get response number of how attacker type affect the defender type
export const getDamagedEffective = async (
  defenderType: pokemonType,
  attackerType: pokemonType,
) => {
  const response = await axiosInstance.get<number>(
    `api/pokemonEffect/${defenderType}/${attackerType}`,
  );
  return response.data;
};
