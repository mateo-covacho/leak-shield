import { searchPosts } from "../../lib/redis";

export default async function handler(req: any, res: any) {
  const query = req.query.q;
  console.log("query", query);
  const posts = await searchPosts(query);
  res.status(200).json(posts);
}
