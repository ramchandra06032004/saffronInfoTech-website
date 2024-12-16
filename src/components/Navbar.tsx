'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { signOut, useSession } from 'next-auth/react';

function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

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

  return (
    <nav className="p-4 md:p-6 shadow-md ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
        Saffron RenewTech
        </Link>
        <div className="flex space-x-4">
          <Link href="/about">
            <Button variant="ghost" >About</Button>
          </Link>
          <Link href="/products">
            <Button variant="ghost">Products</Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost">Projects</Button>
          </Link>
          
        </div>
        <div>
        {session ? ( 
          <>
          {session.user.role === 'admin' && (
                <Link href="/admin">
                  <Button className='mr-4' variant="ghost">Admin Panel</Button>
                </Link>
            )}

          <Button className='mr-4' variant="ghost">
            <Link href="/cart">
            cart
            </Link>
          </Button>
          <Button variant="ghost" className='mr-4'>
            <Link href="/profile" >
              Profile
            </Link>
          </Button>
            <Button onClick={handleLogout}  >
              Logout
            </Button>
            </>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;