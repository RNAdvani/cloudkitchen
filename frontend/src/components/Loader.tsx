import { Skeleton, Stack } from "@mui/material"




const Loader = () => {
  return (
    <Stack >
        <Skeleton variant="rectangular" animation={"wave"} height={"100vh"} width={"100vw"} />
    </Stack>
  )
}

export default Loader