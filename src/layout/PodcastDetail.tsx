import Podcaster from "./Podcaster" ;
import '../pages/styles/podcastDetail.sass' ;

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

const PodcastDetail = ({children}:any) => {

    const { pic , name , artist , description } = podcastInDetailPlaceholder ;

    return(
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

                    <div className="col-9">{children}</div>

                </div>

            </Podcaster>
        </div>
    )
    
}

export default PodcastDetail