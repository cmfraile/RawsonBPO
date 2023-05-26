import { useState , useEffect, useContext } from "react";
import { mainContext } from "../context/mainContext";
import { mainInStorage, storage } from "../interfaces/storage";

type method = 'GET'|'POST'|'PUT'|'DELETE';
interface getFetch {data:any,isLoading:boolean,error:any}
type flag = 'main'|'podcast'|'track';
interface fetchArgument {route:string,method?:method,body?:any,headers?:any,flag?:flag|undefined}
const defaultArgument:fetchArgument = {route:'',method:'GET',body:undefined,headers:undefined,flag:undefined}

const storageSave = (data:any,flag:flag|undefined,setState:React.Dispatch<React.SetStateAction<getFetch>>) => {
    switch(flag){
        case 'main' :
            const finalData = data.feed.entry ;
            setState({data:finalData,isLoading:false,error:null}) ;
            localStorage.setItem('main',JSON.stringify({date:new Date(),storage:finalData})) ;
        ; break ;
        default : break ;
    }
};

const localOrNet = (flag:flag|undefined,setState:React.Dispatch<React.SetStateAction<getFetch>>,getFetch:() => void) => {
        
    const compareDay = (storage:any):void => {
        const takeDay = (date:Date) => `${date.getDate}${date.getMonth}${date.getFullYear}`;
        if(takeDay(storage.date) !== takeDay(new Date())){ getFetch() } else {
            setState(v => ({data:storage.storage,isLoading:false,error:null}));
        }
    }

    if(!flag){ getFetch() }

    switch(flag){

        case 'main':
            const mainCase:mainInStorage|undefined = ( localStorage.getItem('main') ) ? JSON.parse(`${localStorage.getItem('main')}`) : undefined ;
            if(mainCase == undefined){ getFetch() ; return } ;
            compareDay(mainCase) ;
        ; break ;

        default : getFetch() ; break ;

    }

}

const useFetch = ({route,method,body,headers,flag}:fetchArgument = {...defaultArgument}) => {

    const { setLoad } = useContext<{setLoad:(value:boolean) => void}>(mainContext)

    const [ state , setState ] = useState<getFetch>({data:null,isLoading:true,error:null});

    const getFetch = async():Promise<void> => {

        setState({...state,isLoading:true});
        await(await fetch(`${route}`,{method,mode:'cors',body,headers})).json()
        .then(data => { storageSave(data,flag,setState) })
        .catch(error => {setState({data:null,isLoading:false,error}) });

    }

    useEffect(() => { localOrNet(flag,setState,getFetch) },[route]);
    useEffect(() => { setLoad(state.isLoading) },[state])
    
    return({...state,getFetch});
    
}

export default useFetch;