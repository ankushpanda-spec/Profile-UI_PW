import {AuthHeader, SideNavbar} from './components';

const App = () => {
  return (
    <div className="flex justify-end">
      <SideNavbar />
      <AuthHeader
        onAppDownloadClick={() => alert('Downloading App')}
        onBackClick={() => alert('Going Back')}
        onCohortClick={() => alert('Cohort Clicking')}
        onMenuClick={() => alert('Clicking Menu')}
        onProfileClick={() => alert('Clicking Profile')}
        toggleCohortVisibility={true}
      />
    </div>
  );
};

export default App;
