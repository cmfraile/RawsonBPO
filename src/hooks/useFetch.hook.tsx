import { useState , useEffect, useContext } from "react";
import { mainContext } from "../context/mainContext";
import { mainInStorage, storage } from "../interfaces/storage";
import { Entry } from "../interfaces/podcastList";
import { Result } from "../interfaces/podcastEpisodes";

type method = 'GET'|'POST'|'PUT'|'DELETE';
interface getFetch {data:any,isLoading:boolean,error:any}
type flag = 'main'|'podcast'|'track';
interface fetchArgument {route:string,method?:method,body?:any,headers?:any,flag?:flag|undefined,id?:string}
const defaultArgument:fetchArgument = {route:'',method:'GET',body:undefined,headers:undefined,flag:undefined}

const storageSave = (data:any,flag:flag|undefined,setState:React.Dispatch<React.SetStateAction<getFetch>>,id?:string) => {
    if(!data){ return }
    switch(flag){
        case 'main' : {
            const finalData = data.feed.entry.map( (x:Entry) => ({
                id:x.id.attributes["im:id"],
                name:x["im:name"].label,
                author:x["im:artist"].label,
                pic:x["im:image"][x["im:image"].length - 1].label,
                summary:x["summary"].label
            }));
            setState({data:finalData,isLoading:false,error:null}) ;
            localStorage.setItem('main',JSON.stringify({date:new Date(),storage:finalData})) ;
        }
        ; break ;
    

        case 'podcast' : {
            if(!id){return};
            const finalData:any[] = data.results.map( (x:Result) => ({
                trackName:x.trackName,releaseDate:new Date(x.releaseDate),trackTimeMillis:x.trackTimeMillis
            })) ;
            setState({data:finalData,isLoading:false,error:null});
            const actualStorage:any|undefined = (localStorage.getItem('podcast') && id) ? JSON.parse(`${localStorage.getItem('podcast')}`) : undefined ;
            if(actualStorage){
                const newStorage = {
                    ...actualStorage,
                    podcasts:{...actualStorage.podcasts,[id]:finalData}
                };
                localStorage.setItem('podcast',JSON.stringify(newStorage));
            } else {
                localStorage.setItem('podcast',JSON.stringify({
                    date:new Date(),
                    podcasts:{[id]:finalData}
                }));
            }

        }

        default : break ;
    }
};

const localOrNet = (flag:flag|undefined,setState:React.Dispatch<React.SetStateAction<getFetch>>,getFetch:() => void,id?:string) => {
        
    const compareDay = (storage:any):void => {
        const takeDay = (date:Date) => `${date.getDate}${date.getMonth}${date.getFullYear}`;
        if(takeDay(storage.date) !== takeDay(new Date())){ getFetch() } else {
            setState(v => ({data:storage.storage,isLoading:false,error:null}));
        }
    }

    if(!flag){ getFetch() }

    switch(flag){

        case 'main': {
            const mainCase:mainInStorage|undefined = ( localStorage.getItem('main') ) ? JSON.parse(`${localStorage.getItem('main')}`) : undefined ;
            if(mainCase == undefined){ getFetch() ; return } ;
            compareDay(mainCase) ;
        } ; break ;

        
        case 'podcast': {
            getFetch() ;
        } ; break ;
        


        default : getFetch() ; break ;

    }

}

const useFetch = ({route,method,body,headers,flag,id}:fetchArgument = {...defaultArgument}) => {

    const { setLoad } = useContext<{setLoad:(value:boolean) => void}>(mainContext)

    const [ state , setState ] = useState<getFetch>({data:null,isLoading:true,error:null});

    const getFetch = async():Promise<void> => {

        setState({...state,isLoading:true});
        await(await fetch(`${route}`,{method,mode:'cors',body,headers})).json()
        .then(data => { storageSave(data,flag,setState,id) })
        .catch(error => {setState({data:null,isLoading:false,error}) });

    }

    useEffect(() => { localOrNet(flag,setState,getFetch,id) },[route]);
    useEffect(() => { setLoad(state.isLoading) },[state])
    
    return({...state,getFetch});
    
}

export default useFetch;