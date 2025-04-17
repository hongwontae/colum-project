import { json, redirect } from "react-router";

export async function action({request}){

    const formData = await request.formData();

    const postData = {
        title : formData.get('title'),
        day : formData.get('day'),
        matchDesc : formData.get('matchDesc'),
        matchTeam : formData.get('matchTeam'),
        ratings : JSON.parse(formData.get('ratings'))
    };

    const response = await fetch('http://localhost:8080/rating/register',{
        method : 'POST',
        credentials : 'include',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(postData)
    })

    if(!response.ok){
        throw json({message : 'error'}, {status : 404, statusText : 'http failed'});
    }

    const resData = await response.json();

    if(resData.status === true){
        return redirect('/player-rating?page=1')
    } else {
        return resData;
    }


}