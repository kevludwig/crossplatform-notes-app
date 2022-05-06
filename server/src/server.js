const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Get all notes
app.get("/notes", async (req, res) => {
  console.log(req)
  const notes = await prisma.note.findMany();
  res.json(notes);
});

// Get note by id
app.get("/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const note = await prisma.note.findUnique({
      where: { id: Number(id) },
    });

    res.json(note);
  } catch (error) {
    res.json({ error: `Note with ID ${id} does not exist in the database` });
  }
});

// Create new note
app.post("/notes", async (req, res) => {
  const { title, body } = req.body;
  const result = await prisma.note.create({
    data: {
      title,
      body,
    },
  });
  res.json(result);
});

// Delete note by id
app.delete(`/notes/:id`, async (req, res) => {
  const { id } = req.params;
  const note = await prisma.note.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(note);
});

// Update note by id
app.put(`/notes/:id`, async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const note = await prisma.note.update({
    where: {
      id: Number(id),
    },
    data: {
      title: title,
      body: body,
    },
  });
  res.json(note);
});

app.listen(3000, () =>
  console.log("🚀 Server ready at: http://localhost:3000")
);
