import { MongoClient } from 'mongodb';

import {
  connectDatabase,
  insertDocument,
  getAllDocuments
} from '../../helpers/db-util';

async function handler(req, res) {
  console.log('req.query', req.query);
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Connecting to the database failed' });
  }
  if (req.method === 'POST') {
    // add server-side validation
    const { email, name, text } = req.body;
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      client.close();
      return res.status(422).json({ message: 'Invalid input.' });
    }

    console.log('email,name,text', email, name, text);
    const newComment = {
      email,
      name,
      text,
      eventId
    };

    let result;
    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      console.log('newComment.id', newComment.id);
      res.status(201).json({ message: 'Added Comment', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed' });
    }

    console.log('newComment', newComment);
    console.log('result', result);
  }
  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting Comments failed' });
    }
    console.log('documents', documents);
  }
  client.close();
}

export default handler;
