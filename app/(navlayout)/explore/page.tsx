"use client"
import { Badge } from "@/components/ui/badge";
import ImageList from "./ImageList";
import React from "react";

export default function ExplorePage() {
  const searchRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [search, setSearch] = React.useState<string>();

  const handleSearch = () => setSearch(searchRef.current.value)

  return (
    <section className="w-full gap-3 h-full  flex flex-col  lg:px-12">
      <div className="flex backdrop-blur-sm w-full max-w-4xl self-center px-1 gap-2 border border-white/5 rounded-3xl items-center">
        <input ref={searchRef} type="text" placeholder="Search prompt"
          className="bg-transparent p-3 outline-none w-full text-md" />
        <Badge onClick={handleSearch} className="p-2 text-md px-3" variant="secondary">Search</Badge>
      </div>
      <ImageList search={search} />
    </section>
  )
}
