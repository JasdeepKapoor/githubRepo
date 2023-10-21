import {BsSearch} from "react-icons/bs"
import { useEffect } from "react"
import {AiFillGithub} from "react-icons/ai"


const Search = ({searchQuery,handleQueryChange,searchRepo})=>{

    useEffect(()=>{
        console.log("sort")
    },[])


    const handleKey =(e)=>{
        if(e.key == 'Enter'){
            searchRepo()
        }
    }

return (
    <>
    <div className="search-container">
    <AiFillGithub style={{fontSize:"2.3rem", transform:"translateX(-100%)"}} className="github-logo"></AiFillGithub>
    <input value={searchQuery} onChange={handleQueryChange} onKeyDown={handleKey} placeholder="Type a repository name"></input>
    <button onClick={searchRepo}><BsSearch></BsSearch></button>
    </div>
    </>
)
}
export default Search