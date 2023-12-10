import Pokedex from "@/app/components/pokedex"

export default function GenPage({ params }: { params: { slug: string } }) {
  
  return (
    <>
      <h1>Generation {params.slug}</h1>
      {/* <VersionGroups slug={params.slug} /> */}
      <Pokedex slug={params.slug} />
    </>
  )
}