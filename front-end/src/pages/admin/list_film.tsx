import { Component, createEffect, createSignal } from 'solid-js';
import { 
    Breadcrumb, 
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    Button,
    HopeProvider,
    Input,
    Table,
    TableCaption,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td
  } from "@hope-ui/solid";

import  Axios from 'axios';
import { parseFilms } from "../../../functions/all";

const list_film: Component = () => {
    const [films,setfilms] = createSignal([]) as any
    createEffect(() => {
        let token :any =localStorage.getItem('token');        
        Axios.get('http://127.0.0.1:3001/get_all_film',{
            headers: {
                'Authorization': `Bearer ${token}`,
            }
            })
        .then((respnse) => {
            let x=respnse.data
            x=parseFilms(x)
            setfilms(x)
            
        })
    })
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
            <HopeProvider>
            <Table>
                <Thead>
                    <Tr>
                    <Th>Title</Th>
                    <Th>Date</Th>
                    <Th>Room</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {films().map((film:any) => (
                    <Tr>
                        <Td>{film.title}</Td>
                        <Td>{film.screeningDate}</Td>
                        <Td>{film.projectionRoom}</Td>
                    </Tr>
                    ))}
                    
                </Tbody>
               
            </Table>
            </HopeProvider>
        </div>
    )
}

export default list_film;