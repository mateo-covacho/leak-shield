// Hooks
import { getSession, signOut } from "next-auth/react";
import { useState } from "react";
import { createPost } from "../lib/redis";

// Components
import Head from "next/head";
import { Button, Navbar, InputGroup, IconSize, Spinner, Icon } from "@blueprintjs/core";
import { Tooltip2, Classes } from "@blueprintjs/popover2";
import Link from "next/link";

// Styles
import styles from "../styles/Home.module.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { SMALL } from "@blueprintjs/core/lib/esm/common/classes";
import { Stint_Ultra_Expanded } from "@next/font/google";
import Post from "../components/Post";

function User({ user }: { user: any }) {
  let posts = [
    {
      media: "https://i.ibb.co/Qm15CK1/mathiuscov9167-A-happy-beaver-in-an-office-with-glasses-and-a-s-c6b95bc7-904f-404f-96b9-3979e008bfec.png",
      author: "business beaver",
      created: 1673011871,
      caption: "Just another day at the office, working hard and building my career as a #damlawyer 🐀💼 #lawfirmlife #beaverbeliever",
    },
    {
      media: "https://i.ibb.co/L9wMj6M/mathiuscov9167-A-beaver-with-and-engineering-hardhat-and-a-suit-45ddd63f-951f-4913-9c04-6a2bc13a5699.png",
      author: "Engineer beaver",
      created: 1673012045,
      caption: "Building a strong foundation for the community one dam project at a time 🐀🏗️ #civilengineering #beaverbuilder #damgoodengineer",
    },
    {
      media: "https://i.ibb.co/bbWBK0b/Midjourneyimg.png",
      author: "Stylish macaque",
      created: 1673012143,
      caption:
        "As I sit here swinging from my tree, I can't help but think about the monkey business of life. One thing is certain, it's a jungle out there! #macaque #monkeythoughts #lifeinthejungle",
    },
  ];

  console.log({ user });
  const [search, changeSearch] = useState("");
  return (
    <>
      <Navbar style={{ display: "flex", alignContent: "center", justifyContent: "center", width: "100vw" }} className={`${styles.navbar} mt-5 `}>
        <Navbar.Heading color='m-auto'>
          <img src='/logo.png' className='m-auto' height={"50px"} />
        </Navbar.Heading>
      </Navbar>
      <div className={` container ${styles.main} mx-auto `} style={{ width: "100vw", height: "100vh" }}>
        <Head>
          <title>LeakShield</title>
          <meta
            name='description'
            content="LeakShield is a powerful tool for content creators and managers to detect and respond to leaks and unauthorized distribution of their content. With LeakShield, you can protect your content and revenue by uniquely marking each user's version of the content with an identifiable mark."
          />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <br />
        <div className='row  align-items-start'>
          <div className='col-2' style={{ height: "100%" }}>
            <div className='row'>
              <Link href={"/home"} className=' '>
                <Button className={` bp4-minimal pb-3 ${styles.whitetext} `} icon='home' large={true}>
                  {/* <Icon className='me-2'  size={25} /> */}
                  Home
                </Button>
              </Link>
            </div>
            <div className='row'>
              <Link href={"/user"} className=' '>
                <Button className={` bp4-minimal pb-3 ${styles.whitetext} `} icon='user' large={true}>
                  {/* <Icon className='me-2'  size={25} /> */}
                  Profile
                </Button>
              </Link>
            </div>
            <div className='row'>
              <Link href={"/user"} className=' '>
                <Button className={` bp4-minimal pb-3 ${styles.whitetext}`} icon='send-message' large={true}>
                  {/* <Icon className='me-2'  size={25} /> */}
                  Messages
                </Button>
              </Link>
            </div>
            <div className='row'>
              <Link href={"/user"} className=' '>
                <Button className={` bp4-minimal pb-3 ${styles.whitetext}`} icon='notifications' large={true}>
                  {/* <Icon className='me-2'  size={25} /> */}
                  Notifications
                </Button>
              </Link>
            </div>
            <div className='row'>
              <Link href={"/user"} className=' '>
                <Button className={` bp4-minimal pb-3 ${styles.whitetext}`} icon='bookmark' large={true}>
                  {/* <Icon className='me-2'  size={25} /> */}
                  Saved
                </Button>
              </Link>
            </div>
            <div className='row'>
              <Button
                className={`${styles.whitetext}`}
                intent='primary'
                icon='add'
                large={true}
                onClick={() => {
                  createPost({
                    media:
                      "https://i.ibb.co/L9wMj6M/mathiuscov9167-A-beaver-with-and-engineering-hardhat-and-a-suit-45ddd63f-951f-4913-9c04-6a2bc13a5699.png",
                    author: "Engineer beaver",
                    created: 1673012045,
                    caption:
                      "Building a strong foundation for the community one dam project at a time 🐀🏗️ #civilengineering #beaverbuilder #damgoodengineer",
                  });
                }}
              >
                {/* <Icon className='me-2'  size={25} /> */}
                New post
              </Button>
            </div>
          </div>
          <div className='col-4' style={{ height: "100%" }}>
            {posts.map((post) => {
              return <Post key={post.created} img={post.media} caption={post.caption} usr={user} />;
            })}
          </div>
          <div className='col-2' style={{ height: "100%" }}>
            <InputGroup
              type='tecxt'
              asyncControl={true}
              disabled={false}
              placeholder='Search'
              small={false}
              onChange={(e) => changeSearch(e.target.value)}
              value={search}

              // rightElement={<Spinner size={IconSize.STANDARD} />}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  // console.log(context);
  // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

export default User;
