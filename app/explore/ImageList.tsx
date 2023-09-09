"use client"

import axios from "axios";
import React from "react"
import { ImagesResponse, ResponseImage } from "./types";
import Image from "next/image";
import { ImageSkeleton } from "../components";

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
    <ul className="flex w-full gap-3 flex-wrap">
      {images.map(img => (
        <div key={img.id}>
          <Image className="rounded-xl" src={img.url} alt={img.desc!} width={240} height={240} />
        </div>
      ))}
      {loading && (
        <ImageSkeleton count={10} />
      )}
    </ul>
  )
}
