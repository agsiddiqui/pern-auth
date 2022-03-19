import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Register,
  UserVerification,
  Protectedroute,
  Error,
  Landing,
} from './pages';
import {
  Allentries,
  Addentry,
  Profile,
  Sharedlayout,
  Stats,
} from './pages/dashboard/index.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Protectedroute>
              <Sharedlayout />
            </Protectedroute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='add-entry' element={<Addentry />} />
          <Route path='all-entries' element={<Allentries />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/verify/:id' element={<UserVerification />} />
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
