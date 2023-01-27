import { Client, Entity, Schema, Repository } from "redis-om";
import { Url } from "url";
const client = new Client();
async function connect() {
  console.log("Will connect to redis");
  console.log({ client });
  if (!client.isOpen()) {
    console.log("Attempting to connect to redis");
    const url = new URL("redis://default:0dOoaiVQvwRtRRl9OQVqLD8XmhnRR6HA@redis-15206.c269.eu-west-1-3.ec2.cloud.redislabs.com:15206");
    console.log({ url });
    const res = await client.open("redis://default:0dOoaiVQvwRtRRl9OQVqLD8XmhnRR6HA@redis-15206.c269.eu-west-1-3.ec2.cloud.redislabs.com:15206");
    console.log({ res });
  }
}

class Post extends Entity {}

let schema = new Schema(Post, {
  media: { type: "string" },
  author: { type: "string" },
  caption: { type: "string" },
  created: { type: "number" },
});

interface Data {
  media: string;
  author: string;
  caption: string;
  created: number;
}

export async function createPost(data: Data) {
  await connect();

  const repository = client.fetchRepository(schema);

  const post = repository.createEntity(data as any);

  const id = await repository.save(post);

  return id;
}
