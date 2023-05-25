import { createContext, useState } from "react";

export const mainContext = createContext<any>({});
export const mainProvider = ({children}:any) => {

    const [ load , setLoad ] = useState<boolean>(false) ;

    return(
        <mainContext.Provider value={{load,setLoad}}>
            {children}
        </mainContext.Provider>
    )

}