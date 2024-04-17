export default function Paragraph({ text }: { text: string }) {
  return (
    <div className="container-sm mb-[60px]">
      <div className="mx-auto md:max-w-[66.666%]">
        <p className="tracking-wider text-secondary-text">{text}</p>
      </div>
    </div>
  );
}
