import React from "react";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarHalfIcon from "@material-ui/icons/StarHalf";

const Rating = ({rating}) => {
  let star;
  switch (rating) {
    case 0.0:
    star = 
      (<div>
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
      </div>);
    break;
    case 0.5:
    star = 
      (<div>
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
        <StarHalfIcon />
      </div>);
    break;
    case 1.0:
    star = 
      (<div>
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
        <StarIcon />
      </div>);
    break;
    case 1.5:
    star = 
      (<div>
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
        <StarIcon />
        <StarHalfIcon />
      </div>);
    break;
    case 2.0:
    star = 
      (<div>
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
        <StarIcon />
        <StarIcon />
      </div>);
    break;
    case 2.5:
    star = 
      (<div>
        <StarBorderIcon />
        <StarBorderIcon />
        <StarIcon />
        <StarIcon />
        <StarHalfIcon />
      </div>);
    break;
    case 3.0:
    star = 
      (<div>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarBorderIcon />
        <StarBorderIcon />
      </div>);
    break;
    case 3.5:
    star = 
      (<div>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarHalfIcon />
        <StarBorderIcon />
      </div>);
    break;
    case 4.0:
    star = 
      (<div>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarBorderIcon />
      </div>);
    break;
    case 4.5:
    star = 
      (<div>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarHalfIcon />
      </div>);
    break;
    case 5.0:
    star = 
      (<div>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </div>);
    break;
    default:
      star = 
      (<div>
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
      </div>);
  } 
  return (
    <>
     {star}
    </>
  )
  
}
export default Rating