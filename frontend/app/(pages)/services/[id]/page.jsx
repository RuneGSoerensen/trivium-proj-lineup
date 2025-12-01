import Link from 'next/link'

export default function ServicePage({ params }) {
  const id = params?.id ?? '1'

  // Minimal hardcoded dataset for the two sample services
  const data = {
    '1': {
      provider: 'LunaVisuals',
      tag: '#art',
      title: 'Custom visuals for your next release',
      description:
        'Album covers, tour posters, and stage visuals crafted to reflect your sound and style. Work directly with an artist experienced in branding for musicians. I create designs tailored to your music and message — from initial sketches to final print-ready assets.',
      location: 'Odense',
      pricing: 'Starting from 150 DKK per hour, but depending on the order I am happy to be flexible.'
    },
    '2': {
      provider: 'EchoLab Studios',
      tag: '#recording',
      title: 'Full-service recording and mixing',
      description:
        'Professional recording, mixing and mastering. We provide a comfortable live room, experienced engineers and a selection of vintage microphones and outboard gear. Ideal for bands and solo artists wanting a polished release.',
      location: 'Copenhagen',
      pricing: 'Contact for hourly and package rates.'
    }
  }

  const service = data[id] ?? data['1']

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <div className="mb-4 text-sm text-gray-600">
        <Link href="/services" className="underline">Services</Link>
        <span className="px-2">/</span>
        <span>{service.title}</span>
      </div>

      <header className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium">{service.provider[0]}</div>
        <div>
          <div className="text-sm text-gray-600">{service.provider} offers <span className="font-medium">{service.tag}</span></div>
          <h1 className="text-2xl font-semibold mt-2">{service.title}</h1>
        </div>
        <div className="ml-auto"></div>
      </header>

      <div className="rounded-xl overflow-hidden mb-6 h-64 bg-gradient-to-br from-gray-300 to-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600">
        ON-THE-GO
      </div>

      <p className="text-gray-700 mb-6">{service.description}</p>

      <div className="flex items-center gap-4 mb-6">
        <button className="bg-amber-400 text-black px-4 py-2 rounded-full font-medium">Start a chat</button>
        <div className="text-sm text-gray-600">Location: <span className="font-medium text-gray-800">{service.location}</span></div>
      </div>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Pricing</h3>
        <p className="text-gray-700">{service.pricing}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Reviews</h3>
        <p className="text-gray-600">"She made amazing poster for us, love the style."</p>
      </section>
    </main>
  )
}
