import PodcastDetail from "../layout/PodcastDetail";
import '../pages/styles/podcastDetail.sass';

interface trackProps { title:string , description:string , sponsors:{name:string,link:string}[] , track:string }
const trackPlaceholder:trackProps = {
    title:'Lorem Ipsum - Dolor',
    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi aut autem ullam odit? Velit eos dolorem iusto maiores asperiores veniam perspiciatis vel similique reprehenderit quod assumenda quibusdam dolores necessitatibus, voluptatem, aspernatur quidem rerum, nisi quam nulla dolor optio officiis omnis repudiandae. Cumque, voluptate provident! Autem minima reprehenderit pariatur. A, eius.',
    sponsors:[
        {name:'lorem',link:'www.google.es'},
        {name:'lorem',link:'www.google.es'},
        {name:'lorem',link:'www.google.es'},
    ],
    track:'www.google.es'
}
const Track = () => {

    const { title , description , sponsors , track } = trackPlaceholder ;

    return(
        <PodcastDetail>
            <div className="trackDetail">
                
                <p className="title">{title}</p><hr />
                <p className="description">{description}</p>
                <p className="sponsors">
                    Sponsored by : 
                    {(sponsors.map((x,i) => <a key={i} href={x.link}>{x.name}</a> ))}
                </p><hr />

            </div>
        </PodcastDetail>
    )
    
}

export { Track }