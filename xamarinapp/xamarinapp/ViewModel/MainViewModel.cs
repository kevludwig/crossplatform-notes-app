using System;
using System.Diagnostics;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;
using Xamarin.Forms.MVVMBase.Services.Navigation;
using Xamarin.Forms.MVVMBase.ViewModels;
using xamarinapp.Model;
using xamarinapp.Services;

namespace xamarinapp.ViewModel
{
    public class MainViewModel : BaseViewModel
    { 
        public ObservableCollection<Note> Notes { get; }
        INoteService _NoteService;

        private ICommand _itemTappedCommand;
        public ICommand ItemTappedCommand => _itemTappedCommand ?? (_itemTappedCommand
            = new Command<Note>(async (note) => await ItemTappedCommandExecute(note), (note) => !IsBusy));

        public MainViewModel(INoteService noteService) : base("Main View")
        {
            Debug.WriteLine("init MainViewModel");
            Notes = new ObservableCollection<Note>();
            _NoteService = noteService;
        }

        public override async Task LoadAsync(NavigationParameters navigationData)
        {
            try
            {
                IsBusy = true;

                var notes = await _NoteService.GetNotesAsync();
                Notes.Clear();
                foreach(var note in notes)
                {
                    Notes.Add(note);
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
            finally
            {
                IsBusy = false;
            }
        }

        //Override OnNavigate
        public override async Task OnNavigate(NavigationParameters navigationData)
        {
            Debug.WriteLine("nav");
            if (navigationData.NavigationState == NavigationState.Backward)
            {
                //you can use the navigation to identify whether you have returned from a viewmodel
            }

            if (navigationData.NavigationState == NavigationState.Forward)
            {
                //you can use the navigation to identify whether you have navigated to a viewmodel
            }
        }

        //Using ItemTappedCommand to easy touch Listview and CollectionView Options
        private async Task ItemTappedCommandExecute(Note note)
        {
            //add Parameters to navigation
            var parameters = new NavigationParameters();
            parameters.Add("note", note);

            await NavigationService.NavigateToAsync<NoteViewModel>(parameters);
        }
    }
}
