import dhs from "./dhs.webp";
import nsf from "./nsf.webp";
import onr from "./onr.webp";
import usda from "./usda.webp";
import mirrorcle from "./mirrorcle.webp";
import microsoft from "./microsoft.webp";
import mist from "./mist.webp";
import amazon from "./amazon.webp";

export const funders = [
  {
    size: "medium" as const,
    items: [
      {
        name: "Department of Homeland Security",
        img: dhs,
        url: "https://www.dhs.gov/",
      },
      {
        name: "National Science Foundation",
        img: nsf,
        url: "https://www.nsf.gov/",
      },
      {
        name: "Office of Naval Research",
        img: onr,
        url: "https://www.nre.navy.mil/",
      },
      {
        name: "US Department of Agriculture",
        img: usda,
        url: "https://nifa.usda.gov/",
      },
      {
        name: "Mirrorcle, Inc",
        img: mirrorcle,
        url: "https://mirrorcletech.com/wp/",
      },
      {
        name: "Microsoft Research",
        img: microsoft,
        url: "https://www.microsoft.com/en-us/research/",
      },
      { name: "MIST Center", img: mist, url: "https://www.mist-center.org/" },
      { name: "Amazon", img: amazon, url: "https://www.amazon.com/" },
    ],
  },
];
