import type { Component } from 'solid-js';


import { Button ,HopeProvider} from "@hope-ui/solid"
import { Route, Routes } from 'solid-app-router';
import signup from './pages/signup';
import login from './pages/login';
import add_film from './pages/admin/add_film';
import login_admin from './pages/admin/login_admin';
import Home from './Home';
import list_film from './pages/admin/list_film';


const App: Component = () => {
  
  return (
    <>
     <Routes>
        <Route path='/' component={Home} />
        <Route path='/signup' component={signup} />
        <Route path='/login' component={login} />
        <Route path='/:admin_id' component={login_admin} />
        <Route path='/add_film' component={add_film} />
        <Route path='/film_list' component={list_film} />

     </Routes>
    </>
  );
};

export default App;
