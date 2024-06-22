"use client";
import Head from "next/head";
import { MapComponent } from "./components/Map";
import { SidebarComponent } from "./components/Sidebar";
export default function Home() {
  return (
    <main className="flex   items-center justify-between p">
      <div className="h-screen w-screen ">
        <MapComponent />
        <SidebarComponent />
      </div>
    </main>
  );
}
