export default function Video(props: { src: string; className?: string }) {
  return (
    <video
      className={props.className}
      src={props.src}
      autoPlay
      loop
      playsInline
      muted
    />
  );
}
