import { redirect } from "react-router";

export async function action({request, params}){
    const formData = await request.formData();
    const id = params.id;

    const postData = {
        title : formData.get('title'),
        day : formData.get('day'),
        matchTeam : formData.get('matchTeam'),
        matchDesc : formData.get('matchDesc'),
        ratings : JSON.parse(formData.get('ratings'))
    }

    const response = await fetch(`http://localhost:8080/rating/update/${id}`,{
        method : 'POST',
        credentials : 'include',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(postData)
    });

    const resData = await response.json();
    console.log(resData);
    if(resData.status === true){
        return redirect(`/player-rating`)
    } else {
        return resData;
    }


}