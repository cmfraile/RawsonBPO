import '../../pages/styles/podcastList.sass'

export interface podcastProps {id:string,name:string,author:string,pic:string}
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

interface podcastListProps { list:podcastProps[] }
const PodcastList = ({list}:podcastListProps) => {

    return <div className="podcastList">{list.map( (x,i) => <Podcast key={i} podcast={x}/> )}</div>
    
}

export { Podcast , PodcastList }

