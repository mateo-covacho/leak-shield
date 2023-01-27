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

Estimado Sr. Salgado,

He recibido su correo y he completado y firmado la solicitud de admisión (adjunto en PDF). También incluyo mi DNI, Pasaporte o NIE. Aún no tengo las notas de 2º de SMR. Estoy disponible para agendar una entrevista con el Coordinador del Ciclo de lunes a jueves después de las 7pm y los viernes y fin de semana estoy completamente libre. Por favor háganme saber si necesitan algo más.

Atentamente,

Mateo.