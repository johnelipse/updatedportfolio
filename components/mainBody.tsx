"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { Download, Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import SparklesText from "./ui/sparkles-text";
import PortfolioCards from "./portfolioCards";
import EmailForm from "./email-form";

type SkillBarProps = {
  skill: string;
  percentage: number;
};

const SkillBar: React.FC<SkillBarProps> = ({ skill, percentage }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start({
        width: `${percentage}%`,
        transition: { duration: 1, ease: "easeInOut" },
      });
    }
  }, [controls, inView, percentage]);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-white">{skill}</span>
        <span className="text-sm font-medium text-white">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <motion.div
          ref={ref}
          initial={{ width: 0 }}
          animate={controls}
          className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2.5 rounded-full"
        ></motion.div>
      </div>
    </div>
  );
};

export default function EnhancedMainContent() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Fullstack Developer";
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prevText) => prevText + fullText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      // Reset after the text is fully typed out
      const resetTimeout = setTimeout(() => {
        setTypedText("");
        setCurrentIndex(0);
      }, 2000); // 2 seconds delay before restarting
      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex, fullText]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white w-[99%]">
      {/* Hero Section */}
      <section className="py-4 md:py-6 lg:py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp}>
            <SparklesText
              className="lg:text-[2.5rem] md:text-[2.5rem] mb-4 font"
              text="Hello, I am Banyweire John"
            />
            <h2 className="text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 mb-4">
              {typedText}
              <span className="animate-blink">|</span>
            </h2>
            <p className="text-gray-300 mb-8">
              I am a fullstack developer at Desishub experienced in HTML, CSS,
              JavaScript, Next.js, and more. Mastering both front-end and
              back-end to turn ideas into seamless digital realities! 🎨💻🚀
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/CV Resume copy.pdf"
                download
                className="group relative inline-flex items-center overflow-hidden rounded bg-emerald-500 lg:px-8 md:px-8 px-4 lg:py-3 md:py-3 py-2 text-white focus:outline-none focus:ring active:bg-emerald-600"
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <Download className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium transition-all group-hover:me-4">
                  Download CV
                </span>
              </Link>
              <Link
                href="#portfolio"
                className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-white focus:outline-none focus:ring active:text-white"
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <svg
                    className="h-5 w-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <span className="text-sm font-medium transition-all group-hover:me-4">
                  My Projects
                </span>
              </Link>
            </div>
          </motion.div>
          <motion.div {...fadeInUp} className="relative">
            <Image
              src="/john.png"
              alt="Banyweire John"
              width={400}
              height={400}
              className="rounded-full mx-auto z-50"
            />
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-4 md:py-6 lg:py-8 max-w-7xl mx-auto">
        <motion.div {...fadeInUp}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            About Me
          </h2>
          <p className="text-gray-300 mb-8 text-center max-w-3xl mx-auto">
            As a versatile Fullstack Developer and Graphics Designer, I leverage
            my expertise in HTML, CSS, JavaScript, and design tools to craft
            immersive digital experiences. With a keen eye for detail and a
            passion for innovation, I excel in translating complex ideas into
            intuitive user interfaces and visually captivating designs.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="#contact-me"
              className="group relative inline-flex items-center overflow-hidden rounded bg-emerald-500 px-8 py-3 text-white focus:outline-none focus:ring active:bg-emerald-600"
            >
              <span className="absolute -end-full transition-all group-hover:end-4">
                <Mail className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium transition-all group-hover:me-4">
                Contact Me
              </span>
            </Link>
            <Link
              href="#portfolio"
              className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-white focus:outline-none focus:ring active:text-white"
            >
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg
                  className="h-5 w-5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <span className="text-sm font-medium transition-all group-hover:me-4">
                Projects
              </span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className="py-4 md:py-6 lg:py-8 max-w-7xl mx-auto"
      >
        <motion.div {...fadeInUp}>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              My Projects
            </h2>
            <span>
              <Link
                className="text-center flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500"
                href="/all-projects"
              >
                See All
                <ChevronRight className="w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500" />
              </Link>
            </span>
          </div>
          <PortfolioCards />
        </motion.div>
      </section>

      {/* Education & Skills Section */}
      <section className="py-4 md:py-6 lg:py-8 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-800 rounded-lg shadow-2xl">
        <motion.div {...fadeInUp}>
          <h2 className="text-3xl sm:text-4xl font-bold lg:mb-8 md:mb-8 mb-3 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            Education & Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-12 md:gap-12 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-emerald-400">
                Education
              </h3>
              <motion.div
                className="space-y-4"
                variants={staggerChildren}
                initial="initial"
                animate="animate"
              >
                {[
                  {
                    year: "2024",
                    title: "Web Development",
                    institution: "DesisHub",
                  },
                  {
                    year: "2024",
                    title: "Graphics Designing",
                    institution: "DesisHub",
                  },
                ].map((edu, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-700 px-4 lg:py-4 md:py-4 py-2 rounded-lg"
                    variants={fadeInUp}
                  >
                    <span className="text-emerald-400 font-semibold">
                      {edu.year}
                    </span>
                    <h4 className="text-xl font-semibold">{edu.title}</h4>
                    <p className="text-gray-300">{edu.institution}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-emerald-400">
                Skills
              </h3>
              <motion.div
                className="space-y-4"
                variants={staggerChildren}
                initial="initial"
                animate="animate"
              >
                <SkillBar skill="HTML5" percentage={95} />
                <SkillBar skill="CSS" percentage={90} />
                <SkillBar skill="JavaScript" percentage={85} />
                <SkillBar skill="Canva" percentage={80} />
                <SkillBar skill="VSDC" percentage={75} />
                <SkillBar skill="Adobe Express" percentage={70} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-4 md:py-6 lg:py-8  max-w-7xl mx-auto">
        <motion.div {...fadeInUp}>
          <h2 className="text-3xl sm:text-4xl font-bold lg:mb-8 md:mb-8 mb-3 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            What I Do?
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {[
              {
                title: "Web Development",
                description:
                  "Crafting digital realms, I conjure code into captivating experiences. With pixels as my paint and algorithms as my brush, I sculpt dynamic landscapes where innovation meets imagination, shaping tomorrow's virtual frontiers.",
              },
              {
                title: "Graphics Designer",
                description:
                  "Transforming pixels into masterpieces, I weave creativity with precision, crafting visual narratives that captivate. With a keen eye for detail and a passion for innovation, I bring imagination to life through design.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 py-3 md:py-6 lg:py-6 px-4 md:px-6 lg:px-6 rounded-lg shadow-lg hover:shadow-emerald-500/20 transition duration-300"
                variants={fadeInUp}
              >
                <h3 className="text-2xl font-semibold mb-4 text-emerald-400">
                  {service.title}
                </h3>
                <p className="text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section
        id="contact-me"
        className="py-4 md:py-6 lg:py-8 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-800 rounded-lg shadow-2xl"
      >
        <motion.div {...fadeInUp}>
          <h2 className="text-3xl sm:text-4xl font-bold lg:mb-8 md:mb-8 mb-3 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            Get In Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-emerald-400">
                Let{"'"}s Chat
              </h3>
              <p className="text-gray-300 mb-6">
                Always available for projects if the right project comes along.
                Feel free to contact me.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-emerald-400 mr-2" />
                  <span>+256 704656761</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-emerald-400 mr-2" />
                  <span>banyweirejohn@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-emerald-400 mr-2" />
                  <span>Kampala, Uganda</span>
                </div>
              </div>
            </div>
            <EmailForm />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
