import { useEffect, useState } from "react";
import { type pokemonType } from "@/types/pokemon";
import { getAllPokemonType, getDamagedMultiplyJson } from "@/server/service";

type DamageMul = {
  types: pokemonType[];
  multiplyDamage: number;
};

export default function Home() {
  const [pokemonType, setPokemonType] = useState<pokemonType[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<pokemonType[]>([]);
  const [damageMultiplys, setDamageMultiplys] = useState<DamageMul[]>();
  function fetchPokemonType() {
    getAllPokemonType()
      .then((res) => {
        setPokemonType(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchPokemonDamageMultiplys() {
    console.log("test");
    if (selectedTypes.length === 1)
      getDamagedMultiplyJson(selectedTypes[0] ?? "Water")
        .then((res) => {
          const newDamageMultiplys: Record<string, pokemonType[]> = {};
          Object.keys(res ?? []).forEach((type) => {
            if (res[type as pokemonType].toFixed(2) in newDamageMultiplys) {
              newDamageMultiplys[res[type as pokemonType].toFixed(2)]?.push(
                type as pokemonType,
              );
            } else {
              newDamageMultiplys[res[type as pokemonType].toFixed(2)] = [
                type as pokemonType,
              ];
            }
          });
          setDamageMultiplys(
            Object.keys(newDamageMultiplys ?? [])
              .map((typeData: string) => ({
                types: newDamageMultiplys[typeData]!,
                multiplyDamage: parseFloat(typeData),
              }))
              .sort((a, b) => b.multiplyDamage - a.multiplyDamage),
          );
        })
        .catch((err) => {
          console.log(err);
        });
    else if (selectedTypes.length === 2) {
      getDamagedMultiplyJson(
        selectedTypes[0] ?? "Water",
        selectedTypes[1] ?? "Bug",
      )
        .then((res) => {
          const newDamageMultiplys: Record<string, pokemonType[]> = {};
          Object.keys(res ?? []).forEach((type) => {
            if (res[type as pokemonType].toFixed(2) in newDamageMultiplys) {
              newDamageMultiplys[res[type as pokemonType].toFixed(2)]?.push(
                type as pokemonType,
              );
            } else {
              newDamageMultiplys[res[type as pokemonType].toFixed(2)] = [
                type as pokemonType,
              ];
            }
          });
          setDamageMultiplys(
            Object.keys(newDamageMultiplys ?? [])
              .map((typeData: string) => ({
                types: newDamageMultiplys[typeData]!,
                multiplyDamage: parseFloat(typeData),
              }))
              .sort((a, b) => b.multiplyDamage - a.multiplyDamage),
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  const handleOnClick = (type: pokemonType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(
        selectedTypes.filter((seletedType) => seletedType != type),
      );
    } else {
      setSelectedTypes([
        ...(selectedTypes.length === 2
          ? selectedTypes.slice(1)
          : selectedTypes),
        type,
      ]);
    }
  };

  useEffect(() => {
    fetchPokemonType();
  }, []);
  useEffect(() => {
    if (selectedTypes) fetchPokemonDamageMultiplys();
  }, [selectedTypes]);
  return (
    <div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-x-[12px] gap-y-[4px]">
        {pokemonType.map((type) => (
          <span key={type} className="w-[80px]">
            <button
              type="button"
              onClick={() => handleOnClick(type)}
              className={
                selectedTypes.includes(type)
                  ? "w-[100%] rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white"
                  : "w-[100%] rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white"
              }
            >
              {type}
            </button>
          </span>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-[4px] text-center">
        {damageMultiplys?.map((damageMultiply) => (
          <div
            key={damageMultiply.multiplyDamage}
            className="my-[4px] w-full border-y-2 bg-slate-200 py-[4px]"
          >
            <div className="text-xl">
              damage multiply by {damageMultiply.multiplyDamage}
              <br />
              with this types
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-x-[8px]">
              {damageMultiply.types.map((type) => (
                <div
                  key={type}
                  className="rounded-lg border-2 border-dashed border-indigo-600 p-[4px]"
                >
                  {type}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
