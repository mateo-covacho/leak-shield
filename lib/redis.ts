import { Client, Entity, Schema, Repository } from "redis-om";
import { Url } from "url";

const client = new Client();
async function connect() {
  if (!client.isOpen()) {
    // const url = new URL("redis-15206.c269.eu-west-1-3.ec2.cloud.redislabs.com:15206");
    // console.log({ url });
    //@ts-ignore
    const res = await client.open(process.env.REDIS_URL);
  }
}

class Post extends Entity {}

let postSchema = new Schema(
  Post,
  {
    media: { type: "string" },
    author: { type: "string" },
    caption: { type: "text", indexed: true },
    created: { type: "number" },
  },
  {
    dataStructure: "JSON",
  }
);

interface postData {
  media: string;
  author: string;
  caption: string;
  created: number;
}

export async function createPost(data: postData) {
  await connect();

  const repository = client.fetchRepository(postSchema);

  const post = repository.createEntity(data as any);

  const id = await repository.save(post);

  return id;
}

export async function createIndex() {
  await connect();
  const repository = client.fetchRepository(postSchema);
  await repository.createIndex();
}

export async function searchPosts(query: string) {
  await connect();
  const repository = client.fetchRepository(postSchema);
  const results = await repository.search().where("caption").matches(query).or("author").matches(query);
  return results;
}
