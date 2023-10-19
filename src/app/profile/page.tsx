import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0"
import ProfilePage from "../components/profile/ProfilePage"

const Home = async () => {
  return <ProfilePage />
}

export default withPageAuthRequired(Home, { returnTo: "/profile" })
