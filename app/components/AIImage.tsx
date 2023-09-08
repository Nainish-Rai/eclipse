import Image from "next/image";
import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { GoDesktopDownload } from "react-icons/go";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";

interface AIImageProps {
    url: string,
    prompt: string
}

export default function AIImage({url, prompt}: AIImageProps) {
    const [showOptions, setShowOptions] = React.useState(false);
    const [saved, setSaved] = React.useState(false);

    function viewOptions() {
        setShowOptions(true)
        setTimeout(() => setShowOptions(false), 5000)
    }

    function downloadImage() {
        fetch(url)
            .then(res => res.blob())
            .then(blob => {
                const imageUrl = URL.createObjectURL(blob);
                const anchor = document.createElement("a");
                anchor.style.display = "none";
                anchor.href = imageUrl;
                anchor.download = `${prompt}.jpg`;
                document.body.appendChild(anchor);
                anchor.click()

                window.URL.revokeObjectURL(imageUrl);
                document.body.removeChild(anchor)
            })
            .catch(err => { alert(`Download error: ${err}`) })
    }

    function uploadImage() {
        let reqBody = {
            url,
            prompt
        }
        axios.post("api/upload_image", reqBody)
            .then(res => {
                console.log(res.data)
                setSaved(true)
            })
            .catch(err => alert(`Save Error: ${err}`))
    }

    console.log({url})

    return (
        <div
            onClick={viewOptions}
            onMouseOver={viewOptions}
            onMouseLeave={() => setShowOptions(false)}
            className="lg:w-1/3 sm:w-1/2 w-full aspect-square p-2 relative z-0">
            <div className={`
                    transition ${showOptions ? "opacity-1" : "opacity-0"}
                    bg-black/50 shadow-lg w-fit px-2 py-1 rounded-xl
                    z-10 absolute right-3 top-3 flex items-center gap-2
                `}>
                <button className="text-white/70 hover:text-blue-600 transition"
                    title="Downolad to device" onClick={downloadImage}>
                    <GoDesktopDownload size={20} />
                </button>
                {!saved && (
                    <button onClick={uploadImage} className="text-white/70 hover:text-green-600 transition"
                        title="Save to cloud">
                        <AiOutlineCloudUpload size={25}/>
                    </button>
                )}
            </div>
          <div className="relative w-full z-0 aspect-square">
            <Image
              src={url}
              alt={prompt}
              className="rounded-2xl"
              width={240}
              height={240}
            />
          </div>
        </div>
   )
}
