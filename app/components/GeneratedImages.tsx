import Image from "next/image";
type Props = {
  content: string[];
};

function GeneratedImages({ content }: Props) {
  return (
    <div className="bg-neutral-900/50 w-full lg:w-[70%] backdrop-blur mt-4 lg:mt-0 rounded-3xl p-6 h-[39rem] ">
      GeneratedImages
      <div className="flex flex-wrap mt-4">
        {content.map((item) => {
          return (
            <div className=" lg:w-1/3 md:w-1/2 w-full h-64  p-2" key={item}>
              <div className="relative w-full h-full">
                <Image
                  src={
                    "https://images.pexels.com/photos/17483909/pexels-photo-17483909/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-the-concept-of-artificial-general-intelligence-agi-and-the-potential-of-generative-ai-it-was-created-by-d.png?auto=compress&cs=tinysrgb&w=600"
                  }
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
