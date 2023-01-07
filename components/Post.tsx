// Hooks
import { getSession, signOut } from "next-auth/react";
import React, { useState } from "react";

// Styles
import styles from "../styles/Post.module.css";

// Components
import Image from "next/image";

//create a type for the props for the Post component
type PostProps = {
  img: string;
  caption: string;
  usr: {
    address: string;
  };
};

const Post = (props: PostProps) => {
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
