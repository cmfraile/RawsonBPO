import { useContext } from "react"
import { mainContext } from "../context/mainContext"

const Podcaster = ({children}:any) => {

    const { load } = useContext<{load:boolean}>(mainContext)

    return(
        <>
            <div style={{margin:'10px',display:'flex',justifyContent:'space-between',flexDirection:'row'}} >
                <h3 style={{color:'blue'}}>Podcaster</h3>
                {(load) && <div className="spinner-border text-info" role="status"/>}
            </div>
            <hr />
            {children}
        </>
        
    )

}

export default Podcaster