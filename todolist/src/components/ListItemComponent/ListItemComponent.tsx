import React, { FC } from "react";
import styles from "./ListItemComponent.module.scss";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import ModifyItemComponent from "../ModifyItemComponent/ModifyItemComponent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { DeleteContext } from "../BodyComponent/BodyComponent";
import { todo } from "../../api";

interface ListItemComponentProps {
  itemProp: any;
  keyId: any;
  deleteItem: any;
}

const ListItemComponent: FC<ListItemComponentProps> = ({
  itemProp,
  keyId,
  deleteItem,
}) => {
  const buttonComponent = {
    width: "100px",
    fontSize: "12px",
    fontWeight: "bold",
    border: "2px solid",
  };
  const [completed, setCompleted] = useState(itemProp.isCompleted);
  const [visibility, setVisibility] = useState(false);
  const [item, setItem] = useState(itemProp);
  return (
    <div>
      <CheckCircleIcon
        style={{
          float: "left",
          visibility: completed ? "visible" : "hidden",
          marginRight: "10px",
        }}
        color="success"
      />
      <li
        className={styles.ListItemComponent}
        style={{ listStyleType: completed ? "circle" : "none" }}
      >
        <div className={completed ? styles.CompletedStyle : ""}>
          Due date: {item?.date?.toISOString()?.split("T")[0]} <br />
          Priority: {item?.priority} <br />
          {item?.title}
          <br />
        </div>

        <div>
          <Button
            variant="outlined"
            color="success"
            sx={buttonComponent}
            onClick={async () => {
              setCompleted(!completed);
              const i = item;
              i.isCompleted = !i.isCompleted;
              setItem(i);
              console.log(i);
              const up = await todo.updateCompleted(i.id);
            }}
          >
            Completed
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={buttonComponent}
            onClick={() => setVisibility(true)}
          >
            Modify
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={buttonComponent}
            onClick={() => {
              deleteItem(keyId);
            }}
          >
            Delete
          </Button>
        </div>
      </li>
      <ModifyItemComponent
        visibility={visibility}
        item={item}
        setItem={setItem}
        setVisibility={setVisibility}
      />
    </div>
  );
};

export default ListItemComponent;
