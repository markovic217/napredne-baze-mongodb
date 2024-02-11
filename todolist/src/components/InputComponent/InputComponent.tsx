import React, { FC, useRef } from "react";
import styles from "./InputComponent.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
//import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useState } from "react";
import { todo } from "../../api";
import { TodoItem } from "../../api/Client";
import axios from "axios";

interface InputComponentProps {
  setListArray: any;
  listArray: any[];
}

const InputComponent: FC<InputComponentProps> = ({
  listArray,
  setListArray,
}) => {
  const [textField, setTextField] = useState("Placeholder");
  const [keyId, setKeyId] = useState(0);

  const addItem = async () => {
    if (textField !== "" && date !== "") {
      setTextField("Placeholder");
      setKeyId(keyId + 1);
      const r = Math.floor(Math.random() * 1000000000);
      console.log(date);
      const cr = await todo.create(
        new TodoItem({
          id: r.toString(),
          title: textField,
          date: new Date(date),
          priority: priority,
        })
      );
      const list = await todo.getAll();
      setListArray(list);
    }
  };
  const [priority, setPriority] = useState("Low");
  const [date, setDate] = useState("");
  const dateInputRef = useRef(null);
  const handleChange = (e: any) => {
    setDate(e.target.value);
  };

  return (
    <div className={styles.InputComponent}>
      <TextField
        className="standard-basic"
        label="Add item"
        variant="standard"
        style={{ width: "500px" }}
        color="success"
        value={textField}
        onChange={(e) => setTextField(e.target.value)}
      />
      <div>
        <label>Due date: </label>
        <input type="date" onChange={handleChange} ref={dateInputRef} />
      </div>
      <div>
        <label>Priority: </label>
        <select
          onChange={(e) => {
            setPriority(e.target.value);
          }}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <Button variant="outlined" color="success" onClick={addItem}>
        Add Item
      </Button>
    </div>
  );
};

export default InputComponent;
