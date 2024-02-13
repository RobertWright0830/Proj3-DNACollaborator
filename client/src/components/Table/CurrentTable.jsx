import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import { useQuery, gql } from "@apollo/client";
import { Checkbox } from "./Checkbox";
import { COLUMNS } from "./columns";
import "./table.css";
import { GlobalFilter } from "./GlobalFilter";
import { ColumnFilter } from "./ColumnFilter";

const GET_SEGMENTS = gql`
  query GetSegments {
      segments {
      testerId
      matchId
      matchName
      wikitreeIds
      chromosome
      start
      end
      segmentCm
      sex
      matchEmail
    }
  }
`;

const CurrentTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const { loading, error, data } = useQuery(GET_SEGMENTS);
  const tableData = useMemo(
    () => (data && data.segments ? data.segments : []),
    [data]
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    prepareRow,
    selectedFlatRows,
    state,
    setGlobalFilter,
    allColumns,
    getToggleHideAllColumnsProps
  } = useTable(
    {
      columns,
      data: tableData,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <input
                  className="checkbox"
                  type="checkbox"
                  {...getToggleAllRowsSelectedProps()}
                />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <input
                  className="checkbox"
                   type="checkbox"
                  {...row.getToggleRowSelectedProps()}
                />
              </div>
            ),
          },
          ...columns,
        ];
      });
    }
  );

    const { pageIndex, pageSize, globalFilter } = state;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="row checkbox">
        <div>
          <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
        </div>
        {
          allColumns.map(column => (
            <div key={column.id} className="col-4">
              <label>
                <input type="checkbox" {...column.getToggleHiddenProps()} />
                {column.Header}
              </label>
            </div>
          ))
        }
        </div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="table-warning"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                  <span
                    className={
                      column.isSorted
                        ? column.isSortedDesc
                          ? "arrow-down"
                          : "arrow-up"
                        : ""
                    }
                  ></span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <strong>
            Page {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={!canPreviousPage ? "btn-disabled" : "btn-enabled"} // Apply classes based on state
        >
          Previous
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={!canNextPage ? "btn-disabled" : "btn-enabled"} // Apply classes based on state
        >
          Next
        </button>
      </div>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
};

export default CurrentTable;
