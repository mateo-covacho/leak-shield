// Hooks
import { getSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

// Components
import Head from "next/head";
import { Button, Navbar, InputGroup, IconSize, Spinner, Icon } from "@blueprintjs/core";
import { Tooltip2, Classes } from "@blueprintjs/popover2";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";

// Styles
import styles from "../styles/Home.module.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { SMALL } from "@blueprintjs/core/lib/esm/common/classes";
import { Stint_Ultra_Expanded } from "@next/font/google";
import Post from "../components/Post";

function CreatePostModal(props: any) {
  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>New post</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
interface postData {
  media: string;
  author: string;
  caption: string;
  created: number;
}

export default function Home({ user }: { user: any }) {
  let posts: postData[] = [];
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState("");
  const [hits, setHits] = useState([]);

  async function searchPostsFromQuery(q: any) {
    setSearch(q);
    if (q.length > 2) {
      const params = new URLSearchParams({ q });

      const res = await fetch(`/api/searchPosts?${params}`);

      const results = await res.json();

      setHits(results);
      console.log(hits);
    }
  }

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
                onClick={async () => {
                  // const res = await fetch("/api/db", {
                  //   body: JSON.stringify({
                  //     media: "https://i.ibb.co/bbWBK0b/Midjourneyimg.png",
                  //     author: "Stylish macaque",
                  //     created: 1673012143,
                  //     caption:
                  //       "As I sit here swinging from my tree, I can't help but think about the monkey business of life. One thing is certain, it's a jungle out there! #macaque #monkeythoughts #lifeinthejungle",
                  //   }),
                  //   headers: {
                  //     "Content-Type": "application/json",
                  //   },
                  //   method: "POST",
                  // });
                  // console.log({ res });
                  setModalShow(true);
                }}
              >
                {/* <Icon className='me-2'  size={25} /> */}
                New post
              </Button>
            </div>

            <CreatePostModal show={modalShow} onHide={() => setModalShow(false)} />
          </div>
          <div className='col-4' style={{ height: "100%" }}>
            {posts.map((post) => {
              return <Post key={post.created} img={post.media} caption={post.caption} usr={user} />;
            })}
          </div>
          <div className='col-2' style={{ height: "100%" }}>
            <InputGroup
              type='text'
              asyncControl={true}
              disabled={false}
              placeholder='Search'
              small={false}
              onChange={(e) => searchPostsFromQuery(e.target.value)}
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
