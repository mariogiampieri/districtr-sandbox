"use client";
import React from "react";
import * as duckdb from "@duckdb/duckdb-wasm";
import ZoneTypeSelector from "./Picker";
import { ResultsComponent } from "./Results";

interface SidebarComponentProps {
  db: React.MutableRefObject<duckdb.AsyncDuckDB | null>;
}

export const SidebarComponent: React.FC<SidebarComponentProps> = ({ db }) => {
  const [dbIsReady, setDbIsReady] = React.useState(false);
  const [result, setResult] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (db !== null) {
      setDbIsReady(true);
    }
  }, [db]);

  const calculatePopulations = async (db: duckdb.AsyncDuckDB | null) => {
    if (!db) return;
    const c = await db.connect();

    let query = await c.query(
        `SELECT zone, count(*) as tot from assignments group by zone;`,
      ),
      result = query.toArray().map((row) => row.toArray());

    setResult(result);
    console.log(result);
  };

  return (
    <div
      style={{
        position: "fixed",
        left: "1rem",
        top: "1rem",
        backgroundColor: "white",
        padding: "1rem",
        border: "1px solid black",
        borderRadius: "0.5rem",
      }}
    >
      <h1>Map Component</h1>
      {dbIsReady ? <p>Database is ready</p> : <p>Database is not ready</p>}
      <ZoneTypeSelector />
      <button
        disabled={!dbIsReady}
        onClick={() => calculatePopulations(db.current)}
      >
        Calculate number of assigned zones
      </button>
      <ResultsComponent results={result} />
    </div>
  );
};
