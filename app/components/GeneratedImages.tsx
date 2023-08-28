import Image from "next/image";
type Props = {
  isLoading: boolean;
  content: {
    url: string;
  }[];
};

function GeneratedImages({ content, isLoading }: Props) {
  return (
    <div className="bg-neutral-900/50 w-full lg:w-[70%] backdrop-blur mt-4 lg:mt-0 rounded-3xl p-6 h-[39rem] overflow-y-scroll ">
      GeneratedImages
      {isLoading && <div className="animate-pulse flex space-x-4">Loading</div>}
      <div className="flex  flex-wrap-reverse mt-4">
        {content.map((item) => {
          return (
            <div className=" lg:w-1/3 md:w-1/2 w-full h-64  p-2" key={item.url}>
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
