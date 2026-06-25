import type { ReactNode } from "react";

export type DataTableColumn<T> = {
  key: string;
  header: ReactNode;
  width?: string;
  headerClassName?: string;
  cellClassName?: string;
  render: (item: T) => ReactNode;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (item: T) => string | number;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  loadingMessage?: ReactNode;
  emptyMessage?: ReactNode;
};

const DataTable = <T,>({
  columns,
  data,
  rowKey,
  onRowClick,
  isLoading = false,
  loadingMessage = "Loading...",
  emptyMessage = "No data.",
}: DataTableProps<T>) => {
  const colSpan = columns.length;

  return (
    <div className="overflow-hidden">
      <table className="w-full table-fixed">
        <colgroup>
          {columns.map((column) => (
            <col key={column.key} className={column.width} />
          ))}
        </colgroup>

        <thead>
          <tr className="border-b border-t-2 border-black">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-5 py-4 text-center text-sm font-medium ${
                  column.headerClassName ?? ""
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={colSpan} className="px-5 py-16">
                <div className="flex flex-col items-center justify-center gap-3 text-sm text-gray-500">
                  <div className="size-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#4988C4]" />
                  {loadingMessage}
                </div>
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={rowKey(item)}
                className={`border-b text-center hover:bg-gray-50 ${
                  onRowClick ? "cursor-pointer" : ""
                }`}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-5 py-5 ${column.cellClassName ?? ""}`}
                  >
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            ))
          )}

          {!isLoading && data.length === 0 && (
            <tr>
              <td
                colSpan={colSpan}
                className="px-5 py-12 text-center text-sm text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
