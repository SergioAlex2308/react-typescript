import { Inter } from "next/font/google";
import { LazyImage } from "@/components/LazyImage";
import { useEffect, useState} from "react";
import { MouseEventHandler } from "react";
import { random } from "lodash";

const myRandom = () => random(1, 123);

//const random = () => Math.floor(Math.random() * 123) + 1;

// Generate simple unique id
const generateId = () => Math.random().toString(36).substr(2, 9);

export default function Home() {
  const [images, setImages] = useState<IFoxImageItem[]>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = () => {
    const newImageItem: IFoxImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${myRandom()}.jpg`,
    };
    setImages([...images, newImageItem]);
  };

  const handleLoad = (node: HTMLImageElement) => {
    console.log("onLazyLoad! Url Image:", node.src);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gradient-conic">
      <h1 className="fixed font-bold left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Curso React TypeScript
      </h1>
      <button
        className="bg-gray-400 hover:bg-gray-500 px-12 py-4 rounded-md"
        onClick={addNewFox}
      >
        Add new fox
      </button>
      {images.length > 0 && (
        <button
          className="bg-gray-400 hover:bg-gray-500 px-12 py-4 rounded-md mt-4"
          onClick={() => setImages([])}
        >
          Delete Images
        </button>
      )}

      {images.map(({ id, url }) => (
        <div key={id} className="p-4">
          <LazyImage
            src={url}
            onLazyLoad={handleLoad}
            width={320}
            height="auto"
            className="rounded bg-gray-700"
          />
        </div>
      ))}
    </main>
  );
}
