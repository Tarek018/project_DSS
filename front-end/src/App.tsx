import type { Component } from 'solid-js';


import { Button ,HopeProvider} from "@hope-ui/solid"
import { Route, Routes } from 'solid-app-router';
import signup from './pages/signup';
import login from './pages/login';
import add_film from './pages/admin/add_film';
import login_admin from './pages/admin/login_admin';
import Home from './pages/Home';
import list_film from './pages/admin/list_film';
import account from './pages/account';


const App: Component = () => {
  
  return (
    <>
     <Routes>
        <Route path='/' component={login} />
        <Route path='/home' component={Home} />
        <Route path='/signup' component={signup} />
        <Route path='/:admin_id' component={login_admin} />
        <Route path='/add_film' component={add_film} />
        <Route path='/film_list' component={list_film} />
        <Route path='/account' component={account} />
     </Routes>
    </>
  );
};

export default App;
