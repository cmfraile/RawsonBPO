import { createContext, useState } from "react";

export type appNavigate = 'main'|'podcastDetail'|'episodeDetail';
export const mainContext = createContext<any>({});
export const mainProvider = ({children}:any) => {

    const [ load , setLoad ] = useState<boolean>(false) ;
    const [ navigate , setNavigate ] = useState<appNavigate>('main');

    return(
        <mainContext.Provider value={{
            load,setLoad,
            navigate,setNavigate,
        }}>
            {children}
        </mainContext.Provider>
    )

}