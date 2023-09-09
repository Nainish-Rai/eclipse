import Image from "next/image";
import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { GoDesktopDownload } from "react-icons/go";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

interface AIImageProps {
  url: string,
  prompt: string,
  downloadOnly?: boolean
}

export default function AIImage({ url, prompt, downloadOnly }: AIImageProps) {
  const [showOptions, setShowOptions] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const { user } = useUser();

  function viewOptions() {
    setShowOptions(true)
    setTimeout(() => setShowOptions(false), 5000)
  }

  function downloadImage() {
    console.log({url})
    axios.get(`api/download?url=${url}`, { responseType: "blob"}).then(res => {
        console.log(res)
        console.log(res.data)
        const anchor = document.createElement("a");
        anchor.style.display = "none";
        anchor.href = window.URL.createObjectURL(res.data);
        anchor.download = `${prompt}.jpeg`
        document.body.appendChild(anchor)
        anchor.click()
        window.URL.revokeObjectURL(anchor.href)
        document.body.removeChild(anchor)
    }).catch(err => alert(err))
  }

  function uploadImage() {
    let reqBody = {
      url,
      prompt,
      email: user?.emailAddresses[0].emailAddress
    }
    axios.post("api/upload_image", reqBody)
      .then(res => {
        alert(`Success: saved as ${res.data.desc}`)
        setSaved(true)
      })
      .catch(err => alert(`Save Error: Failed to save ${err}`))
  }

  return (
    <div
      onClick={viewOptions}
      onMouseOver={viewOptions}
      onMouseLeave={() => setShowOptions(false)}
      className="w-full aspect-square p-2 relative z-0">
      <div className={`
                    transition ${showOptions ? "opacity-1" : "opacity-0"}
                    bg-black/50 shadow-lg w-fit px-2 py-1 rounded-xl
                    z-10 absolute right-3 top-3 flex items-center gap-2
                `}>
        <button className="text-white/70 hover:text-blue-600 transition"
          title="Downolad to device" onClick={downloadImage}>
          <GoDesktopDownload size={20} />
        </button>
        {downloadOnly || !saved && (
          <button onClick={uploadImage} className="text-white/70 hover:text-green-600 transition"
            title="Save to cloud">
            <AiOutlineCloudUpload size={25} />
          </button>
        )}
      </div>
      <div className="relative w-full z-0 aspect-square">
        <Image
          src={url}
          alt={prompt}
          className="rounded-2xl w-full"
          width={240}
          height={240}
        />
      </div>
    </div>
  )
}
