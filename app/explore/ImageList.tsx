"use client"

import axios from "axios";
import React from "react"
import { ImagesResponse, ResponseImage } from "./types";
import { AIImage, ImageSkeleton } from "../components";

interface ImageListProps {
  search?: string
}

export default function ImageList({ search }: ImageListProps) {
  const [images, setImages] = React.useState<ResponseImage[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get<ImagesResponse>("api/images?page=2")
      .then(data => {
        if (search) {
          setImages(data.data.images)
        } else {
          setImages(curr => [...curr, ...data.data.images])
        }
        setLoading(false)
      })
  }, [search])

  return (
    <div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
        {images.map(img => (
            <AIImage downloadOnly key={img.id} prompt={img.desc ?? ""} url={img.url}/>
        ))}
      </ul>
      {loading && (
        <ImageSkeleton count={10} />
      )}
    </div>
  )
}
