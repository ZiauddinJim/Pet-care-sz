import React from 'react';
import MyContainer from '../../MyComponents/MyContainer';
import Marquee from "react-fast-marquee";

const careTips = [
    {
        "title": "Keep water from freezing",
        "description": "Check and refresh outdoor water bowls several times a day. Use insulated or heated bowls if pets spend long periods outside.",
        "image": "https://khpet.com/cdn/shop/articles/How_to_Keep_Your_Dog_s_Water_from_Freezing_1200x800.jpg?v=1699025897"
    },
    {
        "title": "Protect paws from ice and salt",
        "description": "Wipe paws after walks to remove ice, de-icing salts, and chemicals. Consider booties for long walks and regularly trim fur between paw pads.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW-tdznm-32518QuiWkrSffPpCF9caWumF05rRcw2qsx5nLcBZ1ZiFva-I2rAcvzEXJXU&usqp=CAU"
    },
    {
        "title": "Avoid antifreeze exposure",
        "description": "Store antifreeze/automotive fluids securely; even small spills are toxic—clean spills promptly and thoroughly.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhaUWHA0ceblgbSBRTThVd7c6PZoNBJEQRA&s"
    },
    {
        "title": "Adjust food for energy needs",
        "description": "Active outdoor dogs may need a small increase in calories in very cold weather; indoor pets typically maintain normal intake. Consult your vet for exact adjustments.",
        "image": "https://openfarmpet.ca/cdn/shop/articles/Open-Farm-Blog-Post-Photo-Feeding-Your-Active-Pet.jpg?v=1728963919&width=1100"
    },
    {
        "title": "Provide warm, dry bedding",
        "description": "Give pets an elevated, insulated, and draft-free sleeping area away from windows and cold floors. Use washable blankets or pet-safe heated pads if needed.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc96Il9229GppFB5NSICVTlVMLpNLmObWxpA&s"
    }
]

const CareTips = () => {
    return (
        <div className='bg-amber-50'>
            <MyContainer>
                <div className='text-center mx-3'>
                    <h2 className='font-bold text-2xl md:text-3xl lg:text-4xl pt-10 text-primary'>Winter Care Tips for Pets</h2>
                    <p className='text-slate-500 py-5'>Keep your furry friends warm, safe, and happy all season long with these simple yet essential winter care tips.</p>
                </div>
                <div className="w-full py-8 overflow-hidden">
                    <Marquee
                        pauseOnHover={true}
                        speed={40}
                        gradient={false}
                        className="gap-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {careTips.map((data, index) => {
                            const { title, description, image } = data;

                            return (
                                <div
                                    key={index}
                                    className="group flex flex-col md:flex-row items-center bg-white border border-gray-200
                     rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 
                     hover:scale-[1.02] mx-5 max-w-sm md:max-w-lg overflow-hidden"
                                >
                                    <img
                                        className="object-cover w-full md:w-48 h-48 md:h-[260px] rounded-t-2xl md:rounded-l-2xl"
                                        src={image}
                                        alt={title}
                                    />
                                    <div className="flex flex-col justify-between p-4 text-left relative">
                                        <h5 className="mb-2 text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                                            {title}
                                        </h5>

                                        {/* Short description (default) */}
                                        <p
                                            className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-snug transition-opacity duration-300 group-hover:opacity-0"
                                        >
                                            {description.length > 120
                                                ? description.slice(0, 120) + "..."
                                                : description}
                                        </p>

                                        {/* Full description (only visible on hover) */}
                                        <p
                                            className="absolute inset-0 p-4 text-sm md:text-base text-gray-800 dark:text-gray-200 bg-white/90 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-y-auto rounded-2xl"
                                        >
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </Marquee>
                </div>
            </MyContainer>
        </div>
    );
};

export default CareTips;