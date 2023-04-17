import React from "react";

export default function About() {
  return (
    <div className="block col-2">
      <h2> About</h2>
      <div>
        <p>
          My name is Dave and it's been a longstanding goal of mine to{" "}
          create a dark room of my own. I use an omega c62 enlarger head with a
          80mm f5 el-nikkor lens and print on ilford paper. Photos are either
          shot on a Leica m2 or Olympus XA. All sizes for orders are 5x7 and
          will have above standard contrast.{" "}
        </p>
        <p>
          For any questions or inquiries, please feel free to contact me at{" "}
          <a href="mailto:daves-prints@outlook.com">here</a>.
          You can also check out my work on Instagram {" "}
          <a href="https://www.instagram.com/bigstripedpants" target="_blank" rel="noopener noreferrer">
            here
          </a>
          .
          Thanks :)
        </p>
      </div>
    </div>
  );
}