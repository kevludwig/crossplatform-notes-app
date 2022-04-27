export type CreateNote = {
  title: string;
  body: string;
};

export type UpdateNote = {
  id: string;
  title: string;
  body: string;
};

export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

export type Notes = Note[];
