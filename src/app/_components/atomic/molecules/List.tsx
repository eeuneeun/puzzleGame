import { ListItem } from "@mui/material";
import React from "react";

type Props = {};

export default function List({}: Props) {
  return (
    <ul>
      <ListItem content={"마이페이지"} />
      <ListItem content={"마이페이지"} />
      <ListItem content={"마이페이지"} />
    </ul>
  );
}
