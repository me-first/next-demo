// /api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    //MZqDwVApG8CPZqRQ
    const client = await MongoClient.connect(
      "mongodb+srv://nextdb:MZqDwVApG8CPZqRQ@cluster0.p6q7b.mongodb.net/nextdb?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupCollection = db.collection("meetups");

    const result = await meetupCollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(201).json({
      result,
    });
  }
}

export default handler;
