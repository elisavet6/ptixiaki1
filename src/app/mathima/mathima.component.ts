import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ApiService} from "../services/api.service";
import {MatTableDataSource} from "@angular/material/table";
import {Mathima} from "./domain/mathima";
import {ReplaySubject, Subject, takeUntil} from "rxjs";
import {AuthService} from "../services/auth.service";
import {User} from "../myprofile/domain/user";
import {Video} from "../videostreaming/domain/video";
import {FormControl} from "@angular/forms";
import {FileuploadComponent} from "../fileupload/fileupload.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {SnackbarService} from "../services/snackbar.service";
import {Router} from "@angular/router";
import {AnakoinwseisComponent} from "../anakoinwseis/anakoinwseis.component";
import {Anakoinwsh} from "../anakoinwseis/domain/anakoinwsh";
import {MatSort} from "@angular/material/sort";
import {UploadanakonwsiComponent} from "../uploadanakonwsi/uploadanakonwsi.component";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-mathima',
  templateUrl: './mathima.component.html',
  styleUrls: ['./mathima.component.css']
})
export class MathimaComponent implements OnInit{

  @ViewChild(MatSort) sort:MatSort;
  private placeholder: ViewContainerRef;


  mathima_list: Mathima[];
  filtered: Video[];
  mathima: Mathima;
  video_list: Video[];
  private users: any;
  anakoinwseisComponent: AnakoinwseisComponent;
  user_id: string;
  isYouTubeURL: boolean;
  youTubeURL: string;
  apiLoaded = false;
  searchUsername: string;
  searchVideoName: string;
  selectedMathimata: string[];
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
  list: Video[];
  test: Video[];
  displayedColumns: string[] = ['content', 'created_by','creation_timestamp','delete'];
  anakoinwseis = new MatTableDataSource<Anakoinwsh>(); //dhlwsh listas me anakoinwseis
  anakoin_list: Anakoinwsh[];
 tempanak: Anakoinwsh[];
 isEnrolled: boolean = false;
  emtyVideoList: boolean;
  emtyAnakoinoseisList: boolean;
  length : number;
  pageSize = 10;
  pageSizeOptions = [10, 20, 30];
  pagedList: Video[];

  constructor(private auth: AuthService,
              private api: ApiService,
              private dialog: MatDialog,
              private snackbar: SnackbarService,
              private router: Router,
              private factoryResolver: ComponentFactoryResolver,) {
  }

  ngOnInit() {
    this.api.postTypeRequest('user/getall', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
      if (res.status === 1) {
        this.users = res.data;
        this.user_id = this.get_user_id();

        //παρακάτω παίρνουμε τα μαθήματα που είναι εγγεγραμμένος ο χρήστης
        const payload_string = '{"user_id":"' + this.user_id + '"}';  //pedio json pou stelnoume pisw sto backend
        const payload_json = JSON.parse(payload_string);
        this.api.postTypeRequest('enrollements/getmathimataofuser', payload_json).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
            if (res.status === 1) {
              this.enrolledmathimata = res.data;
              console.log(this.enrolledmathimata);

              for (const aMathima of this.enrolledmathimata){
                console.log(this.isEnrolled);
                if (this.mathima.id === aMathima.id){
                  this.isEnrolled = true;
                  break;
                } else {
                  this.isEnrolled = false;
                }

              }
            } else {
              console.log('Something went wrong with enrolled subs');
            }

          }
        );

      }
    });

    this.mathima = new Mathima();
    let mathima_string = this.auth.getVariableDetails('tempMathima'); //gia na paroume ta stoixeia tou xrhsth
