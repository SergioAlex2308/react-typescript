import { Inter } from "next/font/google";
import { RandomFox } from "@/components/RandomFox";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const random = () => Math.floor(Math.random() * 123) + 1;

// Generate simple unique id
const generateId = () => Math.random().toString(36).substr(2, 9);

type ImageItem = { id: string; url: string };

export default function Home() {
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: generateId(),
      url: `https://randomfox.ca/images/${random()}.jpg`,
    },
    {
      id: generateId(),
      url: `https://randomfox.ca/images/${random()}.jpg`,
    },
    {
      id: generateId(),
      url: `https://randomfox.ca/images/${random()}.jpg`,
    },
    {
      id: generateId(),
      url: `https://randomfox.ca/images/${random()}.jpg`,
    },
    {
      id: generateId(),
      url: `https://randomfox.ca/images/${random()}.jpg`,
    },
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gradient-conic">
      <h1 className="fixed font-bold left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Curso React TypeScript
      </h1>
      {images.map(({ id, url }) => (
        <div key={id} className="p-4">
          <RandomFox image={url} />
        </div>
      ))}
    </main>
  );
}
