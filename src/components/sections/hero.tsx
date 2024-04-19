import Image from "next/image";

export default function Hero({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <div className="container-sm relative mb-[60px] flex flex-wrap items-center">
      <div className="z-10 w-full max-lg:order-2 md:absolute md:w-7/12 lg:mb-[60px]">
        <h1
          className="left-0 text-[40px] font-bold leading-[46px] text-black md:text-[56px] md:leading-[62px]"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
      <div className="relative w-full overflow-hidden max-lg:order-1 max-lg:mb-[60px] md:ml-auto md:w-8/12">
        <div
          className="relative aspect-[3/2] md:aspect-video md:after:absolute
          md:after:inset-0
          md:after:z-[1]
          md:after:block
          md:after:bg-gradient-to-r
          md:after:from-white
          md:after:to-transparent
          md:after:opacity-75
          md:after:content-['']"
        >
          <Image
            src={image}
            quality={100}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="hero-image"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
