import React from 'react';
import {AuthHeader} from './components';

const App = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
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
