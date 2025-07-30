import Image from "next/image"

export default function AboutPage() {
  // Add cache-busting timestamp to prevent 304 responses
  const cacheBustingSrc = `/images/about/IMG_9118.PNG?t=${Date.now()}`

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Photo */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-sm">
              <Image src={cacheBustingSrc} alt="Photographer portrait" fill className="object-cover" />
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-light tracking-wide text-foreground">About</h1>

              <div className="space-y-4 text-muted-foreground font-light leading-relaxed">
                <p>
                  I am a passionate photographer and videographer based in Maharashtra, India, with over 3+ years of experience behind the lens. 
                </p>
                <p>
                  My journey into visual story telling started on the vibrant stages on professional theatres and plays, 
                  where I first learned how to capture emotion, light and movement in real time. 
                  Over the years I have worked on a various genres like - from treatrical performances to portrairts, art photography, concert shoot, food and product photography. 
                  I consider myself a mid level professional who is constantly evolving and exploring new perspectives. 
                  I aim to tell stories that resonate and are often inspired by everyday moments that go unnoticed. 
                
                </p>
                <p>
                  Lets create something together. 
                </p>
              </div>

              {/* <div className="pt-6">
                <h3 className="text-lg font-light text-foreground mb-3">Specialties</h3>
                <ul className="space-y-2 text-muted-foreground font-light">
                  <li>• Wedding & Event Photography</li>
                  <li>• Concert & Live Performance</li>
                  <li>• Portrait & Lifestyle</li>
                  <li>• Commercial & Brand</li>
                  <li>• Fine Art & Creative</li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
