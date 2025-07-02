import React, { useState } from 'react';
import { Page } from './types';
import EntranceScreen from './components/EntranceScreen';
import FullInvitationPage from './components/FullInvitationPage';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('entrance');

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div className="font-serif">
      {currentPage === 'entrance' && (
        <EntranceScreen onEnter={() => handlePageChange('fullInvitation')} />
      )}
      {currentPage === 'fullInvitation' && (
        <FullInvitationPage onBack={() => handlePageChange('entrance')} />
      )}
    </div>
  );
}

export default App;