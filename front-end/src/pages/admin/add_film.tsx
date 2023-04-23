import { Component, createEffect, createSignal } from 'solid-js';
import { 
    Breadcrumb, 
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    Button,
    HopeProvider,
    Input
  } from "@hope-ui/solid";
import { handleKeyPress , getCurrentDate ,OBJtoXMLFILM } from "../../../functions/all";
import '../styles/add_film.css';
import '../styles/admin_dash.css';

import Axios from "axios";
import { useNavigate } from "solid-app-router";

const add_film: Component = () => {
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
    const [minDate, setMinDate] = createSignal(getCurrentDate()) as any;
    const [film,setfilm] = createSignal({
        title:'',
        date:'',
        room:''
    })
    async function add_filmm(){
        let xml = OBJtoXMLFILM(film())
        setfilm({...film(),title:''});
        setfilm({...film(),date:''});
        setfilm({...film(),room:''});
        await Axios.post('http://127.0.0.1:3001/add_film', xml, {
            headers: {
              'Content-Type': 'application/xml',
            },
        }).then(()=>{
            
        })
          
          
    }
    return (
        <div>
            <HopeProvider>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/add_film">Add Film</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/film_list">Film List</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </HopeProvider>
            <div class='add_container'>
                <HopeProvider>
                    <Input value={film().title} placeholder="Film Title" size="lg" onChange={(e:any)=>{
                        setfilm({...film(),title:e.target.value});
                    }} />
                    <Input value={film().date} placeholder="The Screening Date" type='date' min={minDate()} size="lg" onChange={(e:any)=>{
                        setfilm({...film(),date:e.target.value});
                    }}/>
                    <Input value={film().room} placeholder="The Projection Room" size="lg" onKeyPress={handleKeyPress} onChange={(e:any)=>{
                        setfilm({...film(),room:e.target.value});
                    }}/>
                    <Button class='add-film-btn' onClick={add_filmm}>Add Film</Button>
                </HopeProvider>
            </div>
        </div>
    )
}

export default add_film;