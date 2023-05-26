import Podcaster from "../layout/Podcaster";

import '../pages/styles/podcastDetail.sass'

//Description : Summary -> label
interface episodes { name:string , link:string , date:Date , duration:string }
interface podcastInDetail {
    pic:string,
    name:string,
    artist:string,
    description:string,
    episodes:episodes[]
}
const episodesPlaceholder = ():episodes[] => {
    const array:episodes[] = [] ;
    for(let i = 0 ; i <= 10 ; i++){
        array.push(
            {
                name:'Lorem Ipsum',
                link:'http://google.es',
                date:new Date(),
                duration:'20:00'
            }
        )
    };
    return array;
}
const podcastInDetailPlaceholder:podcastInDetail = {
    pic:'https://picsum.photos/200',
    name:'Lorem ipsum dolor',
    artist:'lorem ipsum',
    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa magnam, ipsum accusantium accusamus ex perferendis.',
    episodes:episodesPlaceholder()
}

const PodcastDetail = ({id}:{id?:string}) => {

    const { pic , name , artist , description , episodes } = podcastInDetailPlaceholder ;

    return(
        <>
        <div className="container">
            <Podcaster>

                <div className="row my-5">

                    <div className="col-3 detail">
                        <div className="detailCard">
                            <img src={pic} alt="" />
                            <hr />
                            <div className="podcastAndArtist"><p className="podcast">{name}</p><p className="artist">by {artist}</p></div>
                            <hr />
                            <p className="description">
                                <span>Description :</span><br />
                                {description}
                            </p>
                        </div>
                    </div>

                    <div className="col-9 episodesList">
                        <div className="episodesCount">Episodes : {episodes.length}</div>
                        <div className="tableSquare">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="col-8">Title</th>
                                    <th className="col">Date</th>
                                    <th className="col">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {episodes.map(x => 
                                (
                                    <tr>
                                        <th><a href={x.link}>{x.name}</a></th>
                                        <td>{`${x.date.getDay()}/${x.date.getMonth()}/${x.date.getFullYear()}`}</td>
                                        <td>{x.duration}</td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </Podcaster>
        </div>
        </>
    )
    
}

export { PodcastDetail }