import { IconButton } from 'evergreen-ui'
import { HomeIcon } from 'evergreen-ui'
import { useRouter } from 'next/router'

function HomeButton(){
  const router = useRouter();
  return(
    <>
      <IconButton icon={HomeIcon} height={48} marginTop={18} marginLeft={20} marginBottom={18} onClick={() => router.push('/')}/>
    </>
  )
}

export default HomeButton
