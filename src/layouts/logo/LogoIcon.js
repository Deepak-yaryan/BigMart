import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";

const LogoIcon = () => {
  return (
    <Link href="/">
      <div className="text-pink-500 text-xl text-center">Codeswear Admin</div>
    </Link>
  );
};

export default LogoIcon;
