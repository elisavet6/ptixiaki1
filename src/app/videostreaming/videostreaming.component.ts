import {Component, OnInit, ViewChild} from '@angular/core';
import {Video} from "./domain/video";
import {ApiService} from "../services/api.service";
import {AuthService} from "../services/auth.service";
import {Mathima} from "../mathima/domain/mathima";
import {FormControl} from "@angular/forms";
import {ReplaySubject, Subject, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {FileuploadComponent} from "../fileupload/fileupload.component";
import {User} from "../myprofile/domain/user";
import {DialogComponent} from "../dialog/dialog.component";
import {SnackbarService} from "../services/snackbar.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
@Component({
  selector: 'app-videostreaming',
  templateUrl: './videostreaming.component.html',
  styleUrls: ['./videostreaming.component.css']
})
export class VideostreamingComponent implements OnInit {

  video_list: Video[];
  filtered: Video[];
  private users: any;
  user_id: string;
  isYouTubeURL: boolean;
  youTubeURL: string;
  apiLoaded = false;
  searchUsername: string;
  searchVideoName: string;
  selectedMathimata: string[];
  mathima_list: Mathima[];
  mathimata: ReplaySubject<Mathima[]> = new ReplaySubject<Mathima[]>(1);
  //@ts-ignore
  mathimaCtrl: FormControl<Mathima[]> = new FormControl<Mathima[]>([]);
//@ts-ignore
  subMathimataList: FormControl<string> = new FormControl<string>('');
  _onDestroy = new Subject<void>();
  sortedTime: string;
  isTeacher: boolean = false;
  user: User;
  enrolledmathimata: any;
  video: Video;
  isAllowed: boolean = false;
  length = 50;
  pageSize = 10;
  pageSizeOptions = [10, 20, 30];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService,
              private auth: AuthService,
              private dialog: MatDialog,
              private snackbar: SnackbarService) {
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

          this.mathima_list = res.data;
          this.mathimata.next(this.mathima_list.slice());
          this.subMathimataList.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
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
          for (const aVideo of this.video_list) { //elegxoume gia ola ta video an exoun ginei rate
            aVideo.has_been_rated = this.hasUserRated(aVideo);
            aVideo.sum_rate = this.calculate_sum_rate_of_video(aVideo);
            aVideo.number_of_reviews = this.number_of_reviews(aVideo);

            if (this.user_id === aVideo.created_by) {
              aVideo.isAllowed = true;

            } else {
              aVideo.isAllowed = false;
            }

          }

          this.video_list.sort((a, b) => {
            return a.creation_timestamp < b.creation_timestamp ? 1 : -1;
          });
          this.sortedTime = 'newer first';
          this.filtered = this.video_list;
        } else {
          console.log('Something went wrong with video get all');
        }

      }
    );

    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/embed/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
    //παρακάτω παίρνουμε τα δεδομένα του χρήστη που είναι συνδεδεμένος ώστε να βρούμε το ρόλο
    this.user = new User();
    let temp_user_string = this.auth.getUserDetails(); //gia na paroume ta stoixeia tou xrhsth
