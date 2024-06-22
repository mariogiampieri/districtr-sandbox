"use client";
import React, { useEffect, useRef } from "react";
import * as duckdb from "@duckdb/duckdb-wasm";
import { useZoneStore } from "@/app/store/zoneStore";
import { initDuckDB } from "../constants/duckdb.service";
import ZoneTypeSelector from "./Picker";

export const SidebarComponent: React.FC = () => {
  const db = useRef<duckdb.AsyncDuckDB | null>(null);
  const zoneStore = useZoneStore();

  useEffect(() => {
    const init = async () => {
      db.current = await initDuckDB();
      await setupZonesTable(db.current);
    };
    init();
  }, []);

  async function setupZonesTable(db: duckdb.AsyncDuckDB) {
    const c = await db.connect();

    let query = await c.query(
        `CREATE TABLE assignments (geoid VARCHAR, zone INTEGER);`,
      ),
      result = query.toArray().map((row) => row.toArray());

    return result;
  }

  const calculatePopulations = async (db: duckdb.AsyncDuckDB | null) => {
    if (!db) return;
    const c = await db.connect();
    let query = await c.query(`SELECT count(*) as tot from assignments;`),
      result = query.toArray().map((row) => row.toArray());

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
      {db.current !== null ? (
        <p>Database is ready</p>
      ) : (
        <p>Database is not ready</p>
      )}
      <ZoneTypeSelector />
      <button
        disabled={db.current === null}
        onClick={() => calculatePopulations(db.current)}
      >
        Calculate Populations
      </button>
    </div>
  );
};
