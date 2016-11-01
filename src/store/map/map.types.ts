
export interface IPos {
    lat: number,
    lng: number
}

export interface IMarker {
    content?: string;
    pos: IPos,
    icon?: string
}

export interface IMap {
    center: IPos,
    zoom: number,
    markers?: IMarker[],
    isLoadingPosition: boolean
}
