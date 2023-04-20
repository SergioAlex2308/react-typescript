type Props = { image: string };

export const RandomFox = ({ image }: Props): JSX.Element => {
  return (
    <img src={image} width={320} height="auto" className="rounded" />
  );
};
