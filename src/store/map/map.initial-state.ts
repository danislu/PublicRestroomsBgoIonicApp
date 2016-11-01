import { IMap } from './map.types';

export const INITIAL_STATE : IMap = {
    center: {lat: 60.38197875541822, lng: 5.313919452978548},
    zoom: 12,
    markers: [],
    isLoadingPosition: false
};