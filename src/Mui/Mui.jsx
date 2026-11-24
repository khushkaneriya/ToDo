import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Loader({ open }) {
  return (
    <Backdrop
      open={open}
      sx={{
        color: "#cce2d6",
        zIndex: 9999,
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loader;
