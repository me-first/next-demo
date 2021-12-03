import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../components/meetups/MeetupDetail";
const MeetupDetails = (props) => {
  const { meetupData } = props;
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content="Meetup detail"></meta>
      </Head>
      <MeetupDetail
        id={meetupData.id}
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        detail={meetupData.detail}
      />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://nextdb:MZqDwVApG8CPZqRQ@cluster0.p6q7b.mongodb.net/nextdb?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const data = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: data.map((meetup) => ({
      params: { meetId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetId = context.params.meetId;
  console.log(meetId);

  const client = await MongoClient.connect(
    "mongodb+srv://nextdb:MZqDwVApG8CPZqRQ@cluster0.p6q7b.mongodb.net/nextdb?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetup = await meetupCollection.findOne({ _id: ObjectId(meetId) });
  client.close();

  return {
    props: {
      meetupData: {
        id: JSON.stringify(meetup._id),
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        detail: meetup.description,
      },
    },
  };
}

export default MeetupDetails;
