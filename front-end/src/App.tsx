import type { Component } from 'solid-js';


import { Button ,HopeProvider} from "@hope-ui/solid"
import { Route, Routes } from 'solid-app-router';
import signup from './pages/signup';
import login from './pages/login';

const App: Component = () => {
  return (
    <>
     <Routes>
        <Route path='/signup' component={signup} />
        <Route path='/login' component={login} />
     </Routes>
    </>
  );
};

export default App;