// @ts-ignore
    let jsnon_mathima_string = JSON.parse(mathima_string); //to metatrepoume se JSON wste na exoume ta stoixeia se morfh pinaka
    this.mathima.id = jsnon_mathima_string['id'];
    this.mathima.name = jsnon_mathima_string['name'];
    this.mathima.url = jsnon_mathima_string['url'];
    this.mathima.examino = jsnon_mathima_string['examino'];
    this.mathima.upoxrewtiko = jsnon_mathima_string['upoxrewtiko'];

    this.api.postTypeRequest('mathima/getall', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
        if (res.status === 1) {

          this.mathima_list = res.data;

        } else {
          console.log('Something went wrong with getall');
        }

      }
    );

    this.api.postTypeRequest('video/getallvideofull', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
        if (res.status === 1) {
          this.video_list = res.data;
          this.video_list = this.video_list.filter(video => video.to_mathima === this.mathima.id );

          if (this.video_list.length === 0){
            this.emtyVideoList = true;
          }

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
          this.sortedTime = 'Πιο πρόσφατα';
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


    if (this.user.role === 'teacher') {
      this.isTeacher = true;
    } else {
      this.isTeacher = false;
  }





    this.api.postTypeRequest('anakoinwseis/getallanakoinoseisfull', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
        if (res.status === 1) {
          this.anakoin_list = res.data;


          this.tempanak = this.anakoin_list.filter(
            (anakoinwsi) => anakoinwsi.mathima.id === this.mathima.id);
          this.anakoinwseis = new MatTableDataSource<Anakoinwsh>(this.tempanak);

          if (this.tempanak.length === 0){
            this.emtyAnakoinoseisList = true;
          }

          this.sort.sort({id:'creation_timestamp', start:'desc',disableClear: false});
          this.anakoinwseis.sort=this.sort;
        } else {
          console.log('Something went wrong with getall');
        }

      }
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

  select(input: any) :void{
    if (input==='all'){
      this.anakoinwseisComponent=this.createAnakoinwseisComponent()
    }
  }
  createAnakoinwseisComponent(): AnakoinwseisComponent{
    this.placeholder.clear();
    const factory=this.factoryResolver.resolveComponentFactory(AnakoinwseisComponent);
    return this.placeholder.createComponent(factory).instance;
  }

  createanakoinwsh(){
    const dialogRef = this.dialog.open(UploadanakonwsiComponent, {
      height: '400px',
      width: '800px',
      data: {user_id: this.user_id, mathima_id: this.mathima.id}
      });
      dialogRef.afterClosed().subscribe(next => {

        this.api.postTypeRequest('anakoinwseis/getallanakoinoseisfull', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
            if (res.status === 1) {
              this.anakoin_list = res.data;


              this.tempanak = this.anakoin_list.filter(
                (anakoinwsi) => anakoinwsi.mathima.id === this.mathima.id);
              this.anakoinwseis = new MatTableDataSource<Anakoinwsh>(this.tempanak);

              if (this.tempanak.length === 0){
                this.emtyAnakoinoseisList = true;
              }

              // this.anakoinwseis = new MatTableDataSource<Anakoinwsh>(res.data);
              // this.sort.sort({id:'creation_timestamp', start:'desc',disableClear: false});
              // this.anakoinwseis.sort=this.sort;
            } else {
              console.log('Something went wrong with getall');
            }

          }
        );


      });
  }


  deleteAnakoinwsi(element: Anakoinwsh) {
    const dialogResult = this.dialog.open(DialogComponent,
      {data: {message: 'Are you sure you want to delete this subject?', button: 'Confirm'}}
    );
    dialogResult.afterClosed().subscribe((confirm) => {

        if (!confirm) {
          return;
        } else {
          this.api.postTypeRequest('anakoinwseis/delete', element).subscribe((res: any) => {
              if (res.status === 1) {

                this.api.postTypeRequest('anakoinwseis/getallanakoinoseisfull', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
                    if (res.status === 1) {
                      this.anakoin_list = res.data;


                      this.tempanak = this.anakoin_list.filter(
                        (anakoinwsi) => anakoinwsi.mathima.id === this.mathima.id);
                      this.anakoinwseis = new MatTableDataSource<Anakoinwsh>(this.tempanak);

                      if (this.tempanak.length === 0){
                        this.emtyAnakoinoseisList = true;
                      }

                      // this.anakoinwseis = new MatTableDataSource<Anakoinwsh>(res.data);
                      this.sort.sort({id:'creation_timestamp', start:'desc',disableClear: false});
                      this.anakoinwseis.sort=this.sort;
                    } else {
                      console.log('Something went wrong with getall');
                    }

                  }
                );
              }
            }
          )

        }
      }
    )
  }

  onChange() {
    let searchedFiltered = this.video_list;
    if (this.searchUsername != null) {
      searchedFiltered = searchedFiltered.filter(
        (video) =>
          video.user.username.toLowerCase().includes(this.searchUsername.toLowerCase())
      );
      this.filtered = searchedFiltered;
    }
    if (this.searchVideoName != null) {
      searchedFiltered = searchedFiltered.filter(
        (video) =>
          video.originalname.toLowerCase().includes(this.searchVideoName.toLowerCase())
      );
      this.filtered = searchedFiltered
    }if (this.selectedMathimata){
    if (this.selectedMathimata.length > 0) {
      let mathimata_list_temp: any[] = [];
      for (const mathima_name of this.selectedMathimata) {

        mathimata_list_temp = mathimata_list_temp.concat(searchedFiltered.filter(
          (video) =>
            video.mathima.name.includes(mathima_name)
        ));

      }
      searchedFiltered = mathimata_list_temp;
    }
    }
    this.filtered=searchedFiltered;

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
  topRated() {
    this.sortedTime = '-';
    this.video_list.sort((a, b) => {
      return a.sum_rate < b.sum_rate ? 1 : -1;

    });
    this.filtered = this.video_list;
  }

  toggleDate() {
    if (this.sortedTime === 'Παλαιότερα' || this.sortedTime === '-') {
      this.video_list.sort((a, b) => {
        return a.creation_timestamp < b.creation_timestamp ? 1 : -1;
      });
      this.sortedTime = 'Πιο πρόσφατα';
      this.filtered = this.video_list;
    } else if (this.sortedTime === 'Πιο πρόσφατα') {
      this.video_list.sort((a, b) => {
        return a.creation_timestamp > b.creation_timestamp ? 1 : -1;
      });
      this.sortedTime = 'Παλαιότερα';
      this.filtered = this.video_list;
    }

  }
  youtubeOnly() {
    this.video_list.sort((a, b) => {
      return a.creation_timestamp < b.creation_timestamp ? 1 : -1
    });
    let searchedFiltered = this.video_list;

    searchedFiltered = searchedFiltered.filter(
      (video) =>
        video.youtube_url != null);
    this.filtered = searchedFiltered;


  }

  uploaded() {
    this.video_list.sort((a, b) => {
      return a.creation_timestamp < b.creation_timestamp ? 1 : -1
    });
    let searchedFiltered = this.video_list;

    searchedFiltered = searchedFiltered.filter(
      (video) =>
        video.decodedname != null);
    this.filtered = searchedFiltered;
  }
  uploadVideo() {
    const dialogRef = this.dialog.open(FileuploadComponent, {
      height: '400px',
      width: '800px',
      data: {user_id: this.user_id, mathima_id: this.mathima.id}
    });

    dialogRef.afterClosed().subscribe(next => {
      this.api.postTypeRequest('video/getallvideofull', {}).subscribe((res: any) => {
        if (res.status === 1) {
          this.video_list = res.data;

          this.video_list = this.video_list.filter(video => video.to_mathima === this.mathima.id );

          if (this.video_list.length === 0){
            this.emtyVideoList = true;
          }
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
          this.sortedTime = 'Πιο πρόσφατα';
          this.filtered = this.video_list;
          this.selectedMathimata = [''];
          this.onChange();
        } else {
          console.log('Something went wrong with delete video');
        }
      });


    });

  }

  goToKathigitis(element: User) {
    this.auth.setDataInLocalStorage('tempTeacher', JSON.stringify(element))
    this.router.navigate(['kathigitis']);
  }

  deleteVideo(video: Video) {
    const payload_string = '{"video_id":"' + (video.id).toString() + '"}';  //pedio json pou stelnoume pisw sto backend
    const payload_json = JSON.parse(payload_string);
    const dialogResult = this.dialog.open(DialogComponent,
      { data: { message: 'Are you sure you want to delete this video?', button: 'Confirm' } }
    );
    dialogResult.afterClosed().subscribe((confirm) => {
      if (!confirm) {
        return;
      } else {
        // Delete the video ratings first
        this.api.postTypeRequest('video/deletevideorating', payload_json).subscribe((res: any) => {
          if (res.status === 1) {
            // If video ratings were deleted successfully, delete the video itself
            this.api.postTypeRequest('video/deletevideo', payload_json).subscribe((res: any) => {
              if (res.status === 1) {
                if (this.filtered) {
                  this.snackbar.success('Video successfully deleted');
                  // Reload the video list after deleting the video
                  this.api.postTypeRequest('video/getallvideofull', {}).subscribe((res: any) => {
                    if (res.status === 1) {
                      this.video_list = res.data;

                      this.video_list = this.video_list.filter(video => video.to_mathima === this.mathima.id );

                      if (this.video_list.length === 0){
                        this.emtyVideoList = true;
                      }
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
                      this.sortedTime = 'Πιο πρόσφατα';
                      this.filtered = this.video_list;
                      this.selectedMathimata = [''];
                      this.onChange();
                    } else {
                      console.log('Something went wrong with delete video');
                    }
                  });
                }
              } else {
                this.snackbar.failure('Video cannot be deleted');
              }
            });
          } else {
            this.snackbar.failure('Video cannot be deleted');
          }
        });
      }
    });
  }

  OnPageChange(event: PageEvent){
    //βρισκουμε την αρχη  και το τελος της καθε σελιδας
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    this.pagedList = this.filtered.slice(startIndex,endIndex);
    if (endIndex > this.length){
      endIndex= this.length;
    }
  }



}
