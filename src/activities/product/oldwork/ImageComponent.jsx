import React from "react";

const style = {
  imageBlock:{
    display:"inline-block",
    position:"relative",
    marginRight:"2%"
  },
  deleteIcon: {
    position: "absolute",
    top:"0",
    right:"0",
    zIndex: "1",
    width:"30%",
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
          width="80px"
          height="100px"
        />
      </div>
    </>
  );
}
