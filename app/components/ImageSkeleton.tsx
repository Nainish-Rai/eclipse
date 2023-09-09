interface SkeletonProps {
  count?: number
}

export default function ImageSkeleton({count}: SkeletonProps) {
  const number = count ?? 3;
  const width = number > 3 ? "w-1/5" : "w-1/3";
  const arr = Array.from({length: number}, (_x, i) => i)
  return (
    <div className="flex  sm:flex-wrap flex-col sm:flex-row  mt-4">
      {arr.map(index => (
        <div key={index} className={`animate-pulse flex p-2 space-x-4 ${width}`}>
          <div className="aspect-square w-full  bg-neutral-700/50 rounded-2xl"></div>
        </div>
      ))}
    </div>
  )
}
