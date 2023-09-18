import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-4 text-center  bottom-0 w-full">
      <div className="mb-2">
        Created with{" "}
        <FontAwesomeIcon icon={faHeart} className="text-red-500 mx-1" /> by{" "}
        <a
          href="https://www.linkedin.com/in/subhadip-shee-77a469235"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400"
          title="Subhadip Shee's Linkedin Profile"
        >
          Subhadip Shee
        </a>
      </div>
      <div className="mb-2">
        &copy; {year}{" "}
        <strong className="text-yellow-400">
          Vote<span className="text-blue-400">poll</span>
        </strong>
      </div>
      <div className="text-sm">
        All rights reserved. Designed and developed with{" "}
        <FontAwesomeIcon icon={faHeart} className="text-red-500 mx-1" /> in
        mind.
      </div>
      <div className="mt-4">
        <a
          href="https://www.linkedin.com/in/subhadip-shee-77a469235"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 mx-2"
          title="Follow on LinkedIn"
        >
          Follow on LinkedIn
        </a>
        <a
          href="https://twitter.com/Shee7Subhadip"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 mx-2"
          title="Follow on Twitter"
        >
          Follow on Twitter
        </a>
      </div>
    </footer>
  );
};

export default Footer;
