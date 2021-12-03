import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>All meetups</title>
        <meta
          name="description"
          content="Browse all meetups and add new meetup"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export function getServerSideProps(context) {
//   // const req = context.req;
//   // console.log(req.headers);
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export const getStaticProps = async () => {
  // fetch the data
  const client = await MongoClient.connect(
    "mongodb+srv://nextdb:MZqDwVApG8CPZqRQ@cluster0.p6q7b.mongodb.net/nextdb?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();

  client.close();

  // this function always called first during build process and the page renders
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 10,
  };
};

export default HomePage;
