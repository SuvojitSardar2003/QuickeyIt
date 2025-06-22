import React from "react";
import { LiaCopyrightSolid } from "react-icons/lia";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="border-t p">
        <div className="container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2">
          <p>{/*<LiaCopyrightSolid />*/}© All Rights Reserved 2025</p>
          <div className="flex item-center gap-4 justify-center text-2xl">
            <a
              href="http://"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="http://"
              className="hover:text-pink-500 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="http://"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="http://"
              className="hover:text-grey-500 transition-colors duration-300"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
