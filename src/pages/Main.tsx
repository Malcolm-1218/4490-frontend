import React from "react";
import { FaUniversity } from "react-icons/fa";
import Particles from "react-tsparticles";
import { Link } from "react-router-dom";

export default function Main() {
  const particlesInit = (main: any) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container: any) => {
    console.log(container);
  };
  return (
    <div>
      <header className="h-20 flex items-center absolute z-10">
        <div className="pl-12 text-white flex item-center">
          <Link className="text-3xl font-bold" to="/">Voting Buck</Link>
          <div className="ml-12 pl-12 flex items-center">
            <Link className="ml-12 text-xl font-medium text-opacity-75" to="organizations">
              Organizations
            </Link>
            <Link className="ml-12 text-xl font-medium text-opacity-75" to="individuals">
              Individuals
            </Link>
          </div>
        </div>
      </header>
      <div className="bg-gradient-to-tr from-red-500 to-blue-500 h-screen">
        <Particles
          id="tsparticles"
          className="absolute w-full inset-y-0 left-0"
          options={{
            fullScreen: { enable: false, zIndex: 1000 },
            fpsLimit: 120,
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 100,
                enable: true,
                opacity: 0.3,
                width: 0.3,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 0.1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 200,
              },
              opacity: {
                value: 0.3,
              },
              shape: {
                type: "circle",
              },
              size: {
                random: true,
                value: 3,
              },
            },
            detectRetina: true,
          }}
        />
        <div className="absolute flex flex-col space-y-24 py-48 px-20 inset-y-0 left-0 w-full">
          <div className="flex flex-col space-y-5 max-w-5xl m-auto">
            <p className="text-4xl sm:text-5xl font-medium text-center text-white">View political donation information for organizations and political figures.</p>  
            <p className="text-2xl sm:text-3xl font-light text-center text-white">Research and discover political associations through donation information.</p>
            <div className="flex flex-row space-x-2 justify-center">
              <input type="text" placeholder="Organization or Individual" className="w-72 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring"/>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-24 py-24 px-20">
        <div className="-m-5 flex flex-row flex-wrap justify-center">
          <FaUniversity size="16em"/>
          <div className="flex flex-col space-y-4 w-1/3 ml-10">
            <p className="text-lg font-medium">Highlighted Universities</p>
            <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4">
              <div>
                <p>Harvard University</p>
              </div>
              <div>
                <p>Donated <span className="font-medium">$1,254,332.20</span> in 2021</p>
              </div>
            </div>
            <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4">
              <div>
                <p>Bank of America</p>
              </div>
              <div>
                <p>Employed <span className="font-medium">124</span> Political Contributors</p>
              </div>
            </div>
            <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4">
              <div>
                <p>Lockheed Martin</p>
              </div>
              <div>
                <p>Made <span className="font-medium">1,424</span> Donations in 2021</p>
              </div>
            </div>
          </div>
        </div>
        <div className="-m-5 flex flex-row flex-wrap justify-center">
          <div className="m-5 w-96 relative flex flex-col overflow-hidden bg-white shadow-lg rounded-lg">
            {/*<div className="relative h-40 overflow-hidden">
              <img className="absolute my-auto" src="https://images.unsplash.com/photo-1554469384-e58fac16e23a"></img>
            </div>
            */}<div className="p-8 flex flex-col space-y-3">
              <p className="text-lg font-medium">Organizations</p>
              <p className="font-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
  Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
            </div>
          </div>
          <div className="m-5 w-96 relative flex flex-col overflow-hidden bg-white shadow-lg rounded-lg">
            {/*<img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"></img>
            */}<div className="p-8 flex flex-col space-y-3">
              <p className="text-lg font-medium">Individuals</p>
              <p className="font-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
  Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
