import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
const NewMeetup = () => {
  const router = useRouter();
  const onAddMeetup = async (newMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(newMeetupData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log(data);
    router.replace("/");
  };

  return (
    <>
      <Head>
        <title>New Meetup</title>
        <meta name="description" content="Add new meetup"></meta>
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetup} />
    </>
  );
};

export default NewMeetup;
