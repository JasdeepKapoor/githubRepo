const Sort= ({handleSortChange,currentSort,repoData})=>{

    return(
        <>
        <div className="sort-container">
        <label>Sort by</label>
        <select name="sort-by" id="sort-by"  value={currentSort} disabled={repoData.length== 0? true:null}  onChange={(e)=>handleSortChange(e.target.value)}>
            <option hidden disabled selected></option>
            <option value="stargazers_count">  <span className="sort-option">Stars</span>  </option>
            <option value="watchers_count"><span className="sort-option">Watchers</span>  </option>
            <option value="score"><span className="sort-option">Score</span>  </option>
            <option value="login"><span className="sort-option">Name</span>  </option>
            <option value="created_at"><span className="sort-option">Create Date</span> </option>
            <option value="updated_at"><span className="sort-option">Update Date</span> </option>
        </select>
        </div>
        </>
    )
}

export default Sort