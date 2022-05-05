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
    maxWidth: '1200px',
    height: '600px',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  holder: {
    display: 'flex', 
    height: '600px',
    width: '100%',
    justifyContent: 'center'
  },
  addToListButton: {
    height: '40px',
    width: '150px',
  },
  nextStep: {
    height: '50px',
    width: '170px',
    float: 'right'
  },
  backButtonDefault: {
    height: '50px',
    width: '170px',
    float: 'left',
    background: 'rgba(82, 166, 248, 0.1)',
    color: '#52A6F8'
  },
  stepsHolder: {
    alignConten: 'center', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  tableHolder: {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    margin: '25px 60px 10px 60px', 
    height: '100%'
  },
  leftSteps: {
    display: 'flex',
    textAlign: "center",
    height: '600px',
    justifyContent: "center",
    marginRight: '40px',
    padding: '0 40px 0 40px',
    width: '240px'
  },
  informativeBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  contentHolder: {
    margin: "40px"
  }
} as const
