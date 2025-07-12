import React from "react";

type PageHeaderProps = {
  title: string;
  icon: React.JSX.Element;
  subTitle?: string;
  isAdmin?: boolean;
  information?: React.ReactNode;
};

export default function PageHeader({
  title,
  icon,
  subTitle,
  isAdmin,
  information,
}: PageHeaderProps) {
  const employee = {
    kantor: "Kantor Pusat Perkeretaapian",
    jabatan_struktural: "Manager",
  };

  return (
    <header className=" px-8 pt-5 flex flex-col md:flex-row md:items-center gap-4">
      <div className="text-white p-2 bg-dangerDjka flex justify-center rounded-[10px]">
        {icon}
      </div>
      <div className="flex-grow text-black">
        <h2 className="font-bold uppercase text-base">{title}</h2>
        {!isAdmin && (
          <p className=" font-semibold text-sm text-black uppercase">
            {subTitle ||
              employee?.kantor ||
              employee?.jabatan_struktural ||
              "-"}
          </p>
        )}

        {information && <div className="mt-2">{information}</div>}
      </div>
    </header>
  );
}
