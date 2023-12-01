'use client';

import Logo from "~/assets/HMG-logo-hor-black.svg";

export const Footer: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  return (
    <div className="bg-gray-200">
      <footer className="container py-3 mx-auto">
        <img src={Logo} alt="logo" width="170" height="50" />
      </footer>
    </div>
  )
}