"use client"

import axios from "axios";
import React from "react"
import { ImagesResponse, ResponseImage } from "./types";
import { AIImage, ImageSkeleton } from "@/app/components";
import Image from "next/image";

interface ImageListProps {
  search?: string
}

const avatarPlaceholder =  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
export default function ImageList({ search }: ImageListProps) {
  const [images, setImages] = React.useState<ResponseImage[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [hasMore, setHasmore] = React.useState(true);

  const imgsRef = React.useRef() as React.MutableRefObject<HTMLUListElement>;

  let url = `api/images?page=2&prompt=${search ?? ""}`
  const fetchOnSearch = React.useCallback(() => {
    setLoading(true)
    axios.get<ImagesResponse>(url)
      .then(data => {
        setImages(data.data.images)
        setHasmore(data.data.hasMore)
        setLoading(false)
      })
      .catch(err => {
        alert(err)
        setLoading(false)
      })
  }, [url])

  const fetchOnScroll = React.useCallback(() => {
    if (hasMore) {
      axios.get<ImagesResponse>(url)
        .then(data => {
          setImages(curr => [...curr, ...data.data.images])
          setHasmore(data.data.hasMore)
          setLoading(false)
        })
        .catch(err => {
          alert(err)
          setLoading(false)
        })
    }
  }, [url, hasMore])

  const handleScroll = React.useCallback(() => {
    const windowHeight = window.innerWidth;
    const scrollY = window.scrollY;
    const contentHeight = document.body.offsetHeight - 100;
    if (windowHeight + scrollY >= contentHeight) {
      fetchOnScroll()
    }
  }, [fetchOnScroll])


  // Handlels fetching on search
  React.useEffect(() => {
    fetchOnSearch()
  }, [fetchOnSearch, search])

  // Handle fetching on scroll
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <div>
      <ul ref={imgsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
        {images.map(img => (
          <div key={img.id} className="backdrop-blur-sm rounded-3xl border border-white/5">
            <AIImage downloadOnly prompt={img.desc ?? ""} url={img.url} />
            <div className="flex items-center gap-3 p-2">
              <Image width={40} height={40}
                className="rounded-full"
                src={img.user?.image ?? avatarPlaceholder}
                alt={img.user?.name ?? ""} />
              <p className="text-sm italic text-white/50">
                by <span className="font-semibold">{img.user?.name ?? "Anonymous"}</span>
              </p>
            </div>
          </div>
        ))}
      </ul>
      {loading && (
        <ImageSkeleton count={10} />
      )}
    </div>
  )
}
