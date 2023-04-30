import { Component, createEffect, createSignal } from 'solid-js';
import { 
    Breadcrumb, 
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    HopeProvider,
    Table,
    TableCaption,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Input
  } from "@hope-ui/solid"
import { useNavigate } from 'solid-app-router';
import  Axios  from 'axios';
import { parseFilms } from "../../functions/all";
const check = () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('No Service Worker support!')
    }
    if (!('PushManager' in window)) {
      throw new Error('No Push API Support!')
    }
}
// I added a function that can be used to register a service worker.
const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('./service.js'); //notice the file name
    return swRegistration;
}

const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    // value of permission can be 'granted', 'default', 'denied'
    // granted: user has accepted the request
    // default: user has dismissed the notification permission popup by clicking on x
    // denied: user has denied the request.
    if(permission !== 'granted'){
        throw new Error('Permission not granted for Notification');
    }
}

const showLocalNotification = (title:any, body:any, swRegistration:any) => {
    const options = {
        body,
        icon: './src/assets/alarme.png',
        // here you can add more properties like icon, image, vibrate, etc.
      actions: [
        { action: 'view', title: 'View' },
        { action: 'dismiss', title: 'Dismiss' }
      ],
      requireInteraction: true
    };
    swRegistration.showNotification(title, options);
}

const Home: Component = () => {
    const navigate = useNavigate()
    const [films,setfilms] = createSignal([]) as any;
    const [searchText, setSearchText] = createSignal('');

    createEffect(async () => {
        check();
        const swRegistration = await registerServiceWorker();
        const permission =  await requestNotificationPermission();
        const subscription = await swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BNT_7NIJ3VRJv0-QvHceJMfNQYarwH7o3kPF4KNOzK4ODpIxij99fYOx7tmz97jYdttGGWAhH3S9ie5F0Pbq3kM'
          })
        console.log(subscription);
        //await Axios.post('http://127.0.0.1:3001/subscription',subscription)
        //showLocalNotification('This is title', 'this is the message', swRegistration);
        let token :any =localStorage.getItem('token');        
        await Axios.get('http://127.0.0.1:3001/get_all_film',{
            headers: {
                'Authorization': `Bearer ${token}`,
            }
            })
        .then((respnse) => {
            let x=respnse.data;
            console.log(respnse.data);
            
            x=parseFilms(x);
            setfilms(x);            
        })
        .catch(()=>{
            navigate('/');
        })
    })
    function myFunction() {
        var input:any, filter:any, table:any, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
      }

    return (
        <div>
            <HopeProvider>
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/home">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/account'>Account</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            </HopeProvider>
            <HopeProvider>
            <Input placeholder="search by title" id="myInput" onKeyUp={myFunction} size="lg" />

            <Table id="myTable">
                <Thead class='header'>
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

export default Home;