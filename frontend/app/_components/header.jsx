import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <div className="p-5 flex justify-between items-center shadow-ms">
      <Image src={"./logo.svg"} alt="logo" width={160} height={100} />
      <a href="/dashboard">
        {" "}
        <Button>Get Started</Button>{" "}
      </a>
    </div>
  );
}

export default Header;
