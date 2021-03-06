import Head from 'next/head'
import { useRouter } from 'next/router'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

const NewMeetupPage = () => {
  const router = useRouter()

  const addMeetupHandler = async enteredMeetupData => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    console.log(data)

    router.push('/')
  }

  return (
    <>
      <Head>
        <title>React Meetups | New Meetup</title>
        <meta name="description" content="Add your own meetups and create great networking opportunities"></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  )
}

export default NewMeetupPage