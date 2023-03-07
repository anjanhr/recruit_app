import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditInterProcess from "./EditInterProcess";

const InterEditModal = (props) => {
  const { handleClose, open, currData, handleEditedData } = props;

  const style = {
    position: "absolute",
    top: "41.3%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    height: 250,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          style={{ marginBottom: "-20px", marginTop: "-0.6rem" }}
          component="h2"
        >
          Process Edit
          <span
            style={{
              marginLeft: "31.7rem",
              backgroundColor: "red",
              color: "white",
              padding: "2px 7px",
              borderRadius: "3px",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onClick={handleClose}
          >
            X
          </span>
        </Typography>
        <hr style={{ marginTop: "2rem" }} />
        <EditInterProcess
          currData={currData}
          handleClose={handleClose}
          handleEditedData={handleEditedData}
        />
      </Box>
    </Modal>
  );
};

export default InterEditModal;
