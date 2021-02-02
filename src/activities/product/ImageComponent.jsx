import React from "react";

const style = {
  imageBlock:{
    position:"relative",
    marginRight:"3%"
  },
  deleteIcon: {
    position: "absolute",
    top:"0",
    right:"0",
    zIndex: "1",
    width:"20%",
    border:"1px solid grey",
    borderRadius:"40px",
    boxShadow:"none",
    color:"grey",
    webKitBoxShadow:"none",
  },
};

export default function ImageComponent(props) {
  return (
    <>
      <div style={style.imageBlock}>
        <button style={style.deleteIcon}><b>X</b></button>
        <img
          style={{ zIndex: "-1" }}
          src={props.image}
          alt={props.alt}
          width="100px"
          height="100"
        />
      </div>
    </>
  );
}
