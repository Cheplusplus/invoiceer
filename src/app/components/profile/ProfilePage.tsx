import React from "react"
import { getAppUser } from "../../actions/actions"
import { Paper, Box } from "@mui/material"
import { styles } from "./profile.styles"

const ProfilePage = async () => {
  const user = await getAppUser()
  if (!user) return <></>
  return (
    <Paper sx={styles.paper} elevation={16}>
      <Box component="img" sx={styles.profile_photo} alt="Users profile picture" src={user.picture || ""} />
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.address1}</p>
      <p>{user.address2}</p>
    </Paper>
  )
}

export default ProfilePage
