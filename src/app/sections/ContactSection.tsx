import { Github, Mail, Linkedin, PhoneCall } from "lucide-react";

export function ContactSection() {
  return (
    <div className="flex justify-center items-center gap-16 w-full bg-zinc-900 pb-20">
      <div className="flex flex-col gap-1 items-center justify-center text-center">
        <div className="flex items-center justify-center border border-yellow-400 bg-zinc-800 text-green-400 rounded-full w-[50px] h-[50px]">
          <Github className="text-yellow-400 rounded-lg" />
        </div>
        <div className="font-bold text-xl text-white">
          Github
        </div>
        <div className="font-Nunito font-semibold text-gray-50 opacity-50">
          https://github.com/eleazar-nascimento
        </div>
      </div>
      <div className="flex flex-col gap-1 items-center justify-center text-center">
        <div className="flex items-center justify-center border border-yellow-400 bg-zinc-800 text-green-400 rounded-full w-[50px] h-[50px]">
          <Mail className="text-yellow-400 rounded-lg" />
        </div>
        <div className="font-bold text-xl text-white">
          E-Mail
        </div>
        <div className="font-Nunito font-semibold text-gray-50 opacity-50">
          eleazar.nascimento@gmail.com
        </div>
      </div>
      <div className="flex flex-col gap-1 items-center justify-center text-center">
        <div className="flex items-center justify-center border border-yellow-400 bg-zinc-800 text-green-400 rounded-full w-[50px] h-[50px]">
          <Linkedin className="text-yellow-400 rounded-lg" />
        </div>
        <div className="font-bold text-xl text-white">
          Linkedin
        </div>
        <div className="font-Nunito font-semibold text-gray-50 opacity-50">
          https://www.linkedin.com/in/eleazar-da-silva-nascimento-ba033816b
        </div>
      </div>
      <div className="flex flex-col gap-1 items-center justify-center text-center">
        <div className="flex items-center justify-center border border-yellow-400 bg-zinc-800 text-green-400 rounded-full w-[50px] h-[50px]">
          <PhoneCall className="text-yellow-400 rounded-lg" />
        </div>
        <div className="font-bold text-xl text-white">
          Telefone
        </div>
        <div className="font-Nunito font-semibold text-gray-50 opacity-50">
          (027) 9-99733-9162
        </div>
      </div>
    </div>
  )
}