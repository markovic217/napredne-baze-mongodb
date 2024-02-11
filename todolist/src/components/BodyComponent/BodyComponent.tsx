import React, { FC, useEffect } from "react";
import InputComponent from "../InputComponent/InputComponent";
import ListComponent from "../ListComponent/ListComponent";
import styles from "./BodyComponent.module.scss";
import { useState, createContext } from "react";
import { Button } from "@mui/material";
import { todo } from "../../api";
import { TodoItem } from "../../api/Client";

interface BodyComponentProps {}
const DeleteContext = createContext((id: number) => {});
const BodyComponent: FC<BodyComponentProps> = () => {
  const [listArray, setListArray] = useState<TodoItem[]>([]);
  useEffect(() => {
    todo.getAll().then((data) => setListArray(data));
  }, []);
  const deleteItem = async (index: number) => {
    const del = await todo.delete(listArray[index].id);
    const list = await todo.getAll();
    setListArray(list);
  };
  const deleteListArray = async() => {
    const del = await todo.deleteAll();
    setListArray([]);
  };

  return (
    <div className={styles.BodyComponent}>
      <h2>To do list</h2>
      <InputComponent setListArray={setListArray} listArray={listArray} />

      <ListComponent
        listArray={listArray}
        deleteItem={(index: any) => {
          deleteItem(index);
        }}
      />

      <Button variant="outlined" color="error" onClick={deleteListArray}>
        Clear All Items
      </Button>
    </div>
  );
};
export { DeleteContext };
export default BodyComponent;
