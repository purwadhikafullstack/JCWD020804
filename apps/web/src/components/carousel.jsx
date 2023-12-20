import { Carousel, IconButton } from "@material-tailwind/react";
 
export function CarouselCustomArrows() {
  return (
    <Carousel
      className="rounded-xl"
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
    >
      <img
        src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/0e/14/31/the-gaia-hotel-bandung.jpg?w=1200&h=-1&s=1"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="https://pix8.agoda.net/hotelImages/73546/-1/810eddb234f933a8fa955dd4b6873e78.jpg?ca=8&ce=1&s=1024x768"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://www.kayak.co.id/rimg/himg/b9/47/63/ice-202374-100540302-139629.jpg?width=968&height=607&crop=true"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}