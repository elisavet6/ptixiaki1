import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ApiService} from "../services/api.service";
import {AuthService} from "../services/auth.service";
import {AnakoinwseisComponent} from "../anakoinwseis/anakoinwseis.component";
import {Video} from "../videostreaming/domain/video";
import {Mathima} from "../mathima/domain/mathima";
import {Router} from "@angular/router";
import {User} from "../myprofile/domain/user";

@Component({
  selector: 'app-mysubjects',
  templateUrl: './mysubjects.component.html',
  styleUrls: ['./mysubjects.component.css']
})
export class MysubjectsComponent implements OnInit{

  @ViewChild('placeholder',{read: ViewContainerRef}) //gia na emfanisoume component mesa se alo

  private placeholder: ViewContainerRef;

  anakoinwseisComponent: AnakoinwseisComponent;
 mathima: Mathima;
  enrolledmathimata: any;
  private users: any;
  private user_id: string;
  video_list: Video[];
  video: Video;

  user: User;

constructor(private api: ApiService,
            private auth: AuthService,
            private factoryResolver: ComponentFactoryResolver,
            private router: Router) {
}

  ngOnInit() {
    this.api.postTypeRequest('user/getall', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
        if (res.status === 1) {
          this.users = res.data;
          this.user_id = this.get_user_id(); //pairnei to user id tou xrhsth

          //parakatw theloume na pairnoume  ta enrolled mathimata kathe fora pou anoigei h selida
          const payload_string = '{"user_id":"' + this.user_id + '"}';  //pedio json pou stelnoume pisw sto backend
          const payload_json = JSON.parse(payload_string);
          this.api.postTypeRequest('enrollements/getmathimataofuser', payload_json).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
              if (res.status === 1) {
                this.enrolledmathimata = res.data;

                this.api.postTypeRequest('video/getallvideofull', {}).subscribe((res: any) => { //to subscribe to xrhsimopoioume epeidh perimenoume response apo backend
                    if (res.status === 1) {
                      this.video_list = res.data;

                      for(const aVideo of this.video_list) {
                        for (const aMathima of this.enrolledmathimata) {
                          if (aVideo.to_mathima === aMathima.id) {
                            if (aMathima.videos) {
                              aMathima.videos.push(aVideo);
                            } else {
                              aMathima.videos = [];
                              aMathima.videos.push(aVideo);
                            }
                          }
                        }
                      }


                      for (const aMathima of this.enrolledmathimata){
                        aMathima.video_sum= this.videosum(aMathima);
                      }


                    } else {
                      console.log('Something went wrong with video get all');
                    }

                  }
                );




              } else {
                console.log('Something went wrong with getall');
              }

            }
          );


        } else {
          console.log('Something went wrong with getall');
        }

      }
    );



  }

  get_user_id(){
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

}

 videosum(mathima: Mathima): number {
    let sum = 0;
    for (const video of mathima.videos) {
        sum += 1;

    }
   return sum;
  }

  goToMathima(element: Mathima){

    this.auth.setDataInLocalStorage('tempMathima', JSON.stringify(element))
    this.router.navigate(['mathima/:element.url']);
  }

}
