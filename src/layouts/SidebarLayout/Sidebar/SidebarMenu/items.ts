import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { ReactNode } from 'react';
import { isAdmin } from 'src/config';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
  index: number;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const commonMenuItems: MenuItems['items'] = [
  {
    name: 'Account Settings',
    link: '/settings',
    icon: AccountTreeTwoToneIcon,
    index: 3
  },
  {
    name: 'Leaderboard',
    link: '/leaderboard',
    icon: MilitaryTechIcon,
    index: 1
  },
  {
    name: 'Messenger',
    link: '/message',
    icon: InboxTwoToneIcon,
    index: 2
  },
  { name: 'Sign Out', link: '/sign-out', icon: ExitToAppIcon, index: 6 }
];

const adminMenuItems: MenuItems['items'] = [
  {
    name: 'Progress Approval',
    link: '/progress-approval',
    icon: PlaylistAddCheckIcon,
    index: 4
  },
  {
    name: 'App',
    link: '/app',
    icon: AppRegistrationIcon,
    index: 4
  }
];

const clientMenuItems: MenuItems['items'] = [
  {
    name: 'Profile',
    link: '/profile',
    icon: AccountCircleTwoToneIcon,
    index: -1
  },
  {
    name: 'Update Progress',
    link: '/progress',
    icon: UpgradeIcon,
    index: 5
  }
];

let menuItems: MenuItems[] = [
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

menuItems[0].items.sort((a, b) => a.index - b.index);

export default menuItems;
