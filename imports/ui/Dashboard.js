import React from 'react';

import PrivateHeader from './PrivateHeader';
import NotesList from './NotesList';

export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
          <NotesList />
      </div>
    </div>
  );
};
