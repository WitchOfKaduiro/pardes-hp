export default function CompareTable({
  headers,
  rows,
  variant = "dark",
}: {
  headers: string[];
  rows: string[][];
  variant?: "dark" | "interior";
}) {
  if (variant === "interior") {
    return (
      <div className="pardes-compare-table">
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[36rem] border-collapse text-fluid-sm">
        <thead>
          <tr className="bg-bg-elevated-2 text-left text-fg">
            {headers.map((header, index) => (
              <th
                key={header}
                className={`px-fluid-sm py-fluid-xs font-semibold ${
                  index === headers.length - 1 ? "text-accent" : ""
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-t border-border odd:bg-bg-elevated/40"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-fluid-sm py-fluid-xs align-top text-fg-muted ${
                    cellIndex === row.length - 1 ? "text-fg" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
