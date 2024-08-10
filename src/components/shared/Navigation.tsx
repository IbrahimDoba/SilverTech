'use client';
import { Button } from '@nextui-org/button';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { AcmeLogo } from '../AcmeLogo';
import { useEffect, useState } from 'react';
import { ThemeSwitch } from '../ThemeSwitch';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import { Avatar, Link } from '@nextui-org/react';
import { useSession, signOut } from 'next-auth/react';
import Search from '../Search';
import { getUserInfo } from '@/lib/getUserInfo';

const menuItems = [
  {
    name: 'Profile',
    href: '/profile',
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Activity',
    href: '/activity',
  },
  {
    name: 'New Post',
    href: '/write',
  },
  {
    name: 'System',
    href: '/system',
  },
  {
    name: 'Deployments',
    href: '/deployments',
  },
  {
    name: 'My Settings',
    href: '/settings',
  },
  {
    name: 'Team Settings',
    href: '/team-settings',
  },
  {
    name: 'Help & Feedback',
    href: '/help',
  },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user;

  const [username, setUsername] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      getUserInfo().then((data) => {
        setUsername(data.username);
      });
    }
  }, [status, user]);

  return (
    <Navbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        wrapper: 'max-w-screen-2xl px-0',
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand className='flex-grow-0'>
          <Link href='/home' className='text-default-foreground'>
            <AcmeLogo />
            <p className='font-bold text-inherit'>ACME</p>
          </Link>
        </NavbarBrand>
        <Search />
      </NavbarContent>

      {status !== 'authenticated' ? (
        <NavbarContent justify='end'>
          <NavbarItem className='hidden lg:flex'>
            <Link href='/login'>Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color='primary' href='/signup' variant='flat'>
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent as='div' justify='end' className='flex gap-4'>
          <Button
            href='/write'
            as={Link}
            color='primary'
            variant='solid'
            radius='sm'
            className='max-md:hidden px-3'
          >
            Write
          </Button>
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Avatar
                as='button'
                className='transition-transform'
                color='secondary'
                name={user?.name ?? 'site user'}
                size='sm'
                src={
                  user?.image ??
                  'https://i.pravatar.cc/150?u=a042581f4e29026704d'
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions' variant='flat'>
              <DropdownItem
                key='profile'
                className='h-14 gap-2'
                href={`/${username}`}
              >
                <p className='font-semibold'>Signed in as</p>
                <p className='font-semibold'>
                  {user?.email ?? 'zoey@example.com'}
                </p>
              </DropdownItem>
              <DropdownItem key='settings' href='/profile'>
                Settings
              </DropdownItem>
              <DropdownItem key='analytics' href='/analytics'>
                Analytics
              </DropdownItem>
              <DropdownItem key='help_and_feedback' href='/help'>
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key='logout'
                color='danger'
                onClick={() => signOut()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}

      {/* theme */}
      <NavbarItem>
        <ThemeSwitch />
      </NavbarItem>

      {/* mobile menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={index === 2 ? 'primary' : 'foreground'}
              className='w-full'
              href={item.href}
              size='lg'
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <DropdownItem key='logout' color='danger' onClick={() => signOut()}>
            Log Out
          </DropdownItem>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}