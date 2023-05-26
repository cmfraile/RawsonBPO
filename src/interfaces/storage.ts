import { podcastProps } from "../component/main/podcast.component";

export interface storage {
    date:Date
}

export interface mainInStorage extends storage {
    storage:podcastProps[]
}

export interface podcastInStorage extends storage {}