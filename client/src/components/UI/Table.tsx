type Column<T> = {
  header: string;
  accessor: keyof T;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

function Table<T>({ data, columns }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-2xl shadow-md">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.accessor)} className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="border-t">
              {columns.map((col) => (
                <td key={String(col.accessor)} className="px-4 py-2 text-sm text-gray-900">
                  {String(row[col.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
