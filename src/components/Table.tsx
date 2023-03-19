import React, { useState, useEffect } from "react";

interface ITableProp {
  columns: ITableColumn[];
  items: ITableItem[];
  portionSize?: number;
  loading?: boolean;
}

interface ITableState {
  portionNumber: number;
  currentPage: number;
  pageSize: number;
}

export interface ITableColumn {
  key: string;
  label?: string;
  width?: string;
  align?: string;
}

export interface ITableItem {
  [key: string]: any;
}

const renderItem = (item: string | Function | boolean | number) => {
  switch (typeof item) {
    case "boolean":
      return item ? "active" : "not active";
    case "function":
      return item();
    default:
      return item ?? "-";
  }
};

const Table: React.FC<ITableProp> = ({ columns = [], items = [], portionSize = 3, loading = false }) => {
  const [state, setState] = useState<ITableState>({
    portionNumber: 1,
    currentPage: 1,
    pageSize: 10,
  });

  useEffect(() => {
    if (state.currentPage > 1) {
      setState({
        ...state,
        currentPage: 1,
        portionNumber: 1,
      });
    }
  }, [items.length, state.pageSize]);

  let pagesCount = Math.ceil(items.length / state.pageSize);
  let pageMas = [];

  for (var i = 1; i <= pagesCount; i++) {
    pageMas.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let leftPageNumber = (state.portionNumber - 1) * portionSize + 1;
  let rightPageNumber = state.portionNumber * portionSize;

  console.log("table render");
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map(({ label, key }) => (
            <th key={key}>{label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <tr>
            <td colSpan={columns.length}>Загрузка...</td>
          </tr>
        ) : (
          items
            .slice(state.pageSize * state.currentPage - state.pageSize, state.pageSize * state.currentPage)
            .map((item, i) => (
              <tr key={i}>
                {columns.map(({ key }, i) => (
                  <td key={i + key}>{renderItem(item[key])}</td>
                ))}
              </tr>
            ))
        )}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan={columns.length}>
            <div className="d-flex justify-content-center" style={{ columnGap: "10px" }}>
              <button
                className="btn btn-outline-primary"
                disabled={state.portionNumber === 1}
                onClick={() =>
                  state.portionNumber > 1 && setState({ ...state, portionNumber: state.portionNumber - 1 })
                }
              >
                Назад
              </button>
              {pageMas.slice(leftPageNumber - 1, rightPageNumber).map((page, i) => (
                <button
                  key={i}
                  className={"btn btn-link" + (page === state.currentPage ? "active" : "")}
                  onClick={() => setState({ ...state, currentPage: page })}
                >
                  {page}
                </button>
              ))}
              <button
                className="btn btn-outline-primary"
                disabled={state.portionNumber === portionCount}
                onClick={() =>
                  state.portionNumber < portionCount && setState({ ...state, portionNumber: state.portionNumber + 1 })
                }
              >
                Вперед
              </button>

              <div className="d-flex align-items-center">
                <select
                  className="form-select"
                  style={{ width: "80px", marginRight: "10px" }}
                  onChange={({ target }) => {
                    setState({ ...state, pageSize: +target.value });
                  }}
                  value={state.pageSize}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={items.length}>Все</option>
                </select>
                - Строк в таблице
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
