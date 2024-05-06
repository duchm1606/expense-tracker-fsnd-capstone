import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/header";
import Hero from "./_components/Hero";
import { redirect } from "next/navigation";
import ProfileClient from "./_components/ProfileClient";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}
