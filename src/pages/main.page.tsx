import { useState } from "react";
import Search from "../component/main/search.component";
import useForm from "../hooks/useForm.hook";
import { PodcastList } from "../component/main/podcast.component";
import useFetchHook from "../hooks/useFetch.hook";

import '../pages/styles/mainPage.sass'

const Main = () => {

    const [ amount , setAmount ] = useState<number>(0);
    const { formState , onInputChange } = useForm({value:''});

    const { data , isLoading } = useFetchHook({
        route:'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
    })

    return(
        <>
        <div className="row my-3">
            <h3>Podcaster</h3>
            <hr />
            <Search amount={amount} formState={formState} onInputChange={onInputChange} />
        </div>
        <div className="row my-3">
            {(!isLoading)
                ? <PodcastList data={ data } setAmount={setAmount} />
                : <div className="spinner-border" role="status"/>}
        </div>
        </>
    )

}

export { Main }