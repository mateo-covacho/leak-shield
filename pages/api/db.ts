import { createPost } from "../../lib/redis";

export default async function handler(req: any, res: any) {
  console.log({ req });
  const id = await createPost(req.body);

  res.status(200).json({ id });
}
