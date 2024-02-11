import React, { FC, useRef, useState } from "react";
import styles from "./ModifyItemComponent.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { todo } from "../../api";
interface ModifyItemComponentProps {
  visibility: boolean;
  item: any;
  setItem: (item: string) => void;
  setVisibility: (visibility: boolean) => void;
}

const ModifyItemComponent: FC<ModifyItemComponentProps> = ({
  visibility,
  item,
  setItem,
  setVisibility,
}) => {
  const [priority, setPriority] = useState(item.priority);

  const [date, setDate] = useState(item.date.toISOString()?.split("T")[0]);
  const dateInputRef = useRef(null);
  const handleChange = (e: any) => {
    setDate(e.target.value);
    setModifiedItem({ ...modifiedItem, date: new Date(e.target.value) });
  };
  const [modifiedItem, setModifiedItem] = useState(item);
  return (
    <div
      className={styles.ModifyItemComponent}
      style={{ display: visibility ? "block" : "none" }}
    >
      <div className={styles.container}>
        <div
          className={styles.xBtn}
          onClick={() => {
            setVisibility(false);
          }}
        >
          x
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div>
            <label>Priority: </label>
            <select
              onChange={(e) => {
                setPriority(e.target.value);
                setModifiedItem({ ...modifiedItem, priority: e.target.value });
              }}
              value={priority}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label>Due date: </label>
            <input type="date" value={date} onChange={handleChange} />
          </div>
          <TextField
            className="standard-basic"
            label="Text"
            variant="outlined"
            style={{ width: "400px" }}
            color="primary"
            value={modifiedItem.title}
            onChange={(e) => {
              console.log(modifiedItem);
              setModifiedItem({ ...modifiedItem, title: e.target.value });
            }}
          />
        </div>
        <Button
          variant="outlined"
          color="primary"
          sx={{ height: "75px" }}
          onClick={async () => {
            console.log(modifiedItem);
            setItem(modifiedItem);

            const up = await todo.update(modifiedItem.id, modifiedItem);
            setVisibility(false);
          }}
        >
          Modify Item
        </Button>
      </div>
    </div>
  );
};

export default ModifyItemComponent;
