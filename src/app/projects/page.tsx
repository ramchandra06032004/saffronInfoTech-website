import React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import Image1P1 from "../../../assets/Projects/project1/i1p1.jpg";
import Image2P1 from "../../../assets/Projects/project1/i2p1.jpg";
import Image3P1 from "../../../assets/Projects/project1/i3p1.jpg";
import Image4P1 from "../../../assets/Projects/project1/i4p1.jpg";
import Image5P1 from "../../../assets/Projects/project1/i5p1.jpg";
import Image6P1 from "../../../assets/Projects/project1/i6p1.jpg";
import Image7P1 from "../../../assets/Projects/project1/i7p1.jpg";

import Image1P2 from "../../../assets/Projects/project2/i1p2.jpg";
import Image2P2 from "../../../assets/Projects/project2/i2p2.jpg";

import Image1P3 from "../../../assets/Projects/project3/i1p3.jpg";
import Image2P3 from "../../../assets/Projects/project3/i2p3.jpg";
import Image3P3 from "../../../assets/Projects/project3/i3p3.jpg";
import Image4P3 from "../../../assets/Projects/project3/i4p3.jpg";
import Image5P3 from "../../../assets/Projects/project3/i5p3.jpg";
import Image6P3 from "../../../assets/Projects/project3/i6p3.jpg";
import Image7P3 from "../../../assets/Projects/project3/i7p3.jpg";
import Image8P3 from "../../../assets/Projects/project3/i8p3.jpg";
import Image9P3 from "../../../assets/Projects/project3/i9p3.jpg";

import Image1P4 from "../../../assets/Projects/project4/i1p4.jpg";
import Image2P4 from "../../../assets/Projects/project4/i2p4.jpg";
import Image3P4 from "../../../assets/Projects/project4/i3p4.jpg";
import Image4P4 from "../../../assets/Projects/project4/i4p4.jpg";
import Image5P4 from "../../../assets/Projects/project4/i5p4.jpg";
import Image6P4 from "../../../assets/Projects/project4/i6p4.jpg";

const projects = [
  {
    images: [
      { src: Image1P1, alt: "Image 1 project 1" },
      { src: Image2P1, alt: "Image 2 project 1" },
      { src: Image3P1, alt: "Image 3 project 1" },
      { src: Image4P1, alt: "Image 4 project 1" },
      { src: Image5P1, alt: "Image 5 project 1" },
      { src: Image6P1, alt: "Image 6 project 1" },
      { src: Image7P1, alt: "Image 7 project 1" },
    ],
    siteName: "Project Site 1",
    address: "123 Solar St, Sun City",
    date: "2023-01-01",
  },
  {
    images: [
      { src: Image1P2, alt: "Image 1 project 2" },
      { src: Image2P2, alt: "Image 2 project 2" },
    ],
    siteName: "Project Site 2",
    address: "456 Renewable Rd, Green Town",
    date: "2023-02-01",
  },
  {
    images: [
      { src: Image1P3, alt: "Image 1 project 3" },
      { src: Image2P3, alt: "Image 2 project 3" },
      { src: Image3P3, alt: "Image 3 project 3" },
      { src: Image4P3, alt: "Image 4 project 3" },
      { src: Image5P3, alt: "Image 5 project 3" },
      { src: Image6P3, alt: "Image 6 project 3" },
      { src: Image7P3, alt: "Image 7 project 3" },
      { src: Image8P3, alt: "Image 8 project 3" },
      { src: Image9P3, alt: "Image 9 project 3" },
    ],
    siteName: "Project Site 3",
    address: "789 Eco Ave, Sustainable City",
    date: "2023-03-01",
  },
  {
    images: [
      { src: Image1P4, alt: "Image 1 project 4" },
      { src: Image2P4, alt: "Image 2 project 4" },
      { src: Image3P4, alt: "Image 3 project 4" },
      { src: Image4P4, alt: "Image 4 project 4" },
      { src: Image5P4, alt: "Image 5 project 4" },
      { src: Image6P4, alt: "Image 6 project 4" },
    ],
    siteName: "Project Site 4",
    address: "101 Solar Blvd, Sunville",
    date: "2023-04-01",
  },
];

const ProjectsPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Projects</h1>
      <div className="flex flex-col gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{project.siteName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-2">{project.address}</p>
              <p className="text-gray-400 mb-4">{new Date(project.date).toLocaleDateString()}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                {project.images.map((image, imgIndex) => (
                  <Image key={imgIndex} src={image.src} alt={image.alt} className="rounded-lg w-1/4 " />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;