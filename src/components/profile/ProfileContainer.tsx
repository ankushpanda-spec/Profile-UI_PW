import { CameraIcon } from "@/assets/images"
import { lazy } from "react"


const UserAvatar = lazy(() => import('./UserAvatar'))
const ProfileDetails = lazy(() => import('./ProfileDetails'))

const ProfileContainer = () => {
  return <div className="grid grid-cols-8 lg:gap-4 p-5 lg:p-10">
    <div className="col-span-8 lg:col-span-2">
      <div className="relative flex items-center justify-center object-contain w-full">
        <UserAvatar className="rounded-full object-contain w-8/12" />
        <img src={CameraIcon} className="bottom-0 absolute right-12 cursor-pointer" />
      </div>

    </div>
    <div className="col-span-8 lg:col-span-6">
      <ProfileDetails />
    </div>
  </div>
}

export default ProfileContainer
