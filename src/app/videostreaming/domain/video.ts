//Κάνουμε import τις κλάσεις user και mathima διότι η κλάση βιντεο περιέχει πεδία από τις προηγούμενες κλάσεις
import {User} from "../../myprofile/domain/user";
import {Mathima} from "../../mathima/domain/mathima";
import {VideoRating} from "./videorating";
//Δηλώνουμε τι περιέχει η κλάση Video
export class Video {
  id: number;
  originalname: string;
  decodedname: string;
  to_mathima: number;
  created_by: string;
  youtube_url: string;
  creation_timestamp: string;
  user: User;
  mathima: Mathima;
  sum_rate: number;
  has_been_rated: boolean;
  number_of_reviews: number;
  rates: VideoRating[];
  isAllowed: boolean;
}
