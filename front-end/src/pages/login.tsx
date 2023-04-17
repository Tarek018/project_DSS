import { Component, createSignal } from 'solid-js';
import {    Input, 
            HopeProvider,
            Button,
            Heading
    } from "@hope-ui/solid";
import { OBJtoXML } from "../../functions/all";
import '../styles/login.css';

const login: Component = () => {
    const [logininfo,setlogininfo] = createSignal<any>({
        user:'',
        pass:''
    })
    
    function signupp(){
      
          let xml=OBJtoXML(logininfo())
        console.log(xml);
        
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