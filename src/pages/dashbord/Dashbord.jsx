import React, { useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import {Box}  from "@mui/material"
import AjouterPublication from './components/AjouterPublication'
import CartePub from './components/CartePub'
import { Avatar, IconButton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Dashbord() {
  const [publication, setPublications] = React.useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('utilisateur')) {
      navigate('/connexion')
    }
    // axios.get("http://localhost:3000/publications").then((res) => {
    //   setPublications(res.data);
    // });
  }, [navigate])
 const queryClient = useQueryClient();
 const {data:publications, error, isLoading } = useQuery({
  queryKey: ['publications'],
  queryFn: () => axios.get("http://localhost:3000/publications").then
    ((res) => res.data),
    onError: (error)=>console.log(error),
 });
//  console.log(publications);
   if(isLoading){
    return <div>Chargement...</div>
   }
  
     let pubTrier = publications.sort((a,b)=>{
       return new Date (b.datePublication) - new Date(a.datePublication)
     })  
  return (
  <Box bgcolor={"#eef4ff"}>
    <ReactQueryDevtools />
    <Navbar />
    <AjouterPublication />
    <Box width={"60%"} margin={"auto"} marginTop={5}>
      {publications&& publications.map((publication) => (
        <CartePub publication={publication} />
      ))}
    </Box>
  </Box>
)}
 