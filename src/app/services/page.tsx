"use client";
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import SolarEPCImage from '../../../assets/solarEPC.jpg'
import Electrical_Turnkey_Solutions from "../../../assets/Electrical Turnkey Solutions.jpg"
import Electrical_Consultancy from "../../../assets/Electrical Consultancy.jpg"
import MaintenanceImage from "../../../assets/Maintain.jpg"


const services = [
  {
    title:'Solar Power Plant Maintenance',
    description:'Keep your solar power plant running at peak performance with our comprehensive maintenance services, including Regular Cleaning to ensure maximum energy output. Routine Checks for system efficiency and safety. Quick Support in case of failures or downtime, ensuring minimal disruption to your operations.',
    Image:MaintenanceImage.src
  },
  {
    title: 'Roof Top Solar EPC',
    description: 'Harness the power of the sun with our comprehensive Engineering, Procurement, and Construction (EPC) solutions for rooftop solar systems. From design to installation and commissioning, we ensure a seamless transition to clean and sustainable energy.',
    Image: SolarEPCImage.src
  },
  {
    title: 'Electrical Turnkey Solutions',
    description: 'Simplify your projects with our end-to-end electrical turnkey solutions. From designing and procurement to installation and commissioning, we handle every aspect to deliver fully operational and efficient electrical systems.',
    Image: Electrical_Turnkey_Solutions.src
  },
  {
    title: 'Electrical Consultancy',
    description: 'Leverage our expertise with our electrical consultancy services. We provide expert guidance in system design, energy optimization, and compliance with industry standards to ensure your project is cost-effective, safe, and reliable.',
    Image: Electrical_Consultancy.src
  },
];

const ServicesPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Services</h1>
      <div className="flex flex-col gap-8 justify-center items-center">
        {services.map((service, index) => (
          <Card key={index} className="shadow-lg w-2/4">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
            </CardHeader>
            
            <CardContent className='flex justify-center'>
              <img src={service.Image} alt="" className='h-1/3 w-2/4 rounded-lg'/>
              
            </CardContent>

            <CardContent>
              <p>{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;