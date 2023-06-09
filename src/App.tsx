import React, { useState } from "react";
import Table from "./components/Table";
import Button from "./components/Button";
import Modal from "./components/Modal/Modal";
import mocksData from "./utils/data.json";

// types
import { ITableColumn } from "./components/Table";
import { IPage } from "./entities/interface/IPage";
import { IPricePlan } from "./entities/interface/IPricePlan";
import { IProduct } from "./entities/interface/IProduct";

type DataType = Array<IPage | IPricePlan | IProduct>;
const initData: DataType = Object.values(mocksData).flat();

const columns: ITableColumn[] = [
  { key: "name", label: "Name" },
  { key: "active", label: "Status" },
  { key: "createdAt", label: "Created" },
  { key: "publishedAt", label: "Published" },
  { key: "updatedAt", label: "Updated" },
  { key: "removedAt", label: "Removed" },
  { key: "title", label: "Title" },
  { key: "description", label: "Description" },
  { key: "edit" },
];

function App() {
  const addEditToItem = (arr: DataType) => {
    return arr.map((item) => ({
      ...item,
      edit: () => (
        <Button onClick={() => setEditItem({ ...item })} className="btn btn-primary">
          Edit
        </Button>
      ),
    }));
  };

  const [items, setItems] = useState<DataType>(addEditToItem(initData));
  const [search, setSearch] = useState<string>("");
  const [filterKey, setFilterKey] = useState<string>(columns[0].key);
  const [editItem, setEditItem] = useState<null | IPage | IPricePlan | IProduct>(null);

  const closeModal = () => setEditItem(null);
  const filter = (item: any, searchText: string, key: string) => {
    const values = Object.values(item);
    return !!searchText
      ? item[key] &&
          values.some((value) => typeof value === "string" && value.toLowerCase().includes(searchText.toLowerCase()))
      : item[key];
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredResults = initData.filter((item) => filter(item, e.target.value, filterKey));
    setSearch(e.target.value);
    setItems(addEditToItem(filteredResults));
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterKey(e.target.value);
    const filteredResults = initData.filter((item) => filter(item, search, e.target.value));
    setItems(addEditToItem(filteredResults));
  };

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditItem({ ...(editItem as any), [e.target.name]: e.target.value });
  };

  const saveItem = () => {
    if (editItem) {
      setItems((prevItems) => {
        const savedInitIndex = initData.findIndex(({ id }) => id === editItem?.id);
        initData[savedInitIndex] = editItem;

        const newItems = [...prevItems];
        const index = newItems.findIndex(({ id }) => id === editItem?.id);
        newItems[index] = {
          ...initData[savedInitIndex],
          edit: () => (
            <Button onClick={() => setEditItem({ ...initData[savedInitIndex] })} className="btn btn-primary">
              Edit
            </Button>
          ),
        };
        return newItems;
      });
    }

    setEditItem(null);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-end m-5 row gx-5">
        <div className="col-2">
          <input value={search} onChange={handleSearch} placeholder="Поиск" className="form-control" />
        </div>

        <select className="form-select" style={{ width: "300px" }} onChange={handleFilter} value={filterKey}>
          {columns.map((col, i) => (
            <option key={i} value={col.key}>
              {col.label}
            </option>
          ))}
        </select>
      </div>

      <Table columns={columns} items={items} />

      <Modal isOpen={!!editItem} onClose={closeModal}>
        <h1>Edit</h1>
        <hr />
        <pre>{JSON.stringify(editItem, null, 2)}</pre>

        <p>
          {editItem && "name" in editItem && (
            <input className="form-control" name="name" value={editItem["name"]} onChange={update} />
          )}
        </p>
        <p>
          {editItem && "title" in editItem && (
            <input className="form-control" name="title" value={editItem["title"]} onChange={update} />
          )}
        </p>
        <p>
          {editItem && "description" in editItem && (
            <input className="form-control" name="description" value={editItem["description"]} onChange={update} />
          )}
        </p>

        <hr />
        <div className="d-flex justify-content-end" style={{ columnGap: "10px" }}>
          <Button onClick={saveItem} className="btn btn-primary col-3">
            Save
          </Button>
          <Button onClick={closeModal} className="btn btn-danger col-3">
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
