import { type NextApiRequest, type NextApiResponse } from "next";
import { pokemonData, type pokemonType } from "@/types/pokemon";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = pokemonData;
  const { slug } = req.query;
  switch (slug?.length) {
    case 1:
      return res.status(200).json(data[slug[0] as pokemonType]);
    case 2:
      const mul1 = data[slug[0] as pokemonType];
      const mul2 = data[slug[1] as pokemonType];
      const result = Object.keys(mul1).reduce(
        (acc, key) => {
          acc[key as pokemonType] =
            mul1[key as pokemonType] * mul2[key as pokemonType];
          return acc;
        },
        {} as Record<pokemonType, number>,
      );
      return res.status(200).json(result);
    default:
      return res.status(400);
  }
}
