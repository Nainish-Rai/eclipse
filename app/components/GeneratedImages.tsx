import Image from "next/image";
type Props = {
  isLoading: boolean;
  content: {
    url: string;
  }[];
};

function GeneratedImages({ content, isLoading }: Props) {
  return (
    <div className="bg-neutral-900/50 border w-full lg:w-[70%] backdrop-blur mt-4 lg:mt-0 rounded-3xl p-4 max-h-full h-full  overflow-y-scroll scrollbar-hide ">
      <div className="">GeneratedImages</div>

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
      <div className="flex  sm:flex-wrap flex-col sm:flex-row  mt-1">
        {content.map((item) => {
          return (
            <div
              className=" lg:w-1/3 sm:w-1/2 w-full aspect-square p-2"
              key={item.url}
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={item.url}
                  alt="image"
                  className="rounded-2xl"
                  fill
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GeneratedImages;
