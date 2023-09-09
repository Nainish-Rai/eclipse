import { AIGeneration } from "@/lib/types";
import AIImage from "./AIImage";
import { ImageSkeleton } from ".";

type Props = {
  isLoading: boolean;
  generations: AIGeneration[]
};

function GeneratedImages({ generations, isLoading }: Props) {
  return (
    <div className="bg-neutral-900/50 border w-full lg:w-[70%] backdrop-blur mt-4 lg:mt-0 rounded-3xl p-4 max-h-full h-full  overflow-y-scroll scrollbar-hide ">
      <h2 className="mb-2">Generated Images</h2>

      {isLoading && (
        <ImageSkeleton />
      )}
      <div className="flex flex-col gap-4">
        {generations.map((generation) => {
          return (
            <div key={generation.prompt}>
                <h3 className="bg-black/20 p-0.5 px-3 rounded-xl italic text-white/60">
                    {generation.prompt}
                </h3>
                <ul className="grid grid-cols-2 md:grid-cols-3">
                    {generation.generated.map(item => (
                        <AIImage url={item.url} key={item.url} prompt={generation.prompt ?? ""} />
                    ))}
                </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GeneratedImages;
