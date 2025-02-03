"use client"

import UserButton from "@/components/user-button";
import { SessionProvider } from "next-auth/react";

const Home = () => {
  return (
    <div> 
      <SessionProvider>
      <UserButton /> 
      </SessionProvider>
      
    </div>
  );
}

export default Home;