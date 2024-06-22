"use client";
import Head from "next/head";
import { useEffect, useRef } from "react";
import * as duckdb from "@duckdb/duckdb-wasm";
import { initDuckDB } from "./constants/duckdb.service";
import { MapComponent } from "./components/Map";
import { SidebarComponent } from "./components/Sidebar";

export default function Home() {
  const db = useRef<duckdb.AsyncDuckDB | null>(null);

  useEffect(() => {
    const init = async () => {
      db.current = await initDuckDB();
      await setupZonesTable(db.current);
    };
    init();
  }, []);

  async function setupZonesTable(db: duckdb.AsyncDuckDB) {
    const c = await db.connect();
    await c.query(`CREATE TABLE assignments (geoid VARCHAR, zone INTEGER);`);
  }

  return (
    <main className="flex   items-center justify-between p">
      <div className="h-screen w-screen ">
        <MapComponent db={db} />
        <SidebarComponent db={db} />
      </div>
    </main>
  );
}
