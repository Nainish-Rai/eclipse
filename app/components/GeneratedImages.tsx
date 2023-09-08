import { AIGeneration } from "@/lib/types";
import AIImage from "./AIImage";

type Props = {
  isLoading: boolean;
  generations: AIGeneration[]
};

function GeneratedImages({ generations, isLoading }: Props) {
  return (
    <div className="bg-neutral-900/50 border w-full lg:w-[70%] backdrop-blur mt-4 lg:mt-0 rounded-3xl p-4 max-h-full h-full  overflow-y-scroll scrollbar-hide ">
      <h2 className="mb-2">Generated Images</h2>

      {isLoading && (
        <div className="flex  sm:flex-wrap flex-col sm:flex-row  mt-4">
          <div className="animate-pulse  flex p-2 space-x-4 w-1/3 ">
            <div className="aspect-square w-full  bg-neutral-700/50 rounded-2xl"></div>
          </div>
          <div className="animate-pulse  flex p-2 space-x-4 w-1/3 ">
            <div className="aspect-square w-full  bg-neutral-700/50 rounded-2xl"></div>
          </div>
          <div className="animate-pulse  flex p-2 space-x-4 w-1/3 ">
            <div className="aspect-square w-full  bg-neutral-700/50 rounded-2xl"></div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {generations.map((generation) => {
          return (
            <div key={generation.prompt}>
                <h3 className="bg-black/20 p-0.5 px-3 rounded-xl italic text-white/60">
                    {generation.prompt}
                </h3>
                <ul className="flex sm:flex-wrap flex-col sm:flex-row">
                    {generation.generated.map(item => (
                        <AIImage url={item.url} key={item.url} prompt={generation.prompt} />
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
