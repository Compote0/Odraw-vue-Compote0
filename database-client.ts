import { Db, MongoClient } from "mongodb";

if (!process.env.MONGO_URL) {
  throw new Error("Variable d'environnement MONGO_URL non définie");
}

if (!process.env.DATABASE_NAME) {
  throw new Error("Variable d'environnement DATABASE_NAME non définie");
}

const client = new MongoClient(process.env.MONGO_URL); // Typescript INFERE que MONGO_URL n'est plus UNDEFINED à ce niveau du code !
export let db: Db;


client.connect()
  .then(() => {
    db = client.db(process.env.DATABASE_NAME);
  })
  .catch((error) => {
    console.error(error);
  });
