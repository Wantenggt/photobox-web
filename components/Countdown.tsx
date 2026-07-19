type Props = {
    currentPhoto: number;
    count: number;
  };
  
  export default function Countdown({
    currentPhoto,
    count,
  }: Props) {
    return (
      <div className="h-36 flex flex-col items-center justify-center">
  
        <p className="text-xl text-gray-300">
          Foto {currentPhoto} / 4
        </p>
  
        <h1 className="text-8xl font-bold">
          {count}
        </h1>
  
      </div>
    );
  }