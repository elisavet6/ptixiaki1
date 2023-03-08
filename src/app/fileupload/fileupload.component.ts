import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ReplaySubject, Subject, takeUntil} from "rxjs";
import {ApiService} from "../services/api.service";
import {Mathima} from "../mathima/domain/mathima";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {


  file: File;
  fileName = '';
  fileExtension = '';
  uploadForm: FormGroup;
  isYouTubeURL: boolean;
  youTubeURL: string;
  video_name: string;
  mathima_list: Mathima[];
  selectedMathimata: string;
  mathimata: ReplaySubject<Mathima[]> = new ReplaySubject<Mathima[]>(1);
  //@ts-ignore
  mathimaCtrl: FormControl<Mathima[]> = new FormControl<Mathima[]>([]);
//@ts-ignore
  subMathimataList: FormControl<string> = new FormControl<string>('');
  _onDestroy = new Subject<void>();
  sortedTime: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private api: ApiService,
              private dialog: MatDialogRef<FileuploadComponent>,
              private formBuilder: FormBuilder) { //gia na paroume data apo to component videostreaming
  }

  ngOnInit() {
    if(this.data.mathima_id){
      this.selectedMathimata= this.data.mathima_id
    }
    this.uploadForm = this.formBuilder.group({profile:['']});
    const payload_string = '{"user_id":"' + this.data.user_id + '"}';  //pedio json pou stelnoume pisw sto backend
    const payload_json = JSON.parse(payload_string);
    this.api.postTypeRequest('enrollements/getmathimataofuser', payload_json).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
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

  fileSelected(event: any) {
    this.file = event.target.files[0];
    this.fileName = this.file.name;
    this.fileExtension = this.fileName.substring(this.fileName.lastIndexOf('.'), this.fileName.length);
    // @ts-ignore
    this.uploadForm.get('profile').setValue(this.file);
  }

  uploadThisFile() {
    if (this.isYouTubeURL) {
      //στέλνουμε στη βάση ως url τον κωδικό του λινκ μετά το '='
      const youtube_url = this.youTubeURL.substring(this.youTubeURL.lastIndexOf('=') + 1, this.youTubeURL.length);




      const payload_string = '{"user_id":"' + this.data.user_id + '", ' +
        ' "to_mathima":"' + this.selectedMathimata + '",  ' +
        '  "youtube_url":"' + youtube_url + '", ' +
        '  "video_name":"' + this.video_name + '" }';  //pedio json pou stelnoume pisw sto backend


      const payload_json = JSON.parse(payload_string);


      this.api.postTypeRequest('video/uploadyoutubevideo', payload_json).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
          if (res.status === 1) {
            this.dialog.close();

          } else {
            console.log('Something went wrong with getall');
          }

        }
      );



    } else {
      const formData = new FormData();

      formData.append("user_id", this.data.user_id);
      formData.append("to_mathima", this.selectedMathimata);
      formData.append("video_name", this.video_name + this.fileExtension);
      //@ts-ignore
      formData.append("file", this.uploadForm.get('profile').value);
      this.api.postTypeRequest('video/uploadvideo', formData).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
          if (res.status === 1) {
            this.dialog.close();

          } else {
            console.log('Something went wrong with getall');
          }

        }
      );


    }
  }
}

