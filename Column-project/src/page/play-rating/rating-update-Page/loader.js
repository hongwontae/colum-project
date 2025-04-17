export async function loader({params}){

    const id = params.id
    
    const [auth, response] = await Promise.all([
        fetch('http://localhost:8080/admin/credential',{
            method : 'POST',
            credentials : 'include'
        }),
        fetch(`http://localhost:8080/rating/one/${id}`)
    ])


    const authData = await auth.json()
    const resData = await response.json()
    const formattedResData = resData.RPData.map(ele=>{
        return {
            rating : ele.rating,
            pId : ele.player.pId,
            playerName : ele.player.playerName
        }
    })

    return {
        authData,
        formattedResData,
        resData
    }

}