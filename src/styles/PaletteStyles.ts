import sizes from "./sizes";

const styles: { [key: string]: any } = {
  Palette: {
    height: "100vh",
    /* remove overflow if it makes any problem.
     * I added this to hide overflow when clicking on ColorBox
     */
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  colors: {
    height: "90%",
  },
  goBack: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-7.2px",
    opacity: 1,
    backgroundColor: "black",
    "& a": {
      color: "white",
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      border: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      textDecoration: "none",
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "33.3333%",
      marginBottom: "-4.9px",
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "20%",
      marginBottom: "-4.3px",
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "10%",
      marginBottom: "-4px",
    },
  },
};

export default styles;
