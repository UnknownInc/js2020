import express from 'express';
import uuid from 'node-uuid';
import {requireAuth} from '../services/auth';
import {db} from '../services/firebase';

const api = express.Router();

api.post('/comments',requireAuth, async (req, res) => {
  const cref = db().collection('jumpstart_comments');
  try
  {
    const doc = await cref.add({
      sessionId: req.body.sessionId,
      comment: req.body.comment,
      email: req.auser.email,
      date: new Date().getTime()
    });
    console.log(`created new comment ${doc.id}`);
    return res.send(doc);
  }catch(e) {
    console.error('unable to create new comment');
    console.error(e);
    res.sendStatus(500);
  }
});

api.get('/comments',requireAuth, async (req, res) => {
  const offset = Number(req.query.offset||new Date(2020,9,1).getTime());
  const limit = Number(req.query.limit||10);
  console.log(offset);
  try {
    const snapshot = await db().collection('jumpstart_comments')
      .orderBy('date','asc')
      .startAt(offset)
      .limit(limit)
      .get();
    const items=[]
    if (snapshot) {
      snapshot.forEach(doc => {
        const data = {...doc.data(), id: doc.id, createdAt: doc.createTime.toDate()};
        items.push(data);
      });
    }
    console.log(`found ${items.length} comments`);
    return res.json(items);
  } catch(e) {
    console.error('unable to get comments');
    console.error(e);
    res.sendStatus(500);
  }
})

api.get('/all',requireAuth, async (req, res) => {
  try {
    const itemsRef = db().collection('jumpstart_sessions');
    const snapshot = await itemsRef.orderBy('order').get();
    const items=[]
    snapshot.forEach(doc => {
      items.push({...doc.data(), id: doc.id, comments:[]});
    });

    return res.json(items);
  } catch(e) {
    console.error('unable to get all sessions');
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports=api;

const items = [
    {
      id:'1',
      title:"Welcome to Jumpstart",
      speaker: "Roma Nawani Sachdev",
      img:'https://d2k14tloeqh93s.cloudfront.net/speaker_ca51beed-f348-4c05-b9da-5cea9ed8545c.jpg',
      comments:[]
    },
    {
      id:uuid.v4(),
      title:"Welcome to the modern HOW | Introduction about PS",
      speaker: "Sanjay Menon",
      img:'https://d2k14tloeqh93s.cloudfront.net/speaker_4d6ed1a9-e88a-4a46-8610-e152f85f921f.jpg',
      comments:[]
    },
    {
      id:uuid.v4(), 
      title:"Engineering in Pandemic times",
      speaker: "Tilak Doddapaneni",
      img:'https://d2k14tloeqh93s.cloudfront.net/speaker_af18dfb4-a05c-4862-8da6-8085e3286244.png',
      comments:[]
    },
    {
      id:uuid.v4(),
      title:"How to Engineer from Idea to Live- in 30 mins",
      speaker: "Rakesh Ravuri",
      img:'https://d2k14tloeqh93s.cloudfront.net/user_d3e25cf5-1e14-4a30-9cb5-6b10d7ecb364.png',
      comments:[]
    },
    {
      id:uuid.v4(), 
      title:"Networking & Q/A",
      speaker: "Publicis Sapient Leaders",
      img:'https://careers.publicissapient.com/content/dam/ps-rebrand/news/2019/forrester/CX_900x900.jpg.transform/psimg-2400/image.jpg',
      comments:[]
    },
    {
      id:uuid.v4(), 
      title:"(ASDE + Director) detailed case study of a project + Q&A + testimonial video of few other campus recruits",
      speaker: "Sarvanan and Balajee Thachakkadu Mohan",
      img:'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
      comments:[]
    },
    {
      id:uuid.v4(),
      title:"Activity with LnD team",
      speaker: "Vishal Khera",
      img:'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
      comments:[]
    },
    {
      id:uuid.v4(), 
      title:"Diversity and Inclusion at Publicis Sapient",
      speaker: "Aradhika Nigam",
      img:'https://d2k14tloeqh93s.cloudfront.net/user_bc0282e2-0d5c-40e1-b729-1d62b12fce96.png',
      comments:[]
    },
    {
      id:uuid.v4(), 
      title:"Meet our CEO",
      speaker: "Nigel Vaz",
      img:'https://www.publicissapient.com/content/dam/ps-rebrand/about-us/corporate-governance/About_Leadership_NigelVaz.png.transform/psimg-640/image.png',
      comments:[]
    }
  ];
const now=new Date();
const comments = [
  {
    comment: 'good session',
    email: 'user1@example.com',
    createdAt: now.setMinutes(Math.random()*now.getMinutes()),
    id:uuid.v4(), sessionId:'1'
  },
  {
    comment: '👍🏽 enjoyed it',
    email: 'user2@example.com',
    createdAt: now.setMinutes(Math.random()*now.getMinutes()),
    id:uuid.v4(), sessionId:'1'
  },
  {
    comment: 'what is this about? 🤔',
    email: 'student3@example.com',
    createdAt: now.setMinutes(Math.random()*now.getMinutes()),
    id:uuid.v4(), sessionId:'1'
  },
  {
    comment: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    email: 'student3@example.com',
    createdAt: now.setMinutes(Math.random()*now.getMinutes()),
    id:uuid.v4(), sessionId:'1'
  },
  {
    comment: 'having fun!',
    email: 'student3@example.com',
    createdAt: now.setMinutes(Math.random()*now.getMinutes()),
    id:uuid.v4(), sessionId:'1'
  },
  {
    comment: 'informative',
    email: 'student3@example.com',
    createdAt: now.setMinutes(Math.random()*now.getMinutes),
    id:uuid.v4(), sessionId:'1'
  },
  {
    comment: 'hello all',
    email: 'student3@example.com',
    createdAt: now.setMinutes(Math.random()*now.getMinutes()),
    id:uuid.v4(), sessionId:'1'
  },
  {
    comment: 'all companies should do this',
    email: 'student3@example.com',
    createdAt: now.setMinutes(Math.random()*now.getMinutes()),
    id:uuid.v4(), sessionId:'1'
  },
  {
    comment: 'enjoyed itwhat is this about?',
    email: 'student3@example.com',
    createdAt: now.setMinutes(Math.random()*now.getMinutes()),
    id:uuid.v4(), sessionId:'1'
  },
  {
    comment: 'enjoyed itwhat is this about?',
    email: 'student3@example.com',
    createdAt: now.setMinutes(Math.random()*now.getMinutes()),
    id:uuid.v4(), sessionId:'1'
  },
]