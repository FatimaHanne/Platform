import {Stack, TextField, Button, colors, }  from "@mui/material"
import { useForm, } from "react-hook-form"
import { toast } from 'react-hot-toast';
import { useMutation , useQueryClient} from "@tanstack/react-query";


import React from 'react'
import axios from "axios";

export default function AjouterPublication() {
  const user = JSON.parse(localStorage.getItem("utilisateur"));
 const { register, handleSubmit, reset,
      formState: { errors },
    } = useForm();

    const useQuery = useQueryClient();

    const mutation = useMutation({
      mutationFn: (pub) => {
        return axios.post("http://localhost:3000/publications", pub);
      },
      onError: (error) => {
        toast.error("Erreur lors de l'envoi de la publication : " + error.message);
      },
      onSuccess: () => {
        reset();
        useQuery.invalidateQueries("publications"); // Mise à jour de la liste des publications
        toast.success("Publication ajoutée avec succès!");
      },
     });    
      const onSubmit = (data) =>{
        const publication ={
          ...data,
          idUtilisateur: user.id,
          datePublication:new Date(),
          likePublication:0,
          auteur:user.nomUtilisateur,
        };
        mutation.mutate(publication );
        // axios.post("http://localhost:3000/publications", publication)
        // .then((res) => {
          // console.log("Réponse reçue :", res.data);
          // toast.success("Publication ajoutée !");
          // reset();
        // })
        // .catch((err) => {
          // console.log("Erreur Axios :", err);
          // toast.error("Une erreur est survenue");
        // });
      };
  return <Stack width={"60%"} margin={"auto"} >
    <h2>Ajouter une publication</h2>
    <form style={{marginTop:4}}
     onSubmit={handleSubmit(onSubmit)}
    >
      <Stack gap={2} >
             <TextField id="filled-basic" label="Veuiillez saisir votre publication"  variant="outlined" 
             fullWidth size="small" type="text" multiline rows={4} {... register("textePublication", {
              required:"Veuillez saisir un texte", minLength:10, message: "Veuillez saisir un texte de plus de 10 caractéres" ,
              })}  
            />
               <TextField id="filled-basic" label="Saire l'url de votre image" variant="outlined" 
               fullWidth size="small" type="text" {... register("imagePublication", {
                required:"Veuillez saisir une url",
               })}  
           />
           <Button variant="contained" type="submit">Publier</Button>
        </Stack>
    </form>
    {/* Formulaire pour ajouter une publication */}
    {/* Bouton pour valider le formulaire */}
    {/* Bouton pour annuler le formulaire */}
  </Stack>
}
