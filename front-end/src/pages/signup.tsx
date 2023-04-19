import { Component, createSignal } from 'solid-js';
import {    Input, 
            HopeProvider,
            Button,
            Heading
        } from "@hope-ui/solid";
import '../styles/signup.css';
import { OBJtoXML } from "../../functions/all";

const signup: Component = () => {
    const [signinfo,setsigninfo] = createSignal({
        first_name:'',
        last_name:'',
        username:'',
        password:''
    });
    function signupp(){
        let xml:any=OBJtoXML(signinfo())
        console.log(xml);
        
    }
    return (
        <div class='signup-container'>
            <HopeProvider>
                <Heading class='login-heading'>Signup</Heading>
                <Input placeholder="first name" size="lg"  onChange={(e:any)=> {
                    setsigninfo({...signinfo(),first_name:e.target.value})
                }}/><br /><br />
                <Input placeholder="last name" size="lg" onChange={(e:any)=> {
                    setsigninfo({...signinfo(),last_name:e.target.value})
                }}/><br /><br />
                <Input placeholder="Username" size="lg" onChange={(e:any)=> {
                    setsigninfo({...signinfo(),username:e.target.value})
                }}/><br /><br />
                <Input placeholder="Password" size="lg" onChange={(e:any)=> {
                    setsigninfo({...signinfo(),password:e.target.value})
                }}/><br /><br />
                <Button class='btn-signup' onClick={signupp}>Signup</Button>
            </HopeProvider>
        </div>
    )
}

export default signup;