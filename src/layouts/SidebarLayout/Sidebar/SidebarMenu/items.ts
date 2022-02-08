import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { ReactNode } from 'react';

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

const menuItems: MenuItems[] = [
  {
    heading: '',
    items: [
      {
        name: 'Progress Approval',
        link: '/progress-approval',
        icon: PlaylistAddCheckIcon
      },
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
    ]
  }
];

export default menuItems;
