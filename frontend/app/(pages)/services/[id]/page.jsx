
import Image from 'next/image'
import { Bookmark, MessageCircleMore, Star} from 'lucide-react'
import { Button} from '@/components/ui/Button/Button'

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
      pricing: 'Starting from 150 DKK per hour, but depending on the order I am happy to be flexible.',
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROw1upqPjzbLnyLZuMHMKLhnny7-8tQr08Ew&s"
    },
    '2': {
      provider: 'EchoLab Studios',
      tag: '#recording',
      title: 'Full-service recording and mixing',
      description:
        'Professional recording, mixing and mastering. We provide a comfortable live room, experienced engineers and a selection of vintage microphones and outboard gear. Ideal for bands and solo artists wanting a polished release.',
      location: 'Copenhagen',
      pricing: 'Contact for hourly and package rates.',
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROw1upqPjzbLnyLZuMHMKLhnny7-8tQr08Ew&s"
    }
  }

  const service = data[id] ?? data['1']

  return (
    <main className="p-6 max-w-3xl mx-auto">

      <header className=" flex flex-col gap-4">

              <div className="flex gap-10 items-center mb-16">
                <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-light ">
                  {service .provider[0]}
                </div>
                <div className="text-gray-600 text-lg">
                  {service.provider} offers{" "}
                  <span className="font-medium">{service.tag}</span>
                </div>
                <div className="ml-auto">
                  <Bookmark />
                </div>
              </div>
              
      </header>
       <h3 className="text-lg font-semibold mb-6 ">{service.title}</h3>

                <Image
                  src={service.image_url}
                  alt={service.title}
                  width={500}
                  height={200}
                  className="rounded-[24] overflow-hidden mb-3 self-center "
                ></Image>
      <p className="text-gray-700 mb-6">{service.description}</p>

      <div className="flex items-center gap-4 mb-6">
        <Button className="rounded-full !px-8 !py-6 border border-muted" size="md">
          <div className="flex items-center gap-2">
          <MessageCircleMore size={20} strokeWidth={2}/> Start a chat</div>
        </Button>
      </div>
      <div className='flex flex-col gap-16'>
   <div className='flex gap-4'>
    <p className=" font-semibold">Location:</p> 
    <p className=" text-normal">{service.location}</p>
    </div>
     
      <section className="mb-6 flex flex-col gap-8">
        <h3 className=" font-semibold mb-2">Pricing</h3>
        <p className="text-gray-700">{service.pricing}</p>
      </section>

      <section className="mb-6 flex flex-col gap-8">
        <h3 className="font-semibold mb-2">Reviews</h3>
        <div className='flex gap-8 '>
        <Star fill="var(--color-primary)" stroke='var(--color-primary)' size={20}/>
          <Star fill="var(--color-primary)" stroke='var(--color-primary)' size={20}/>
            <Star fill="var(--color-primary)" stroke='var(--color-primary)' size={20}/>
              <Star fill="var(--color-primary)" stroke='var(--color-primary)' size={20}/>
                <Star fill="var(--color-primary)" stroke='var(--color-primary)' size={20}/>
                <p className='text-sm text-gray-600'>36 reviews</p>
        </div>
        <p className="text-gray-600">"She made amazing poster for us, love the style."</p>
      </section>
      <p className='text-muted'>See more</p>
      </div>
    </main>
  )
}
