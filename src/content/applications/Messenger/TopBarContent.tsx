import { Avatar, Box, Button, Hidden, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { ChatSidebarContext } from '../../../contexts/ChatSidebarContext';
import { getProfileUrl } from '../../../utils/image';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
`
);
interface TopBarContentProps {
  userId: string;
  fullName: string;
}

function TopBarContent({ fullName, userId }: TopBarContentProps) {
  const { sidebarToggle, toggleSidebar } = useContext(ChatSidebarContext);

  const profileImage = getProfileUrl(userId);
  return (
    <>
      <RootWrapper>
        <Box sx={{ display: { sm: 'flex' } }} alignItems="center">
          <Avatar
            variant="rounded"
            sx={{ width: 50, height: 50 }}
            alt="Zain Baptista"
            src={profileImage}
          />
          <Box sx={{ pl: { sm: 1.5 }, pt: { xs: 1.5, sm: 0 } }}>
            <Typography variant="h4" gutterBottom>
              {fullName}
            </Typography>
          </Box>
        </Box>
        <Hidden mdUp>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={toggleSidebar}>Open Chat List</Button>
          </Box>
        </Hidden>
      </RootWrapper>
    </>
  );
}

export default TopBarContent;
