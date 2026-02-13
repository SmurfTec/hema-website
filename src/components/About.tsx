import Image from "next/image";

export function About() {
  return (
    <section id="about" className="w-full px-8 md:px-16 py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
          <div>
            <h2 className="font-playfair text-[42px] md:text-[56px] leading-[1.1] text-[#1A1A1A] mb-8">
              Reimagining <br /> Interior Design
            </h2>

            <div className="space-y-6 text-[#6C6C6C] text-base md:text-[17px] leading-[1.7]">
              <p>
                Hema bridges imagination and realization, offering architects
                and designers a refined digital workspace to explore spatial
                possibilities.
              </p>

              <p>
                The platform understands the nuances of proportion, material,
                and light — enabling environments that respect both aesthetic
                vision and architectural integrity.
              </p>

              <p>
                From early concept to detailed visualization, Hema supports a
                thoughtful and intelligent design dialogue.
              </p>
            </div>
          </div>

          <div className="w-full">
            <div className="bg-white border border-[#E5E3DE] rounded-[8px] p-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <Image
                src="/images/platform-interface.png"
                alt="Hema platform interface"
                width={1200}
                height={800}
                className="w-full h-auto rounded-[6px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
