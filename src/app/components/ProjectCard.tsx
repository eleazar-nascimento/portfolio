'use client'

import { Button, Card, CardBody, CardFooter, Chip, Image } from '@nextui-org/react'
import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '../data/profile'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasLinks = Boolean(project.demo || project.repo)

  return (
    <Card
      className="h-full border border-white/10 bg-zinc-800/60 backdrop-blur"
      radius="lg"
      shadow="sm"
    >
      <CardBody className="gap-4 p-0">
        <div className="relative overflow-hidden">
          <Image
            alt={`Captura de tela do projeto ${project.name}`}
            className="h-[190px] w-full object-cover"
            radius="none"
            src={project.image}
            width="100%"
            isZoomed
          />
          {project.year && (
            <span className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-3 py-1 text-tiny font-semibold text-white">
              {project.year}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 px-5 pt-1">
          <h3 className="font-bold text-xl text-white">{project.name}</h3>
          <p className="font-semibold text-sm text-green-400">{project.tagline}</p>
          <p className="text-sm leading-relaxed text-gray-50/60">
            {project.description}
          </p>

          <div className="mt-1 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Chip
                key={tech}
                className="border-white/10 bg-zinc-900/80 text-gray-50/80"
                size="sm"
                variant="bordered"
              >
                {tech}
              </Chip>
            ))}
          </div>
        </div>
      </CardBody>

      {hasLinks && (
        <CardFooter className="gap-2 px-5 pb-5">
          {project.demo && (
            <Button
              as="a"
              className="font-bold text-zinc-900 bg-green-400"
              endContent={<ExternalLink size={15} />}
              href={project.demo}
              rel="noopener noreferrer"
              size="sm"
              target="_blank"
            >
              Ver online
            </Button>
          )}
          {project.repo && (
            <Button
              as="a"
              className="text-white border-white/30"
              endContent={<Github size={15} />}
              href={project.repo}
              rel="noopener noreferrer"
              size="sm"
              target="_blank"
              variant="bordered"
            >
              Código
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
