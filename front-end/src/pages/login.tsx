import { Component, createSignal } from 'solid-js';
import {    Input, 
            HopeProvider,
            Button,
            Heading
    } from "@hope-ui/solid";
import { OBJtoXML } from "../../functions/all";
import Axios from "axios";
import '../styles/login.css';
import { useNavigate } from "solid-app-router";

const login: Component = () => {
    const navigate = useNavigate()
    const [logininfo,setlogininfo] = createSignal<any>({
        user:'',
        pass:''
    })
    
    async function signupp(){
        console.log(logininfo());
        
          await Axios.post('http://127.0.0.1:3001/login_user',logininfo())
          .then((response)=>{
            localStorage.setItem('token',response.data.token)
            navigate('/home');
            
          });
        
    }
    return (
        <div class='login-container'>
            <HopeProvider>
                <Heading class='login-heading'>Login</Heading>
                <Input placeholder="Username" size="lg" onchange={(e:any)=>{
                    setlogininfo({...logininfo(),user:e.target.value})                    
                }}/><br /><br />
                    <Input placeholder="Password" size="lg" type='password' onchange={(e:any)=>{
                    setlogininfo({...logininfo(),pass:e.target.value})                    
                }}/><br /><br />
                    <Button class='btn-signup' onClick={signupp}>Signup</Button><br /><br />
                    <p>or <a href="/signup">signup</a></p>
            </HopeProvider>
        </div>
    )
}

export default login;