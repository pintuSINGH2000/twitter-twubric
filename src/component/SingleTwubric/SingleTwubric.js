import React, { useState } from "react";
import styles from "./singleTwubric.module.css";
import Circularbar from "../CircularBar/Circularbar";
import { BsThreeDots } from "react-icons/bs";
import moment from 'moment';

const SingleTwubric = ({ userData,handleRemove,selectedUserStyle }) => {
  const [showMenu,setShowMenu] = useState(false);
  const [friendRating] = useState(
    159.5 + 76.774 * (userData.twubric.friends / 2)
  );
  const [influenceRating] = useState(
    159.5 + 76.774 * (userData.twubric.influence / 4)
  );
  const [chirpinessRating] = useState(
    159.5 + 76.774 * (userData.twubric.chirpiness / 4)
  );
  
  const removeUser = () => {
    handleRemove(userData.uid);
  }

  return (
    <div className={styles.container} style={{border:selectedUserStyle?"3px solid black":"none"}}>
       <BsThreeDots
            className={`${styles.menuIcon} cursor-pointer`}
            onClick={() => setShowMenu(!showMenu)}
          />
      {showMenu&&(
        <div className={styles.menuItem} onClick={removeUser}>
         Remove
        </div>
      )}
      <Circularbar
        friendRating={friendRating}
        influenceRating={influenceRating}
        chirpinessRating={chirpinessRating}
        score={userData?.twubric?.total}
      />
      <div className={`${styles.title} poppins-600`}>
        <img className={styles.profilePic} src={userData.image} alt=""/>
        {userData?.fullname}
      </div>

      <div className={styles.twubricContainer}>
          <div className={styles.twubric} >
               {userData?.twubric?.friends}
               <div style={{color:"#ffb700"}} className="poppins-400">Friends</div>
          </div>
          <div className={styles.twubric}>
               {userData?.twubric?.influence}
               <div style={{color:"#1cbaba"}} className="poppins-400">Influence</div>
          </div>
          <div className={styles.twubric}>
               {userData?.twubric?.chirpiness}
               <div style={{color:"#6bda41"}} className="poppins-400">Chirpiness</div>
          </div>
      </div>
      <div className={`${styles.joined} poppins-500`}>Joined on :  {moment.unix(userData?.join_date).format("MMM Do, YYYY")}</div>
    </div>
  );
};

export default SingleTwubric;
