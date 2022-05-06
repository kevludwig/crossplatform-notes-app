using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using xamarinapp.Model;

namespace xamarinapp.Services
{
    public interface INoteService
    {
        void CreateNoteAsync(Note note);
        Task<List<Note>> GetNotesAsync();
        void UpdateNoteAsync(Note note);
    }
}
