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
  contentDissapear: {
    opacity: '1', 
    transition: 'opacity 0.5s', 
    WebkitTransition: 'opacity 0.5s'
  },
  Card: {
    textAlign: "center",
    margin: '0 20%',
    width: '100%',
    height: '600px',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transition: "width 1s, height 1s, margin 1s",
  },
  leftSteps: {
    marginLeft: '-100px',
    marginRight: '40px',
    width: '0px',
    textAlign: "center",
    height: '600px',
    flexDirection: "column",
    justifyContent: "center",
    transition: "width 1s, height 1s, margin 1s",
  },
  holder: {
    display: 'flex', 
    height: '600px'
  }
} as const
