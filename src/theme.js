import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

let theme = createMuiTheme();

const primary = "#175873";
// const secondary = "#77DFAD";
const secondary = "#53B9AA";
const textPrimary = theme.palette.grey[900];
const textSecondary = theme.palette.grey[700];

theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: primary,
      contrastText: theme.palette.common.white,
    },
    secondary: {
      main: secondary,
      contrastText: theme.palette.common.white,
    },
    // error: {},
    // warning: {},
    // info: {},
    // success: {},
    text: {
      primary: textPrimary,
      secondary: textSecondary,
    },
    background: {
      paper: `#FFFFFF`,
      default: `#FAFAFA`,
    },
  },
  typography: {
    // fontFamily: "Nunito, sans-serif",
    h1: {
      color: theme.palette.grey[100],
      fontSize: `3rem`,
      fontWeight: `400`,
    },
    h2: {
      color: primary,
      fontSize: `2.25rem`,
      fontWeight: `400`,
    },
    h3: {
      color: theme.palette.grey[800],
      fontSize: `2rem`,
      fontWeight: `500`,
    },
    subtitle1: {
      color: theme.palette.grey[700],
      fontSize: `1.25rem`,
      fontWeight: `500`,
    },
    // subtitle2: {
    //   color: theme.palette.grey[700],
    //   fontSize: `0.875rem`,
    //   fontWeight: `400`,
    // },
    // body1: {
    //   color: theme.palette.grey[900],
    //   fontSize: `1rem`,
    //   fontWeight: `400`,
    //   lineHeight: 1.5,
    // },
    // button: {
    //   fontSize: "1rem",
    // },
    // body2: {
    //   color: textSecondary,
    //   fontSize: `1rem`,
    //   fontStyle: 'italic',
    //   fontWeight: `300`,
    //   lineHeight: 1.5,
    // },
    // h4: {},
    // h5: {},
    // h6: {},
    // subtitle2: {},
    // button: {},
    caption: {
      fontSize: "0.9rem",
      fontStyle: "italic",
      color: theme.palette.grey[500],
      fontWeight: `400`,
    },
    // overline: {}
  },
});

export default theme;
