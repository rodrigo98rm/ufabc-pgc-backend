import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { v4 } from 'uuid';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

type Note = {
  id: string;
  title: string;
  description: string;
  pinned: boolean;
};

const notes: Note[] = [];

app.use(express.json());

app.post('/login', (req: Request, res: Response) => {
  const { body } = req;

  if (body.email === 'rodrigo@teste.com' && body.password === '123456') {
    return res.status(200).send();
  }

  return res.status(401).send();
});

app.get('/notes', (req: Request, res: Response) => {
  return res.status(200).json(notes);
});

app.post('/notes', (req: Request, res: Response) => {
  const { title, description, pinned } = req.body;

  const note: Note = {
    id: v4(),
    title,
    description,
    pinned,
  };

  notes.push(note);

  return res.status(201).json(note);
});

app.put('/notes/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex < 0) {
    return res.status(404).send();
  }

  const { title, description, pinned } = req.body;

  notes[noteIndex] = {
    id,
    title,
    description,
    pinned,
  };

  return res.status(200).json(notes[noteIndex]);
});

app.delete('/notes/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex < 0) {
    return res.status(404).send();
  }

  notes.splice(noteIndex, 1);

  return res.status(204).send();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
