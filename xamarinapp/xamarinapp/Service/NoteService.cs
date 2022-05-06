using System;
using System.Text;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Threading.Tasks;
using xamarinapp.Model;
using xamarinapp.Helpers;
using Newtonsoft.Json;

namespace xamarinapp.Services
{
    public class NoteService : INoteService
    {
        public async void CreateNoteAsync(Note note)
        {
            List<Note> notes = new List<Note>();

            string json = JsonConvert.SerializeObject(note);

            try
            {
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                HttpClient client = new HttpClient();

                client.BaseAddress = Constants.BaseUrl;

                HttpResponseMessage response = await client.PostAsync("/notes", content);

                var result = await response.Content.ReadAsStringAsync();

                Debug.WriteLine(result.ToString());
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Error: " + ex.Message);
            }
        }

        public async Task<List<Note>> GetNotesAsync()
        {
            List<Note> notes = new List<Note>();

            try
            {
                var content = "";

                HttpClient client = new HttpClient();

                client.BaseAddress = Constants.BaseUrl;
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.GetAsync("/notes");

                content = await response.Content.ReadAsStringAsync();

                var Items = JsonConvert.DeserializeObject<List<Note>>(content);
                
                notes = Items;
            }
            catch(Exception ex)
            {
                Debug.WriteLine("Error: " + ex.Message);
            }

            return notes;
        }

        public async void UpdateNoteAsync(Note note)
        {
            List<Note> notes = new List<Note>();



            string json = JsonConvert.SerializeObject(note);

            try
            {
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                HttpClient client = new HttpClient();

                client.BaseAddress = Constants.BaseUrl;

                HttpResponseMessage response = await client.PutAsync($"/notes/{note.id}", content);

                var result = await response.Content.ReadAsStringAsync();

                Debug.WriteLine(result.ToString());
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Error: " + ex.Message);
            }
        }
    }
}
