import React from "react";

export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="section-title ">
      {/* <small className=" absolute -top-2 left-0 w-5 h-9 bg-red-500"></small> */}
      <h2 className="relative block text-red-500 font-semibold  ps-9 before:content-[''] before:rounded-sm before:absolute before:w-5 before:h-10 before:top-1/2 before:-translate-y-1/2 before:start-0  before:bg-red-500 ">{title}</h2>
      <span className="text-4xl block font-semibold  py-10 ">{subtitle}</span>
    </div>
  );
}
