import React, { FC } from "react";
import styles from "./ListComponent.module.scss";
import ListItemComponent from "./../ListItemComponent/ListItemComponent";
import { TodoItem } from "../../api/Client";
interface ListComponentProps {
  listArray: TodoItem[];
  deleteItem: (index: any) => void;
}

const ListComponent: FC<ListComponentProps> = ({ listArray, deleteItem }) => {
  return (
    <div className={styles.ListComponent}>
      {listArray.map((item, index) => {
        return (
          <ListItemComponent
            key={item.id}
            itemProp={item}
            keyId={index}
            deleteItem={deleteItem}
          ></ListItemComponent>
        );
      })}
    </div>
  );
};

export default ListComponent;
