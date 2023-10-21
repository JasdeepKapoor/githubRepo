import { useEffect } from "react"
import {AiOutlineStar} from "react-icons/ai"


const RepoCard =({item})=>{



    const {language,stargazers_count,description,key}= item
    const {login,avatar_url}= item.owner

    return(
        <>
        <div className="card-container" key={key} >
            <div className="name_avatar-container"> 
            <div className="img-container">
                <img src={avatar_url}></img>
            </div>
            <span>{login.charAt(0).toUpperCase()+ login.slice(1)}</span>
            </div> 
        <div className="description-container"><h5>{description}</h5></div>
        <div className="language_star-container"><span>{language}</span>
        <div className="star-container"> <AiOutlineStar/><span>{stargazers_count}</span></div>
        </div>
        </div>
        </>
    )
}
export default RepoCard