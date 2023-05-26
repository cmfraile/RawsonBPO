import { useContext } from 'react';
import '../../pages/styles/podcastList.sass';
import { appNavigate, mainContext } from '../../context/mainContext';
import { useNavigate } from 'react-router-dom';

export interface podcastProps {id:string,name:string,author:string,pic:string,summary:string}
const Podcast = ({podcast}:{podcast:podcastProps}) => {

    const nav = useNavigate()
    const { id , name , author , pic } = podcast;

    const onClickCallback = () => {
        nav(`/podcast/${id}`)
    };

    return(
        <div className="podcast" onClick={onClickCallback} >
            <img src={pic}/>
            <p className="name">{name}</p>
            <p className="author" >{author}</p>
        </div>
    )

}

interface podcastListProps { list:podcastProps[] }
const PodcastList = ({list}:podcastListProps) => <div className="podcastList">{list.map( (x,i) => <Podcast key={i} podcast={x}/> )}</div>

export { Podcast , PodcastList }

