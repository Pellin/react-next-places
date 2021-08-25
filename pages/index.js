import Head from 'next/head'
import { MongoClient } from 'mongodb'
import MeetupList from "../components/meetups/MeetupList"

const HomePage = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of places to meet"></meta>
      </Head>
      <MeetupList meetups={meetups} />
    </>
  )
}

// export const getServerSideProps = async ({ req, res }) => {
//   // fetch data...

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export const getStaticProps = async () => {
  const client = await MongoClient.connect('mongodb+srv://Pelle:W5AJVpb4b5%40PvxV@nextjs-meetups.26hdw.mongodb.net/meetups?retryWrites=true&w=majority')

  const db = client.db()

  const meetupsCollection = db.collection('meetups')

  const meetups = await meetupsCollection.find().toArray()

  client.close()

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1
  }
}

export default HomePage