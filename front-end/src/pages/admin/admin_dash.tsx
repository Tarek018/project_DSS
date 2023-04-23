import { Component, createEffect } from 'solid-js';
import { 
    Breadcrumb, 
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    HopeProvider
  } from "@hope-ui/solid";
import '../styles/admin_dash.css'
import { useParams , useNavigate } from "solid-app-router";
import  Axios  from 'axios';


const admin_dash: Component = () => {
    const navigate = useNavigate();
    createEffect(() => {
        let token :any =localStorage.getItem('token');
        Axios.get('http://127.0.0.1:3001/verify_token', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            })
            .catch(error => {
            navigate('/')
            });
        })
    return (
        <div>
            <HopeProvider>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/add_film">Add Film</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Film List</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </HopeProvider>
        </div>
    )
}

export default admin_dash;