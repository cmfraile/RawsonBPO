import { useEffect, useState } from "react";
import { Entry } from "../../interfaces/query";

import '../../pages/styles/podcastList.sass'

interface podcastProps {id:string,name:string,author:string,pic:string}
const Podcast = ({podcast}:{podcast:podcastProps}) => {

    const { id , name , author , pic } = podcast;

    const onClickCallback = () => console.log(id) ;

    return(
        <div className="podcast" onClick={onClickCallback} >
            <img src={pic}/>
            <p className="name">{name}</p>
            <p className="author" >{author}</p>
        </div>
    )

}

interface podcastListProps { data:any , setAmount:(v:number) => void }
const PodcastList = ({data,setAmount}:podcastListProps) => {

    const [ list , setList ] = useState<podcastProps[]>([]);

    useEffect(() => {

        setList(v => {
            const list:podcastProps[] = data.feed.entry.map( (x:Entry) => ({
                id:x.id.label,
                name:x["im:name"].label,
                author:x["im:artist"].label,
                pic:x["im:image"][0].label
            }));
            setAmount(list.length) ; return list ;
        })

    },[data])

    return <div className="podcastList">{list.map( (x,i) => <Podcast key={i} podcast={x}/> )}</div>
}

export { Podcast , PodcastList }

