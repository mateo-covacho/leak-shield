import { createIndex } from "../../lib/redis";

export default async function handler(req: any, res: any) {
  await createIndex();
  res.status(200).json("ok");
}
