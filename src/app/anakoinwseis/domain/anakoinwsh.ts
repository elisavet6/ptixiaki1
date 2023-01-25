import {Mathima} from "../../mathima/domain/mathima";
import {User} from "../../myprofile/domain/user";

export class Anakoinwsh{
  id: number;
  content: string;
  to_mathima: string;
  created_by: string;
  creation_timestamp: string;
  mathima: Mathima;// gia na paroume to onoma tou mathimatos kai na to ektupwsoume
  user: User;
}
