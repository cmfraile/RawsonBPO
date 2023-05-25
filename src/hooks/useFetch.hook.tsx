import { useState , useEffect, useContext } from "react";
import { mainContext } from "../context/mainContext";

type method = 'GET'|'POST'|'PUT'|'DELETE';
interface getFetch {data:any,isLoading:boolean,error:any}
interface fetchArgument {route:string,method?:method,body?:any,headers?:any};
const defaultArgument:fetchArgument = {route:'',method:'GET',body:undefined,headers:undefined}

const useFetch = ({route,method,body,headers}:fetchArgument = defaultArgument) => {

    const { setLoad } = useContext<{setLoad:(value:boolean) => void}>(mainContext)

    const [ state , setState ] = useState<getFetch>({data:null,isLoading:true,error:null});

    const getFetch = async():Promise<void> => {

        setState({...state,isLoading:true});
        await(await fetch(`${route}`,{method,mode:'cors',body,headers})).json()
        .then(data => {setState({data,isLoading:false,error:null}) })
        .catch(error => {setState({data:null,isLoading:false,error}) });

    }

    useEffect(() => { getFetch() },[route]);
    useEffect(() => { setLoad(state.isLoading) },[state])
    
    return({...state,getFetch});
    
}

export default useFetch;