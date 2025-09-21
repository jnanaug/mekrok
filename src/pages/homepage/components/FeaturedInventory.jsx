import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedInventory = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredEquipment = [
    {
      id: 1,
      name: "CAT 320D Hydraulic Excavator",
      manufacturer: "Caterpillar",
      year: 2019,
      hours: 2450,
      condition: "Excellent",
      price: 185000,
      location: "Nevada, USA",
      image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg",
      specifications: {
        weight: "20.5 tons",
        bucketCapacity: "1.2 m³",
        enginePower: "122 kW"
      },
      features: ["GPS Ready", "AC Cabin", "Quick Coupler"],
      availability: "Available Now"
    },
    {
      id: 2,
      name: "Komatsu D65PX Bulldozer",
      manufacturer: "Komatsu",
      year: 2020,
      hours: 1850,
      condition: "Excellent",
      price: 295000,
      location: "Texas, USA",
      image: "https://images.pexels.com/photos/162539/architecture-building-site-build-construction-162539.jpeg",
      specifications: {
        weight: "18.2 tons",
        bladeCapacity: "3.4 m³",
        enginePower: "135 kW"
      },
      features: ["ROPS Cabin", "Ripper", "Auto Blade"],
      availability: "Available Now"
    },
    {
      id: 3,
      name: "Volvo L120H Wheel Loader",
      manufacturer: "Volvo",
      year: 2021,
      hours: 980,
      condition: "Like New",
      price: 225000,
      location: "Arizona, USA",
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
      specifications: {
        weight: "16.8 tons",
        bucketCapacity: "2.3 m³",
        enginePower: "197 kW"
      },
      features: ["Load Sensing", "Comfort Cab", "Joystick Control"],
      availability: "Available Now"
    },
    {
      id: 4,
      name: "Liebherr R936 Excavator",
      manufacturer: "Liebherr",
      year: 2018,
      hours: 3200,
      condition: "Good",
      price: 165000,
      location: "Colorado, USA",
      image: "https://images.pexels.com/photos/1108102/pexels-photo-1108102.jpeg",
      specifications: {
        weight: "36.5 tons",
        bucketCapacity: "1.8 m³",
        enginePower: "200 kW"
      },
      features: ["Hydraulic Thumb", "Climate Control", "LED Lights"],
      availability: "Available Now"
    },
    {
      id: 5,
      name: "Hitachi ZX350LC Excavator",
      manufacturer: "Hitachi",
      year: 2020,
      hours: 1650,
      condition: "Excellent",
      price: 210000,
      location: "Utah, USA",
      image: "https://images.pexels.com/photos/1108103/pexels-photo-1108103.jpeg",
      specifications: {
        weight: "35.2 tons",
        bucketCapacity: "1.7 m³",
        enginePower: "190 kW"
      },
      features: ["Eco Mode", "Advanced Display", "Auto Idle"],
      availability: "Available Now"
    },
    {
      id: 6,
      name: "John Deere 850K Crawler Dozer",
      manufacturer: "John Deere",
      year: 2019,
      hours: 2100,
      condition: "Good",
      price: 275000,
      location: "Montana, USA",
      image: "https://images.pexels.com/photos/1108104/pexels-photo-1108104.jpeg",
      specifications: {
        weight: "19.8 tons",
        bladeCapacity: "3.1 m³",
        enginePower: "130 kW"
      },
      features: ["6-Way Blade", "ROPS/FOPS", "Undercarriage Guard"],
      availability: "Available Now"
    }
  ];

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(featuredEquipment?.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentItems = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return featuredEquipment?.slice(startIndex, startIndex + itemsPerSlide);
  };

  const getConditionColor = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'excellent': case'like new':
        return 'text-success bg-success/10';
      case 'good':
        return 'text-primary bg-primary/10';
      case 'fair':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Featured Equipment Inventory
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover our handpicked selection of premium mining equipment, ready for immediate deployment with detailed condition reports and transparent pricing.
          </p>
          
          <Link to="/product-listing">
            <Button
              variant="outline"
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={16}
            >
              View All Equipment
            </Button>
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-border items-center justify-center text-foreground hover:bg-muted transition-colors duration-300"
            disabled={currentSlide === 0}
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-border items-center justify-center text-foreground hover:bg-muted transition-colors duration-300"
            disabled={currentSlide === totalSlides - 1}
          >
            <Icon name="ChevronRight" size={20} />
          </button>

          {/* Equipment Cards */}
          <div className="mx-0 md:mx-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getCurrentItems()?.map((equipment, idx) => (
                <motion.div
                  key={equipment?.id}
                  className="bg-white rounded-xl border border-border shadow-card hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  {/* Equipment Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={equipment?.image}
                      alt={equipment?.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Condition Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getConditionColor(equipment?.condition)}`}>
                      {equipment?.condition}
                    </div>
                    
                    {/* Availability Badge */}
                    <div className="absolute top-4 right-4 bg-success text-white px-3 py-1 rounded-full text-xs font-medium">
                      {equipment?.availability}
                    </div>
                  </div>

                  {/* Equipment Details */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
                        {equipment?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {equipment?.manufacturer} • {equipment?.year} • {equipment?.hours?.toLocaleString()} hrs
                      </p>
                    </div>

                    {/* Key Specifications */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                      <div className="bg-muted/50 rounded-lg p-2">
                        <div className="text-muted-foreground">Weight</div>
                        <div className="font-medium text-foreground">{equipment?.specifications?.weight}</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-2">
                        <div className="text-muted-foreground">Power</div>
                        <div className="font-medium text-foreground">{equipment?.specifications?.enginePower}</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {equipment?.features?.slice(0, 2)?.map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md"
                          >
                            {feature}
                          </span>
                        ))}
                        {equipment?.features?.length > 2 && (
                          <span className="text-xs text-muted-foreground px-2 py-1">
                            +{equipment?.features?.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price and Location */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          ${equipment?.price?.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Icon name="MapPin" size={12} className="mr-1" />
                          {equipment?.location}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div className="flex flex-col sm:flex-row gap-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                      <Link to={`/product-details?id=${equipment?.id}`} className="w-full sm:flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          fullWidth
                          iconName="Eye"
                          iconPosition="left"
                          iconSize={14}
                        >
                          View Details
                        </Button>
                      </Link>
                      
                      <Link to={`/quote-request-form?equipment=${equipment?.id}`} className="w-full sm:flex-1">
                        <Button
                          variant="default"
                          size="sm"
                          fullWidth
                          iconName="MessageSquare"
                          iconPosition="left"
                          iconSize={14}
                        >
                          Request Quote
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides })?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentSlide ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedInventory;