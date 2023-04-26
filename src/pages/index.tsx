import { Inter } from "next/font/google";
import { LazyImage } from "@/components/LazyImage";
import { useEffect, useState } from "react";
import { MouseEventHandler } from "react";
import { random } from "lodash";

const myRandom = () => random(1, 123);

//const random = () => Math.floor(Math.random() * 123) + 1;

// Generate simple unique id
const generateId = () => Math.random().toString(36).substr(2, 9);

export default function Home() {
  const [images, setImages] = useState<IFoxImageItem[]>([]);

  const [foxCounter, setFoxCounter] = useState<number>(0);
  const [foxLoad, setFoxLoad] = useState<number>(0);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = () => {
    const newImageItem: IFoxImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${myRandom()}.jpg`,
    };
    setImages([...images, newImageItem]);
    setFoxCounter((prev) => prev + 1);
  };

  const handleLoad = (node: HTMLImageElement) => {
    console.log("onLazyLoad! Url Image:", node.src);
  };
  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    setImages([]);
    setFoxLoad(0);
    setFoxCounter(0);
  };

  const handleLoaded = (state: boolean) => {
    if (state) setFoxLoad((prev) => prev + 1);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start mt-24 p-24 gradient-conic">
      <div className="fixed flex left-0 top-0 py-8 w-full flex-col gap-4 border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <h1 className="font-bold text-center">Curso React TypeScript</h1>
        <div className="flex justify-center gap-4 h-8">
          <button
            className="bg-orange-500 hover:bg-orange-600 px-12 py-2 rounded-md flex items-center"
            onClick={addNewFox}
          >
            Add new fox
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 px-12 py-2 rounded-md flex items-center disabled:bg-red-300 disabled:opacity-75"
            onClick={(e) => handleDelete(e)}
            disabled={images.length < 1}
          >
            Delete Images
          </button>
        </div>
        <div className="flex gap-4 font-bold justify-center">
          <p>
            Foxes counter: <span className="text-orange-500">{foxCounter}</span>
          </p>
          <p>
            Foxes loaded: <span className="text-green-500">{foxLoad}</span>
          </p>
        </div>
      </div>

      {images.map(({ id, url }) => (
        <div key={id} className="p-4">
          <LazyImage
            src={url}
            onLazyLoad={handleLoad}
            onViewed={handleLoaded}
            width={320}
            height="auto"
            className="rounded bg-gray-700"
          />
        </div>
      ))}
    </main>
  );
}
