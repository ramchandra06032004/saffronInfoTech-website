"use client";
import { Button } from "@/components/ui/button";
import "../../style/homepage.css";
import heroImage from "../../assets/CEO.jpg";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="homePage-container text-center">
        <h1 className="text-5xl font-bold heroLine">
          Empowering a sustainable future with clean, efficient solar energy solutions for a greener & brighter tomorrow.
        </h1>
      </div>
      <div className="homePage-container flex flex-wrap justify-center md:justify-between items-center">
        <div className="w-full md:w-1/3 p-4">
          <img src={heroImage.src} alt="Image" className="rounded-md w-full" />
        </div>
        <div className="vision w-full md:w-1/2  text-center">
          <h2 className="text-4xl font-bold mb-2">Our Vision</h2>
          <p className="text-lg">
            Our vision is to make renewable energy the go-to choice for
            everyone. We see a future where clean, sustainable energy powers our
            homes and businesses, reducing pollution and protecting the
            environment. Our goal is to lead this change by creating simple and
            affordable renewable solutions that anyone can use. By tapping into
            the natural power of the sun, wind, and other resources, we want to
            make energy cleaner and greener for everyone, ensuring a better
            world for generations ahead. Join us in bringing renewable energy to
            rural areas. Together, we can light up homes, power businesses, and
            strengthen communities. By harnessing the sun and wind, we're
            creating a brighter future for everyone. Let's make clean energy
            accessible to all.
          </p>
          <p className="font-bold mt-3">
            Ramchandra Mulik <br />
            Managing Director
          </p>
        </div>
      </div>
    </div>
  );
}