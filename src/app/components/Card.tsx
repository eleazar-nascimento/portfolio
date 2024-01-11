import React from "react";
import {Card, CardFooter, Image, Button} from "@nextui-org/react";

export default function CardProject() {
  const list = [
    {
      image: '/images/image.png',
      name: 'Ecommerce',
      link: '/'
    },
    {
      image: '/images/image.png',
      name: 'Ecommerce',
      link: '/'
    },
    {
      image: '/images/image.png',
      name: 'Ecommerce',
      link: '/'
    },
    {
      image: '/images/image.png',
      name: 'Ecommerce',
      link: '/'
    }
  ]

  return (
    <div  className="gap-4 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none rounded-[50px]"
          key={index}
        >
        <Image
          alt="Woman listing to music"
          className="object-cover"
          height={400}
          src={item.image}
          width={400}
          isBlurred
          isZoomed
          />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-white/80">{item.name}</p>
          <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
            Visitar Projeto
          </Button>
        </CardFooter>
      </Card>
      ))}
    </div>
  );
}
