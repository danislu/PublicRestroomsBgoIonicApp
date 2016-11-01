import { 
    Component, 
    ViewChild, 
    ElementRef, 
    Input, 
    Output,
    EventEmitter, 
    OnInit
} from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs';

import { IPos, IMarker } from './../../store';

declare var google;

@Component({
    selector: 'dsl-map',
    templateUrl: 'map.html'
})
export class Map extends OnInit {
    
    @Input() headline: string;
    @Input() zoom: Observable<number>;
    @Input() center: Observable<IPos>;
    @Input() markers: Observable<Array<IMarker>>;
    @Output() centerChanged: EventEmitter<IPos> = new EventEmitter<IPos>();
    @Output() zoomChanged: EventEmitter<number> = new EventEmitter<number>();

    @ViewChild('googlemap') mapElement: ElementRef;
    googlemap: any;
    private lastEmittedPos: IPos;
    private currentMarkers: Array<any> = [];

    constructor(public navCtrl: NavController) {
        super();    
    }

    ngOnInit() {
        this.loadMap();

        this.zoom.subscribe((z) => this.googlemap.setZoom(z));
        this.center.subscribe((c) => this.googlemap.setCenter(new google.maps.LatLng(c.lat, c.lng)));
        this.markers.subscribe((markers) => {
            this.currentMarkers.map((m) => m.setMap(null));
            this.currentMarkers = [];
            markers.map((m) => this.addMarker(m))
        }); 
    }

    private loadMap() {

        const latLng = new google.maps.LatLng(0,0);
        const mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }

        this.googlemap = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        let lastZoom : number = 15;
        google.maps.event.addListener(this.googlemap, 'zoom_changed', () => {
            const zoom = this.googlemap.getZoom();
            if (lastZoom !== zoom){
                lastZoom = zoom;
                this.zoomChanged.emit(zoom);
            }
        });

        let lastPos : IPos = this.getPosFromLatLng(this.googlemap.getCenter());
        google.maps.event.addListener(this.googlemap, 'center_changed', () => {
            const center = this.getPosFromLatLng(this.googlemap.getCenter());
            if (!this.isSamePos(lastPos, center)){
                lastPos = center;
                this.emitCenterChanged(center);
            }
        });
    }

    private emitCenterChanged(pos: IPos): void {
        if (this.isSamePos(this.lastEmittedPos, pos))
            return;

        this.lastEmittedPos = pos;
        this.centerChanged.emit(pos);
    }

    private isSamePos(pos1: IPos, pos2: IPos): boolean {
        return pos1 && pos2 && (pos1.lat === pos2.lat && pos1.lng === pos1.lng)
    }

    private getPosFromLatLng({lat, lng}) : IPos {
        return {lat: lat(), lng: lng()};
    }

    private addMarker(m : IMarker) {
        const marker = new google.maps.Marker({
            map: this.googlemap,
            position: m.pos,
            icon: m.icon
        });

        this.addInfoWindow(marker, m.content);

        this.currentMarkers.push(marker);
    }

    private addInfoWindow(marker, content) {
        const infoWindow = new google.maps.InfoWindow({
            content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.googlemap, marker);
        });
    }
}