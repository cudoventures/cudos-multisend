/* eslint-disable import/prefer-default-export */
export const styles = {
    walletInput: {
        width: '550px', 
        height: '50px', 
        backgroundColor: '#28314E', 
        fontSize: '90%', 
        paddingLeft: '20px',
        borderRadius: '5px'
    },
    amountInput: {
        width: '180px', 
        height: '50px', 
        backgroundColor: '#28314E', 
        fontSize: '90%', 
        padding: '20px',
        borderRadius: '5px'
    },
    headerCells: {
        color: '#7D87AA', 
        fontWeight: '600',
        fontSize: '14px',
        padding: '10px'
    },
    resultCells: {
      padding: '5px 5px 5px 5px',
      textAlign: "center",
      verticalAlign: "middle",
      fontWeight: 'bold'
    },
    resultRow: {
      display: "flex",
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '23%',
    },
    inputGroup: {
        width: '100%', 
        display: "flex", 
        flexDirection: "row", 
        alignItems: "flex-end"
      },
      addToListButton: {
        height: '40px',
        width: '140px',
      },
      tableContainer: {
        borderRadius: '10px', 
        background: '#28314E', 
        margin: '15px 0 20px 0', 
        width: '100%'
      }
  } as const
  