import { Box, Layers, Lightbulb } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Box,
      title: 'Spatial Generation',
      description: 'Compose complete interior environments from simple conceptual inputs.',
    },
    {
      icon: Layers,
      title: 'Material Exploration',
      description: 'Study surface interaction, texture, and composition in real time.',
    },
    {
      icon: Lightbulb,
      title: 'Light & Atmosphere',
      description: 'Shape natural and artificial light to define mood and depth.',
    },
  ];

  return (
    <section id="features" className="w-full px-8 md:px-16 py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-20">
          <p className="text-[12px] uppercase tracking-[0.25em] text-[#6C6C6C] mb-8">
            COMING FEATURES
          </p>
          <h2 className="font-playfair text-[42px] md:text-[56px] leading-[1.15] text-[#1A1A1A]">
            Built for Designers,<br />Architects & Creators
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-start">
              <feature.icon 
                className="w-7 h-7 text-[#1A1A1A] mb-6" 
                strokeWidth={1.25}
              />
              <h3 className="text-[19px] text-[#1A1A1A] mb-3 font-medium">
                {feature.title}
              </h3>
              <p className="text-[#6C6C6C] text-[16px] leading-[1.7]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
