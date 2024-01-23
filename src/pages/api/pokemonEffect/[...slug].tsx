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
      return res
        .status(200)
        .json(data[slug[0] as pokemonType][slug[1] as pokemonType]);
    default:
      return res.status(400);
  }
}
