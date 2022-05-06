using System;
using System.Diagnostics;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using xamarinapp.Helpers;
using Xamarin.Forms.MVVMBase;
using Xamarin.Forms.MVVMBase.Services.Navigation;
using xamarinapp.View;
using xamarinapp.ViewModel;
using xamarinapp.Services;

namespace xamarinapp
{
    public partial class App : Application
    {
        public App()
        {
            Debug.WriteLine("init..");
            InitializeComponent();
            Constants.BaseUrl = new Uri("http://localhost:3000");
            BuildDependencies();
            InitNavigation();
            MainPage = new NavigationPage(new MainPage());
            var NoteService = new NoteService();
            new MainViewModel(NoteService);
        }

        private void BuildDependencies()
        {
            //Container.Current.RegisterForNavigation<MainPage, MainViewModel>();
            //Container.Current.RegisterForNavigation<NotePage, NoteViewModel>();

            //Register services for use
            Container.Current.Register<INoteService, NoteService>(LifeTime.Singleton);

            //Configure Container
            Container.Current.Setup();
        }

        async void InitNavigation()
        {
            var navigationService = Container.Current.Resolve<INavigationService>();

            //Basic Startup
            await navigationService.InitializeAsync<MainViewModel>(null, true);
        }


        protected override void OnStart()
        {
        }

        protected override void OnSleep()
        {
        }

        protected override void OnResume()
        {
        }
    }
}
