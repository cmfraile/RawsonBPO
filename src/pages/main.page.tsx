import { useState } from "react";
import Search from "../component/main/search.component";
import useForm from "../hooks/useForm.hook";
import { PodcastList } from "../component/main/podcast.component";
import useFetchHook from "../hooks/useFetch.hook";
import { podcastProps } from "../component/main/podcast.component";
import { useEffect } from "react";
import Podcaster from "../layout/Podcaster";

import '../pages/styles/mainPage.sass'

const Main = () => {

    const [ amount , setAmount ] = useState<number>(0);
    const { formState , onInputChange } = useForm({value:''});

    const { data , isLoading } = useFetchHook({
        route:'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
    })

    const [ list , setList ] = useState<podcastProps[]>([]);

    useEffect(() => {

        setList(v => {
            if(data == null){return []}
            let list:podcastProps[] = data.feed.entry.map( (x:any) => ({
                id:x.id.label,
                name:x["im:name"].label,
                author:x["im:artist"].label,
                pic:x["im:image"][0].label
            }));
            list = list.filter(x => {
                const name = x.name.toLowerCase();
                const author = x.author.toLowerCase();
                const input = formState.value.trim().toLowerCase();
                if(name.includes(input) || author.includes(input)){return true}else{return false}
            })
            setAmount(list.length) ; return list ;
        }) ;

    },[data,formState.value])

    return(
        <Podcaster>
            <div className="row my-3">
                <Search amount={amount} formState={formState} onInputChange={onInputChange} />
            </div>
            <div className="row my-3">
                {(!isLoading)
                    ? <PodcastList list={ list } />
                    : <></>}
            </div>
        </Podcaster>
    )

}

export { Main }