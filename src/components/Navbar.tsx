'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { signOut, useSession } from 'next-auth/react';
import { IoIosMenu } from "react-icons/io";
function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    handleResize(); // Check initial width
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast.success('Logout successful');
      router.push('/login');
    } catch (error: any) {
      console.log("Logout error:", error.message);
      toast.error(error.message);
    }
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="p-4 md:p-6 shadow-md ">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Saffron RenewTech
        </Link>
        {isMobile ? (
          <div className="relative">
            <Button variant="ghost" onClick={toggleMenu}>
              <IoIosMenu size={24} />
            </Button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 shadow-lg rounded-md z-50 bg-[#09090b]">
                <div className="flex flex-col space-y-2 p-4">
                  <Link href="/services">
                    <Button variant="ghost" onClick={toggleMenu}>Services</Button>
                  </Link>
                  <Link href="/products">
                    <Button variant="ghost" onClick={toggleMenu}>Products</Button>
                  </Link>
                  <Link href="/projects">
                    <Button variant="ghost" onClick={toggleMenu}>Projects</Button>
                  </Link>
                  {session ? (
                    <>
                      {session.user.role === 'admin' && (
                        <Link href="/admin">
                          <Button variant="ghost" onClick={toggleMenu}>Admin Panel</Button>
                        </Link>
                      )}
                      <Link href="/cart">
                        <Button variant="ghost" onClick={toggleMenu}>Cart</Button>
                      </Link>
                      <Link href="/profile">
                        <Button variant="ghost" onClick={toggleMenu}>Profile</Button>
                      </Link>
                      <Button onClick={() => { handleLogout(); toggleMenu(); }}>Logout</Button>
                    </>
                  ) : (
                    <Link href="/login">
                      <Button variant="ghost" onClick={toggleMenu}>Login</Button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link href="/services">
              <Button variant="ghost">Services</Button>
            </Link>
            <Link href="/products">
              <Button variant="ghost">Products</Button>
            </Link>
            <Link href="/projects">
              <Button variant="ghost">Projects</Button>
            </Link>
            {session ? (
              <>
                {session.user.role === 'admin' && (
                  <Link href="/admin">
                    <Button className='mr-4' variant="ghost">Admin Panel</Button>
                  </Link>
                )}
                <Link href="/cart">
                  <Button className='mr-4' variant="ghost">Cart</Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" className='mr-4'>Profile</Button>
                </Link>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;