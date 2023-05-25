interface searchProps { amount:number , formState:{[key:string]:string} , onInputChange:({ target }:{target:{name:string;value:string }}) => void }
const Search = ({amount,formState,onInputChange}:searchProps) => {

    const submitMiddleware =
    (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() ;
    }

    return(
        <div className="row">
            <form className="searchForm" onSubmit={submitMiddleware}>
                <p>{amount}</p>
                <div className="form-group">
                    <input name='value' autoComplete='off' value={formState.value} onChange={onInputChange} className="form-control"/>
                </div>
            </form>
        </div>
    )
}

export default Search