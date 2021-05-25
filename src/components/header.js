import { AppBar, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    alignItems: "center",
    textAlign: "center",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const NavBar = styled(AppBar)({
  backgroundImage:
    "linear-gradient(to right bottom, #175873, #00798e, #019ca1, #3ebeab, #77dfad)",
  position: "static",
});

const Header = () => {
  const classes = useStyles();

  return (
    <NavBar>
      <Typography variant="h1" className={classes.title}>
        Automatic Object Remover
      </Typography>
    </NavBar>
  );
};

export default Header;
