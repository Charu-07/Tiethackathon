export default function StrategyResults({ routes, onSelectRoute }) {
  if (!routes.length) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Recommended Routes</h3>

      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>#</th>
            <th>Distance (km)</th>
            <th>Fuel</th>
            <th>Catch (kg)</th>
            <th>Profit (₹)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {routes.map((r, i) => (
            <tr key={r.id}>
              <td>{i + 1}</td>
              <td>{r.distance}</td>
              <td>{r.fuel}</td>
              <td>{r.catch}</td>
              <td>{r.profit}</td>
              <td>
                <button onClick={() => onSelectRoute(r)}>
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
