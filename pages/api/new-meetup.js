import { MongoClient } from 'mongodb'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const data = req.body

      const client = await MongoClient.connect('mongodb+srv://Pelle:W5AJVpb4b5%40PvxV@nextjs-meetups.26hdw.mongodb.net/meetups?retryWrites=true&w=majority')

      const db = client.db()

      const meetupsCollection = db.collection('meetups')
      const result = await meetupsCollection.insertOne(data)

      console.log(result)

      client.close()

      res.status(200).json({ message: 'Meetup inserted' })
    } catch (error) {
      console.log('AYAYAY:')
      console.log(error)
    }
  }
}

export default handler