import { Component, createEffect, createSignal } from 'solid-js';
import { 
    Breadcrumb, 
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    Button,
    HopeProvider,
    Input,
  } from "@hope-ui/solid"
import Axios from 'axios';
import { useNavigate } from 'solid-app-router';
const account: Component = () => {
    const navigate = useNavigate()
    const [account,setaccount] = createSignal({}) as any;
    const [accountt,setaccountt] = createSignal({
        last_name:'',
        first_name:'',
        username:'',
        old_password:'',
        nv_password:''
    }) as any;

    createEffect(() => {
        let token :any =localStorage.getItem('token');
        Axios.get('http://127.0.0.1:3001/get_my_account',{
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then((response) => {
            setaccount(response.data.account);            
        })
        .catch((Err) =>{
            navigate('/')
        })

    })
    function update(){
        let token = localStorage.getItem('token');
        if(accountt().old_password !== accountt().nv_password){
            alert('sadadsasd');
            return;
        }
        Axios.post('http://127.0.0.1:3001/update_account',accountt(),{
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then((response) => {
            localStorage.setItem('token',response.data.token)
        })
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
                <div class="account-container" style='
                                                            position: absolute;
                                                            left: 50%;
                                                            top: 50%;
                                                            transform: translate(-50%,-50%);
                                                        '>
                    <Input htmlSize={35} width="auto" value={account().last_name} onChange={(e:any)=>{
                        setaccountt({...accountt(),last_name:e.target.value})
                    }} />
                    <Input htmlSize={35} width="auto"  value={account().first_name} onChange={(e:any)=>{
                        setaccountt({...accountt(),first_name:e.target.value})
                    }}/>
                    <Input htmlSize={35} width="auto" value={account().username} onChange={(e:any)=>{
                        setaccountt({...accountt(),username:e.target.value})
                    }}/>
                    <Input htmlSize={35} width="auto" placeholder='password' type='password' onChange={(e:any)=>{
                        setaccountt({...accountt(),old_password:e.target.value})
                    }}/>
                    <Input htmlSize={35} width="auto" placeholder='confirmed password' type='password' onChange={(e:any)=>{
                        setaccountt({...accountt(),nv_password:e.target.value})
                    }}/>
                    <Button style='float:right;' onClick={update}>Button</Button>
                </div>
            </HopeProvider>
        </div>
    )
}

export default account;