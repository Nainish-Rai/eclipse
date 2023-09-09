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

  const getImages = React.useCallback(async () => {
    let imgRes = await axios.get<ImagesResponse>("api/images?page=2").then(data => data.data)
    if (search) {
      setImages(imgRes.images)
    } else {
      setImages([...images, ...imgRes.images])
    }
  }, [search, images])

  React.useEffect(() => {
    getImages().then(() => {
      setLoading(false);
    })
  }, [search, getImages])

  return (
    <ul>
      {images.map(img => (
        <div key={img.id}>
          <Image src={img.url} alt={img.desc!} width={240} height={240} />
        </div>
      ))}
      {loading && (
        <ImageSkeleton count={10} />
      )}
    </ul>
  )
}
