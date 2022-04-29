/* eslint-disable import/prefer-default-export */
export const styles = {
  connectButton: {
    height: '50px',
    width: '220px',
    marginTop: '50px',
    marginBottom: '40px'
  },
  plusIcon: {
    marginRight: '20px'
  },
  Card: {
    textAlign: "center",
    margin: '0 20%',
    height: '600px',
    width: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transition: "width 1s, height 1s, margin 1s",
  },
  hiddenCard: {
    marginLeft: '-100px',
    marginRight: '40px',
    width: '0%',
    textAlign: "center",
    height: '600px',
    flexDirection: "column",
    justifyContent: "center",
    transition: "width 1s, height 1s, margin 1s",
  }
} as const
