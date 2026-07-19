type Props = {
    photos: string[];
  };
  
  export default function PhotoGrid({ photos }: Props) {
    if (photos.length === 0) return null;
  
    return (
      <>
  
        <h2 className="text-3xl font-bold mt-10 mb-5">
          Preview
        </h2>
  
        <div className="grid grid-cols-2 gap-5">
  
          {photos.map((photo, index) => (
  
            <img
              key={index}
              src={photo}
              alt=""
              className="w-56 rounded-xl border-4 border-white"
            />
  
          ))}
  
        </div>
  
      </>
    );
  }