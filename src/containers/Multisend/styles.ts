/* eslint-disable import/prefer-default-export */
export const styles = {
  connectButton: {
    height: '50px',
    width: '220px',
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
    width: '100%', 
    height: '100%',
    alignItems: 'center'
  },
  plusIcon: {
    marginRight: '20px'
  },
  multiSendCard: {
    marginLeft: "2%",
    textAlign: "center",
    height: '605px',
    width: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  tableHolder: {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    margin: '25px 60px 10px 60px', 
    height: '100%'
  },
  leftSteps: {
    width: '25%',
    textAlign: "center",
    height: '605px',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
} as const
