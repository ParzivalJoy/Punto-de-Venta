import React from "react";
import Iframe from "react-iframe";

export default function MetabaseIframe() {
  return (
    <Iframe
      url="https://db.bubbletown.me/"
      width="720px"
      height="1080px"
      id="myId"
      // className="myClassname"
      display="initial"
      position="relative"
    />
  );
}
