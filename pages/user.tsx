import { Button } from "@blueprintjs/core";
import { getSession, signOut } from "next-auth/react";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
// gets a prop from getServerSideProps
function User({ user }: { user: any }) {
  return (
    <div>
      <h4>User:</h4>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {/* @ts-ignore */}
      <Button icon='log-in' intent='danger' onClick={() => signOut({ redirect: "/signin" })}>
        Sign out
      </Button>
    </div>
  );
}

export async function getServerSideProps(context: object) {
  const session = await getSession(context);

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
