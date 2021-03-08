import React, { useMemo, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDropzone } from "react-dropzone";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import shortid from "shortid";
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import BTCustom from "./Element/BTCustom";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderWidth: 3,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fdfdfd",
  color: "#bababa",
  outline: "none",
  height: "100%",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "auto",
  height: "auto",
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default (props) => {
  const { len, width = 150, height = 300, title } = props;
  const [files, setFiles] = useState([]);
  const img = new Image();
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open,
  } = useDropzone({
    accept: "image/*",
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  );

  const thumbs = files.map((item, index) => {
    {
      img.src = item.preview;
    }
    return (
      <ListItem key={shortid.generate()}>
        <ListItemAvatar>
          <img
            src={item.preview}
            alt="upload"
            width={img.width}
            height={img.height}
          ></img>
        </ListItemAvatar>
        <Tooltip title={item.path} aria-label="add">
          <ListItemText
            primary={
              item.path.slice(0, 30) + (item.path.length > 30 ? "..." : "")
            }
          />
        </Tooltip>
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {thumbs.length !== 0 ? (
        <List
          style={{
            overflowY: "auto",
            overflowX: "auto",
            height: "85%",
            width: "90%",
            marginTop: "1%",
            textAlign: "center",
          }}
        >
          {thumbs}
        </List>
      ) : (
        <>
          <CloudUploadIcon
            style={{ fontSize: "50px", color: "#25ACA3", marginTop: "10%" }}
          />
          <div style={{ paddingBottom: "4%" }}>รูปใบเสร็จการชำระเงิน</div>
        </>
      )}

      <BTCustom
        component="label"
        htmlFor="contained-button-file"
        style={{ width: "60%" }}
        variant="contained"
        color="primary"
        onClick={open}
      >
        UPLOAD
      </BTCustom>
    </div>
  );
};
