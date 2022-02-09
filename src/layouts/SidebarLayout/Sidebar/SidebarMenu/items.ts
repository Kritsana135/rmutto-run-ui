import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { ReactNode } from 'react';
import { isAdmin } from 'src/config';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import UpgradeIcon from '@mui/icons-material/Upgrade';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const commonMenuItems: MenuItems['items'] = [
  {
    name: 'Account Settings',
    link: '/settings',
    icon: AccountTreeTwoToneIcon
  },
  {
    name: 'Leaderboard',
    link: '/leaderboard',
    icon: MilitaryTechIcon
  },
  {
    name: 'Messenger',
    link: '/message',
    icon: InboxTwoToneIcon
  }
];

const adminMenuItems: MenuItems['items'] = [
  {
    name: 'Progress Approval',
    link: '/progress-approval',
    icon: PlaylistAddCheckIcon
  }
];

const clientMenuItems: MenuItems['items'] = [
  {
    name: 'Profile',
    link: '/profile',
    icon: AccountCircleTwoToneIcon
  },
  {
    name: 'Update Progress',
    link: '/progress',
    icon: UpgradeIcon
  }
];

const menuItems: MenuItems[] = [
  {
    heading: '',
    items: [...commonMenuItems]
  }
];

if (isAdmin) {
  menuItems[0].items.push(...adminMenuItems);
} else {
  menuItems[0].items.push(...clientMenuItems);
}

export default menuItems;
