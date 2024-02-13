import { ColumnFilter } from "./ColumnFilter";

export const customNumberFilter = (rows, id, filterValue) => {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    if (filterValue.startsWith(">")) {
      return rowValue > parseFloat(filterValue.substring(1));
    } else if (filterValue.startsWith("<")) {
      return rowValue < parseFloat(filterValue.substring(1));
    } else if (filterValue.startsWith("=")) {
      return rowValue === parseFloat(filterValue.substring(1));
    }
    return true;
  });
};

export const COLUMNS = [

  
  {
    Header: "Tester ID",
    accessor: "testerId",
    filter: customNumberFilter,
  },
  {
    Header: "Match ID",
    accessor: "matchId",
  },
  {
    Header: "Name",
    accessor: "matchName",
  },
  {
    Header: "WikiTree ID",
    accessor: "wikitreeIds",
  },
  {
    Header: "Chrom",
    accessor: "chromosome",
  },
  {
    Header: "Start",
    accessor: "start",
    filter: customNumberFilter,
    Cell: ({ value }) => {
      // Use Intl.NumberFormat to format the cell value
      return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
      }).format(value);
    },
  },
  {
    Header: "End",
    accessor: "end",
    filter: customNumberFilter,
    Cell: ({ value }) => {
      // Use Intl.NumberFormat to format the cell value
      return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
      }).format(value);
    },
  },
  {
    Header: "Segment Cm",
    accessor: "segmentCm",
    filter: customNumberFilter,
  },
  {
    Header: "Sex",
    accessor: "sex",
    disableFilters: true,
  },
  {
    Header: "Email",
    accessor: "matchEmail",
  },
];
