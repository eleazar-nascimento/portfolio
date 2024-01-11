import CardProject from "../components/Card";

export function ProjectSection() {
  return(
    <div className="flex flex-col gap-4 items-center justify-center py-60 w-full bg-zinc-900">
      <div className="flex flex-col gap-3 text-center">
        <div className="font-extrabold text-5xl text-white">Projetos</div>
        <div className="font-semibold text-base text-gray-50 opacity-50">Veja Alguns de meus projetos</div>
      </div>
      <CardProject />
    </div>
  )
}