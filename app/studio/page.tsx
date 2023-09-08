"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import GeneratedImages from "../components/GeneratedImages";
import axios from "axios";
import { AIGeneration } from "@/lib/types";

type Props = {};

function Studio({}: Props) {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("kandinsky-2.2");
  const [quality, setQuality] = useState("512x512");
  const [loading, setLoading] = useState(false);

  const [imagesCount, setImagesCount] = useState(3);
  const [selectedStyle, setSelectedStyle] = useState("");

  const [aiGenerations, setAiGenerations] = useState<AIGeneration[]>([]);

  const models = ["kandinsky-2.2", "sdxl"];
  const styles = [
    "Steampunk",
    "Gothic",
    "Pop art",
    "Glitch Art",
    "Glassmorphism",
    "Cyberpunk",
    "Vaporware",
    "Pixel Art",
  ];

  const generateImages = async () => {
    let fullPrompt = prompt !== "" ?
        `${prompt} ${selectedStyle !== "" ? "in " + selectedStyle + " style": ""}`
        :"";
    setPrompt(prompt)

    const reqBody = {
      model: model,
      n: imagesCount,
      prompt: fullPrompt,
      // size: quality,
    };
    if (prompt === "") {
      alert("Please enter a prompt");
      return;
    }
    setLoading(true);

    await axios.post("api/imagesgeneration", reqBody).then((res) => {
      setAiGenerations((prev) => {
        let newGen: AIGeneration = {
            prompt: fullPrompt,
            generated: res.data.data
        };
        return [newGen, ...prev]
      })
      setLoading(false);
    }).catch(err => {
          setLoading(false);
        alert(`${err}`)
    });
  };

  return (
    <main className="w-full lg:max-h-screen overflow-auto lg:h-screen p-0 m-0 bg-[url('../public/hero.png')]  ">
      <section className="w-full  h-full  flex flex-col  lg:px-12">
        {/* content */}
        <div className="w-full lg:h-[92%] h-full m-0 p-1  pb-4  ">
          <div className=" flex flex-col h-full  lg:flex-row  gap-2 items-center">
            {/* Left side */}
            <div className={`
                    lg:h-full max-h-[90vh] overflow-auto
                    border pb-6 lg:w-[33%] w-full
                    flex flex-col sm:flex-row space-x-2 lg:flex-col p-4
                    bg-neutral-900/50  backdrop-blur rounded-3xl
                `}>
              <div className="w-full">
                <h3 className="pl-2  ">Imagine</h3>
                <form>
                  <textarea
                    name="prompt"
                    id="prompt"
                    cols={30}
                    rows={10}
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                    placeholder="An ai robot interacting in form of a waiter with a family having coffee in a restaurant..."
                    className=" bg-transparent border p-3 px-4  rounded-2xl mt-2 w-full h-36"
                  />
                </form>
              </div>
              <div>
                <div className="mt-4">
                  <h4 className="ml-2 mb-2 text-sm">Select Model</h4>
                  {models.map((item) => (
                    <Badge
                      className={` ${
                        model === item ? "bg-neutral-700" : ""
                      } cursor-pointer hover:bg-neutral-800 m-1 p-2 px-4`}
                      variant="outline"
                      onClick={() => {
                        model === item ? setModel("") : setModel(item);
                      }}
                      key={item}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>{" "}
                <div className="mt-6 w-full ">
                  <h4 className="text-sm ml-2">Styles</h4>
                  <div className="mt-2">
                    {styles.map((style) => (
                      <Badge
                        className={`cursor-pointer ${
                          selectedStyle === style ? "bg-neutral-700" : ""
                        } hover:bg-neutral-800 m-1 p-2 px-4`}
                        variant="outline"
                        key={style}
                        onClick={() => {
                          selectedStyle === style
                            ? setSelectedStyle("")
                            : setSelectedStyle(style);
                        }}
                      >
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="w-full p-2 mt-4">
                  <h4 className="text-sm ">
                    Number of Images{" "}
                    <span className="bg-neutral-800 mx-2 rounded-full  px-3 p-1">
                      {imagesCount}
                    </span>
                  </h4>
                  <Slider
                    className="mt-4 outline-none  opacity-70"
                    onValueChange={(value) => setImagesCount(value[0])}
                    min={1}
                    defaultValue={[3]}
                    max={10}
                    step={1}
                  />
                </div>
                <div className="mt-6">
                  <Button
                    onClick={generateImages}
                    className="w-full mx-1 bg-white/10 text-white hover:bg-white/20"
                  >
                    Generate
                  </Button>
                </div>
              </div>
            </div>
            {/* Right side */}

            <GeneratedImages
              isLoading={loading}
              generations={aiGenerations}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Studio;
