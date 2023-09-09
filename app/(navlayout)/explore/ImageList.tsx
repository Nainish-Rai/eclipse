"use client"

import axios from "axios";
import React from "react"
import { ImagesResponse, ResponseImage } from "./types";
import { AIImage, ImageSkeleton } from "@/app/components";

interface ImageListProps {
  search?: string
}

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
          <AIImage downloadOnly key={img.id} prompt={img.desc ?? ""} url={img.url} />
        ))}
      </ul>
      {loading && (
        <ImageSkeleton count={10} />
      )}
    </div>
  )
}
