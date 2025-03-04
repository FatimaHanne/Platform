import React, { use } from 'react'
import {Avatar, Box,IconButton,Stack,Typography}  from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
export default function CartePub({publication}) {
    const user = JSON.parse(localStorage.getItem("utilisateur"));
    // Utiliser le client de requête pour invalider la liste des publications
    const useQuery = useQueryClient();
    // Mutation pour supprimer une publication
    const mutation = useMutation({
       mutationFn:(id) => {
         return axios.delete(`http://localhost:3000/publications/${id}`);
       },
       onError:(error) =>{
        toast.error("Une erreur est survenue")
       },
       onSuccess:()=>{
        useQuery.invalidateQueries("publications"); // Mise à jour de la liste des publications
        toast.success("Publication supprimée avec succès");
       }
    })
   
    const supprimerPublication = (id) => {
        // Supprimer la publication avec l'id
        mutation.mutate(id);
        }
  return (
    <Box width={"100%"} bgcolor={"white"} borderRadius={4} marginBottom={3}
    padding={2}key={publication.id}>
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <Avatar src={publication.photoUtilisateur}/>
        <Typography>{publication.auteur}</Typography>
        {user.id === publication.idUtilisateur && (
                <IconButton aria-label="delete" onClick={()=>supprimerPublication(publication.id)}>
                <DeleteIcon />
               </IconButton>
            )}
      </Stack>
      <Typography>{publication.textePublication}</Typography>
      <img src={publication.imagePublication} style={{width: "100%", borderRadius:4,}}/>
    </Box>
  )
}
