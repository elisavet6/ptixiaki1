import {Component, OnInit} from '@angular/core';
import {Video} from "./domain/video";
import {ApiService} from "../services/api.service";
import {AuthService} from "../services/auth.service";
import {MatChipsModule} from '@angular/material/chips';
import {Mathima} from "../mathima/domain/mathima";
import {FormControl} from "@angular/forms";
import {ReplaySubject, Subject, takeUntil} from "rxjs";
@Component({
  selector: 'app-videostreaming',
  templateUrl: './videostreaming.component.html',
  styleUrls: ['./videostreaming.component.css']
})
export class VideostreamingComponent implements OnInit{

  video_list: Video[];
  filtered: Video[];
  private users: any;
  user_id: string;
  apiLoaded= false;
  searchUsername: string;
  searchVideoName: string;
  selectedMathimata: string[];
  youtube_only: boolean;
  uploaded: boolean;
  top_rated: boolean;
  mathima_list: Mathima[];
  mathimata: ReplaySubject<Mathima[]> = new ReplaySubject<Mathima[]>(1);
  //@ts-ignore
  mathimaCtrl: FormControl<Mathima[]>= new FormControl<Mathima[]>([]);
//@ts-ignore
  subMathimataList: FormControl<string>= new FormControl<string>('');
_onDestroy= new Subject<void>();


  constructor(private api: ApiService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.api.postTypeRequest('user/getall', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
      if (res.status === 1) {
        this.users = res.data;
        this.user_id = this.get_user_id();

      }
    });

    this.api.postTypeRequest('mathima/getall', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
        if (res.status === 1) {

          this.mathima_list=res.data;
          this.mathimata.next(this.mathima_list.slice());
          this.subMathimataList.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(()=>{
              this.filterMathimataMulti();
              });
        } else {
          console.log('Something went wrong with getall');
        }

      }
    );

    this.api.postTypeRequest('video/getallvideofull', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
        if (res.status === 1) {
          this.video_list = res.data;
          for (const aVideo of this.video_list){ //elegxoume gia ola ta video an exoun ginei rate
            aVideo.has_been_rated=this.hasUserRated(aVideo);
            aVideo.sum_rate=this.calculate_sum_rate_of_video(aVideo);
         aVideo.number_of_reviews=this.number_of_reviews(aVideo);

          }
          this.filtered=this.video_list;
        } else {
          console.log('Something went wrong with getall');
        }

      }
    );

    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/embed/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

  }

  filterMathimataMulti(){

    let search =this.subMathimataList.value;
    if(!search){
    this.mathimata.next(this.mathima_list.slice());
    }else {
        search=search.toUpperCase();
    }
    this.mathimata.next(
      this.mathima_list.filter(mathima=> mathima.name.indexOf(search)> -1)
    );
  }
  get_user_id() {
    let temp_user_string = this.auth.getUserDetails(); //gia na paroume ta stoixeia tou xrhsth
// @ts-ignore
    let user_string = temp_user_string.substring(1, temp_user_string.length - 1); //aferoume tis aggiles, dhladh ton prwto kai ton teleutaio xarakthra
    let jsnon_user_string = JSON.parse(user_string); //to metatrepoume se JSON wste na exoume ta stoixeia se morfh pinaka
    const username = jsnon_user_string['username'];
    for (const user of this.users) {
      if (username === user.username) {
        console.log(user.id);
        return user.id;
      }
    }
  }

  hasUserRated(video: Video): boolean{
  for (const aRate of video.rates) {
    if (aRate.user_id===this.user_id){
      return true;
    }
  }
  return false;
}

  calculate_sum_rate_of_video(video: Video){
    let sum_rate=0;
    let athroisma =0;
    for( const aRate of video.rates){
      athroisma=athroisma+1;
      sum_rate=sum_rate+aRate.rank;
    }
    if(athroisma!=0){
      return sum_rate/athroisma;
    }
    return 0;
  }

  number_of_reviews(video: Video): number{
    let athroisma=0;
    for(const aRate of video.rates){
      athroisma+= 1;
    }
    return athroisma;
  }

  changeRate(event: any, video: Video) {
    this.user_id = this.get_user_id();
    const payload_string = '{"user_id":"' + this.user_id + '",  "video_id":"' + (video.id).toString() + '",  "rank":"' + event.toString() + '"}';  //pedio json pou stelnoume pisw sto backend
    const payload_json = JSON.parse(payload_string);
    this.api.postTypeRequest('video/ratevideo', payload_json).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
        if (res.status === 1) {

          this.api.postTypeRequest('video/getallvideofull', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
              if (res.status === 1) {
                this.video_list = res.data;
                for (const aVideo of this.video_list) {
                  aVideo.has_been_rated = this.hasUserRated(aVideo);
                  aVideo.sum_rate = this.calculate_sum_rate_of_video(aVideo);
                  aVideo.number_of_reviews = this.number_of_reviews(aVideo);
                }
              } else {
                console.log('Something went wrong with getall');
              }

            }
          );

        } else {
          console.log('Something went wrong with video rating.');
        }

      }
    );
  }

  onChange() {
    let searchedFiltered = this.video_list;
    if (this.searchUsername != null) {
      searchedFiltered = searchedFiltered.filter(
        (video) =>
          video.user.username.toLowerCase().includes(this.searchUsername.toLowerCase())
      );
      this.filtered = searchedFiltered;
    } else if (this.searchVideoName != null) {
      searchedFiltered = searchedFiltered.filter(
        (video) =>
          video.originalname.toLowerCase().includes(this.searchVideoName.toLowerCase())
      );
      this.filtered = searchedFiltered
    }
    if (this.selectedMathimata.length > 0) {
      let mathimata_list_temp: any[] = [];
      for(const mathima_name of this.selectedMathimata){

        mathimata_list_temp = mathimata_list_temp.concat(searchedFiltered.filter(
          (video) =>
            video.mathima.name.includes(mathima_name)
        ));

      }
      searchedFiltered = mathimata_list_temp;
    }
   this.filtered=searchedFiltered;
  }




}
