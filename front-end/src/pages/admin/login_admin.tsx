import { Component, createEffect, createSignal } from 'solid-js';
import { useParams , useNavigate } from "solid-app-router";

import Axios from "axios";
import { Button, HopeProvider, Input } from '@hope-ui/solid';

const login_admin: Component = () => {
    const [password,setpassword] = createSignal({
        password:''
    })
    const params = useParams();
    const navigate = useNavigate();
    createEffect(() => {
        Axios.post(`http://127.0.0.1:3001/admin/${params.admin_id}`)
          .catch((err) => {
            navigate('/');
          })
    })
    async function loginn(){
        await Axios.post(`http://127.0.0.1:3001/login`,password())
          .then((response) => {
            localStorage.setItem('token',response.data.token)
            navigate('/add_film');
          })
          .catch((err) => {
            navigate('/')
          })

        
    }


    return (
        <div style='    position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);'>
            <HopeProvider>
               <Input placeholder="Basic usage" type='password' onChange={(e:any) => {setpassword({...password(),password:e.target.value})}}/>
               <Button style='float: right;' onClick={loginn}>Login</Button>
            </HopeProvider>
        </div>
    )
}

export default login_admin;