// @ts-ignore
    let user_string = temp_user_string.substring(1, temp_user_string.length - 1); //aferoume tis aggiles, dhladh ton prwto kai ton teleutaio xarakthra
    let jsnon_user_string = JSON.parse(user_string); //to metatrepoume se JSON wste na exoume ta stoixeia se morfh pinaka

    this.user.role = jsnon_user_string['role'];

    //παρακάτω παίρνουμε τα μαθήματα που είναι εγγεγραμμένος ο χρήστης
    const payload_string = '{"user_id":"' + this.user_id + '"}';  //pedio json pou stelnoume pisw sto backend
    const payload_json = JSON.parse(payload_string);
    this.api.postTypeRequest('enrollements/getmathimataofuser', payload_json).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
        if (res.status === 1) {
          this.enrolledmathimata = res.data;
        } else {
          console.log('Something went wrong with enrolled subs');
        }

      }
    );
    if (this.user.role === 'teacher') {
      this.isTeacher = true;
    } else {
      this.isTeacher = false;
    }

    //ελέγχουμε αν ο χρήστης είναι καθηγητής & αν είναι εγγεγραμμένος στο μάθημα ώστε να μπορεί να διαγράψει το βίντεο


  }

  filterMathimataMulti() {

    let search = this.subMathimataList.value;
    if (!search) {
      this.mathimata.next(this.mathima_list.slice());
    } else {
      search = search.toUpperCase();
    }
    this.mathimata.next(
      this.mathima_list.filter(mathima => mathima.name.indexOf(search) > -1)
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
        return user.id;

      }
    }
  }

  hasUserRated(video: Video): boolean {
    for (const aRate of video.rates) {
      if (aRate.user_id === this.user_id) {
        return true;
      }
    }
    return false;
  }

  calculate_sum_rate_of_video(video: Video) {
    let sum_rate = 0;
    let athroisma = 0;
    for (const aRate of video.rates) {
      athroisma = athroisma + 1;
      sum_rate = sum_rate + aRate.rank;
    }
    if (athroisma != 0) {
      return sum_rate / athroisma;
    }
    return 0;
  }

  number_of_reviews(video: Video): number {
    let athroisma = 0;
    for (const aRate of video.rates) {
      athroisma += 1;
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
  youtubeOnly(){
    this.video_list.sort((a,b)=> {
      return a.creation_timestamp<b.creation_timestamp? 1: -1
    });
    let searchedFiltered= this.video_list;

      searchedFiltered = searchedFiltered.filter(
        (video) =>
          video.youtube_url!=null);
      this.filtered = searchedFiltered;


}
  uploaded(){
    this.video_list.sort((a,b)=> {
      return a.creation_timestamp<b.creation_timestamp? 1: -1
    });
  let searchedFiltered= this.video_list;

  searchedFiltered = searchedFiltered.filter(
    (video) =>
      video.decodedname!=null);
  this.filtered = searchedFiltered;
}

topRated(){
    this.sortedTime= '-';
  this.video_list.sort((a,b)=> {
    return a.sum_rate<b.sum_rate? 1: -1;

  });
  this.filtered=this.video_list;
}

  toggleDate(){
    if (this.sortedTime === 'Παλαιότερα Βίντεο' || this.sortedTime=== '-'){
      this.video_list.sort((a,b)=> {
        return a.creation_timestamp<b.creation_timestamp? 1: -1;
      });
      this.sortedTime= 'Πιο Πρόσφατα';
      this.filtered=this.video_list;
    } else if (this.sortedTime === 'Πιο Πρόσφατα') {
      this.video_list.sort((a, b) => {
        return a.creation_timestamp > b.creation_timestamp ? 1 : -1;
      });
      this.sortedTime = 'Παλαιότερα';
      this.filtered = this.video_list;
    }

  }

  uploadVideo() {
    const dialogRef = this.dialog.open(FileuploadComponent,{
      height: '400px',
      width: '800px',
      data: {user_id: this.user_id}
    });

    dialogRef.afterClosed().subscribe(next => {
      this.api.postTypeRequest('video/getallvideofull', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
          if (res.status === 1) {
            console.log('eee');
            this.video_list = res.data;
            for (const aVideo of this.video_list) {
              aVideo.has_been_rated = this.hasUserRated(aVideo);
              aVideo.sum_rate = this.calculate_sum_rate_of_video(aVideo);
              aVideo.number_of_reviews = this.number_of_reviews(aVideo);
              if (this.user_id === aVideo.created_by) {
                aVideo.isAllowed = true;

              } else {
                aVideo.isAllowed = false;
              }
            }

            this.video_list.sort((a, b) => {
              return  a.creation_timestamp < b.creation_timestamp? 1: -1;
            });
            this.sortedTime = 'newerfirst';
            this.filtered = this.video_list;
            this.selectedMathimata = [''];
            this.onChange();
          } else {
            console.log('Something went wrong with getall');
          }

        }
      );

    });


  }



  deleteVideo(){
    const dialogResult = this.dialog.open(DialogComponent,
      {data: {message: 'Are you sure you want to delete this video?', button: 'Confirm'}}
    );
    dialogResult.afterClosed().subscribe((confirm) => {

      if (!confirm) {
        return;
      } else
      if (this.video.youtube_url) {
        //στέλνουμε στη βάση ως url τον κωδικό του λινκ μετά το '='
        const youtube_url = this.youTubeURL.substring(this.youTubeURL.lastIndexOf('=') + 1, this.youTubeURL.length);

        const payload_string = '{"user_id":"' + this.user_id + '", ' +
          ' "to_mathima":"' + this.selectedMathimata + '",  ' +
          '  "youtube_url":"' + this.video.youtube_url + '", ' +
          '  "video_name":"' + this.video.originalname + '" }';  //pedio json pou stelnoume pisw sto backend


        const payload_json = JSON.parse(payload_string);

        this.api.postTypeRequest('video/delete', payload_json).subscribe((res: any) => {
          if (res.status === 1) {
            if (this.filtered) {
              this.snackbar.success('Video successfully deleted')
              this.api.postTypeRequest('video/getallvideofull', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
                  if (res.status === 1) {
                    this.video_list = res.data;
                    for (const aVideo of this.video_list) {
                      aVideo.has_been_rated = this.hasUserRated(aVideo);
                      aVideo.sum_rate = this.calculate_sum_rate_of_video(aVideo);
                      aVideo.number_of_reviews = this.number_of_reviews(aVideo);
                      if (this.user_id === aVideo.created_by) {
                        aVideo.isAllowed = true;

                      } else {
                        aVideo.isAllowed = false;
                      }
                    }

                    this.video_list.sort((a, b) => {
                      return a.creation_timestamp < b.creation_timestamp ? 1 : -1;
                    });
                    this.sortedTime = 'newerfirst';
                    this.filtered = this.video_list;
                    this.selectedMathimata = [''];
                    this.onChange();
                  } else {
                    console.log('Something went wrong with delete video');
                  }

                }
              );
            }

          } else {
            this.snackbar.failure('Video cannot be deleted');
          }
        })
      }



      }
    )
  }

  }
