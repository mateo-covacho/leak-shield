// Hooks
import { getSession, signOut } from "next-auth/react";
import React, { useState } from "react";

// Styles
import styles from "../styles/post.module.css";

// Components
import Image from "next/image";

const Post = (props) => {
  return (
    <div className={`${styles.container} card mx-auto mb-4`}>
      {/* <Image src={props.img} className='card-img-top' alt='card-img-top' /> */}
      <img src={props.img} className='card-img-top' alt='card-img-top' />
      <div className='card-body'>
        <p className='card-text'>{props.caption} </p>

        <p className='card-text'>
          <small className='text-muted'>{props.usr.address}</small>
        </p>
      </div>
    </div>
  );
};

export default Post;
