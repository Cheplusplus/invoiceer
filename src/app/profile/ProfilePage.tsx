import React from "react"
import { getAppUser } from "../actions/actions"

const ProfilePage = async () => {
  const user = await getAppUser()
  if (!user) return <></>
  return (
    <div>
      <img src={user.picture || ""} />
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.address1}</p>
      <p>{user.address2}</p>
    </div>
  )
}

export default ProfilePage
