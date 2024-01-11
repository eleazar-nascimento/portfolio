import { Button, Image } from "@nextui-org/react";
import { Download } from "lucide-react";

export function HeroSection() {
  return (
    <div className="flex flex-col-reverse gap-4 items-center justify-between w-full p-10 sm:py-40 sm:flex-row sm:w-[980px]">
      <div className="flex flex-col gap-4">
        <div className="font-bold text-3xl sm:text-5xl text-center sm:text-left">Olá, eu sou <br/> Eleazar Nascimento</div>
        <div className="font-semibold text-zinc-900 opacity-50 text-center sm:text-medium sm:text-left">Desenvolvedor de Software Javascript</div>
        <div className="font-semibold text-zinc-900 text-sm text-center sm:text-medium sm:text-left">Sou apaixonado por Tecnolgia, amo dar vida a ideias que se <br/> tornam produtos propostos pelas empresas/clientes.</div>
        <div className="flex gap-3 w-full justify-center sm:justify-start">
          <Button className="flex items-center text-sm font-bold text-zinc-900 bg-green-400 w-36" variant="bordered">
            <div>
              Ver Currículo
            </div>
            <div>
            <Download size={15} />
            </div>
          </Button>
          <Button className="hover:bg-zinc-100 w-40" variant="bordered">
            Entre em contato
          </Button>
        </div>
      </div>
      <div className="">
      <Image
        alt="Foto de Eleazar"
        className="sm:h-[500px] sm:w-[500px] object-cover"
        height={300}
        src="/images/image.png"
        width={300}
        isBlurred
        isZoomed
      />
      </div>
    </div>
  )
}