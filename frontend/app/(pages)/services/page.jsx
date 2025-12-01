import Link from 'next/link'

export default function Page() {
    const services = [
        {
            id: '1',
            provider: 'LunaVisuals',
            tag: '#art',
            title: 'Custom visuals for your next release',
            excerpt:
                'Album covers, tour posters, and stage visuals crafted to reflect your sound and style. Work directly with an artist experienced in branding for musicians.',
            location: 'Aarhus',
            time: '4h ago'
        },
        {
            id: '2',
            provider: 'EchoLab Studios',
            tag: '#recording',
            title: 'Full-service recording and mixing',
            excerpt:
                'Studio sessions, mixing and mastering by engineers who have worked with indie and electronic acts. Fully equipped live room and vintage gear.',
            location: 'Odense',
            time: '1d ago'
        }
    ]

    return (
        <main className="p-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <h1 className="text-2xl font-semibold">Services</h1>
                <div className="ml-auto flex gap-3 items-center">
                    <input
                        className="border rounded-lg px-3 py-2 text-sm w-56"
                        placeholder="Search"
                    />
                    <button className="text-sm text-gray-600">Filter</button>
                </div>
            </div>

            <div className="space-y-5">
                {services.map((s) => (
                    <article
                        key={s.id}
                        className="bg-white border rounded-xl shadow-sm overflow-hidden"
                    >
                        <Link href={`/services/${s.id}`} className="block p-4">
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">{s.provider[0]}</div>
                                        <div className="text-sm text-gray-600">{s.provider} offers <span className="font-medium">{s.tag}</span></div>
                                    </div>

                                    <h3 className="text-lg font-semibold mb-3">{s.title}</h3>

                                    <div className="rounded-lg overflow-hidden mb-3 h-44 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-2xl font-bold text-gray-600">
                                        ON-THE-GO
                                    </div>

                                    <p className="text-sm text-gray-700 line-clamp-3">{s.excerpt}</p>
                                </div>

                                <div className="w-36 text-right text-xs text-gray-500">
                                    <div className="mb-2">Read more</div>
                                    <div className="text-xs">{s.location} · {s.time}</div>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </main>
    )
}