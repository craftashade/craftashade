import React from "react";
import { maybeIllustration, slugify } from "../lib/helpers"
import Features from "./Features"
import CTA from "./cta";
import { SRLWrapper } from "simple-react-lightbox";
import { Link } from "gatsby"

const projectsToShow = ["Landed", "Condo", "HDB", "Others"]

export default function Project({ data }) {
  const cta = data.frontpage._rawContent.find(c => c._type === 'ctaPlug')
  const features = data.frontpage._rawContent.find(c => c._type === 'features')
  return (
    <div className="font-body">
      <div className="container mx-auto lg:w-5/6 w-11/12 mx-auto">
        <div className="my-8 text-gray-400 text-sm">
          <Link to="/">Home</Link>&nbsp;>&nbsp;<span className="font-semibold">Projects</span>
        </div>
        <div className="flex flex-row">
          {projectsToShow.map(proj => {
            const project = data.projects.nodes.find(p => p.title === proj)
            if (!project) return null
            const btnClass = 'py-4 px-6 rounded-2xl font-bold text-sm mr-4'
            if (proj === data.project.title) {
              return <div className={`bg-airbnb text-white ${btnClass}`}>{proj}</div>
            } else {
              return <a href={`/projects/${slugify(proj)}`} className={`bg-light-grey text-cas hover:bg-white ${btnClass}`}>{proj}</a>
            }
          })}
        </div>
        <SRLWrapper>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-10">
            {data.project._rawImages && data.project._rawImages.map(i => {
                const img = maybeIllustration(i)
                return <a href={i.image.asset.url} className="">
                  <img src={i.image.asset.url} alt={i.image.alt} className="w-full mx-auto rounded-3xl overflow-hidden object-cover h-32 lg:h-64" />
                </a>
              })}
          </div>
        </SRLWrapper>
      </div>
      <CTA {...cta} />
      <Features {...features} />
    </div>
  );
}
