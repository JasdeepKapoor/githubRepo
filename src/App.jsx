import { useEffect, useState } from 'react'
import { MagnifyingGlass } from "react-loader-spinner"
import './App.css'
import Search from './components/Search';
import RepoCard from './components/RepoCard';
import Sort from "./components/Sort"

const githubAPIEndpoint = 'https://api.github.com/search/repositories';

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [repoData, setRepoData] = useState([])
  const [filteredData,setFilteredData]= useState()
  const [isLoading, setIsLoading] = useState(false)
  const [errMessage, setErrMessage] = useState("")
  const [currentSort, setCurrentSort] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const arr= new Array(10).fill(0)


  const searchRepo = () => {
    if( searchQuery.length >0){
      setCurrentSort("")
      setIsLoading(true)
      fetch(`${githubAPIEndpoint}?q=${searchQuery}?page=${currentPage}`).then((res) => res.json()).then((data) => {
  
        setRepoData(data.items)
        setFilteredData(data.items)
        setIsLoading(false)
      }).catch((err) => setErrMessage(err.message))
    }
  }

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value)
  }

  if(repoData.length>0) console.log()


  if (errMessage) {
    return (
      <div style={{ display: "flex", justifyContent: 'center' }}>
        <h2>{errMessage}</h2>
      </div>
    )
  }

  const handleSortChange = (data) => {
    setCurrentSort(data)
  }



  useEffect(() => {
    // console.log(repoData)
    let temp= [...repoData]
    if (repoData) {
      if(currentSort === "stargazers_count"|| currentSort === "watchers_count"|| currentSort === "score" ){
        temp.sort((a,b)=> b[currentSort]- a[currentSort])
        setFilteredData(temp)
      }
      if(currentSort === "login"){
        temp.sort((a,b)=> a.owner.login.localeCompare(b.owner.login))
        setFilteredData(temp)
      }
      if(currentSort === "created_at"|| currentSort === "updated_at"){

        temp.sort((a,b)=>{
          let d1= new Date(a[currentSort])
          let d2= new Date(b[currentSort])
          
         return (d1-d2)
        })
        setFilteredData(temp)
      }
    }

  }, [currentSort])

  const handlePageChange =(e)=>{
    setCurrentPage(e.target.textContent)
  }

  useEffect(()=>{
    console.log("calld once")
    searchRepo()

  },[currentPage])

  return (
    <>
      <Search searchQuery={searchQuery} handleQueryChange={handleQueryChange} searchRepo={searchRepo}></Search>
      <Sort handleSortChange={handleSortChange} currentSort={currentSort} repoData={repoData}></Sort>
      {isLoading ? <div className='loader-container'>
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor='#eaeaea'
          color='black'
        />
      </div> : <div className='cards-container'>
        {
          filteredData && filteredData.map((item, index) => (
            <RepoCard item={item} key={item.id}></RepoCard>

          ))
        }
       {repoData.length>0 &&  <div className={'page-number-container'} >
         {arr.map((item,index)=> <span  key={`item${index}`} onClick={handlePageChange} className={index+1 == currentPage ? "active": ""}>{index+1}</span>)}
        </div>}
      </div>}
        


    </>
  )
}

export default App
