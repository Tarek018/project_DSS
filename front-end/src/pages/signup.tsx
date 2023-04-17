import { Component } from 'solid-js';
import {    Input, 
            HopeProvider,
            Button,
            Heading
        } from "@hope-ui/solid";
import '../styles/signup.css'
const signup: Component = () => {
    return (
        <div class='signup-container'>
            <HopeProvider>
                <Heading class='login-heading'>Signup</Heading>
                <Input placeholder="first name" size="lg" /><br /><br />
                <Input placeholder="last name" size="lg" /><br /><br />
                <Input placeholder="Username" size="lg" /><br /><br />
                <Input placeholder="Password" size="lg" /><br /><br />
                <Button class='btn-signup'>Signup</Button>

            </HopeProvider>
        </div>
    )
}

export default signup;