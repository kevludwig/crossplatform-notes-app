using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms.MVVMBase.Extensions;
using Xamarin.Forms.MVVMBase.Services.Navigation;
using Xamarin.Forms.MVVMBase.ViewModels;
using Xamarin.Forms;
using xamarinapp.Model;
using xamarinapp.Services;

namespace xamarinapp.ViewModel
{
    public class NoteViewModel : BaseViewModel
    {
        public ICommand BackCommand { get;  }
        public ICommand UpdateCommand { get; }
        INoteService _NoteService;

        private Note _note;
        public Note Note
        {
            get { return _note; }
            set
            {
                SetProperty(ref _note, value);
            }
        }

        public NoteViewModel(INoteService noteService) : base ("Note View")
        {
            BackCommand = new Command(ExecuteBackCommand);
            UpdateCommand = new Command(HandleUpdateCommand);
            Note = new Note();
            _NoteService = noteService;
        }

        private async void ExecuteBackCommand()
        {
            await NavigationService.NavigateBackAsync();
        }


        public override async Task LoadAsync(NavigationParameters navigationData)
        {
            try
            {
                if(navigationData != null && navigationData.ContainsKey("note"))
                {
                    Note = navigationData["note"].Cast<Note>();
                }
                else
                {
                    return;
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
        }

        void HandleUpdateCommand(object obj)
        {
            _NoteService.UpdateNoteAsync(Note);
            Debug.WriteLine("Test");
            Debug.WriteLine(Note.title);
            ExecuteBackCommand();
        }
    }
}
