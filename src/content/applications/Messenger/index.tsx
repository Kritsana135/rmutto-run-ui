import { useContext, useEffect, useRef, useState } from 'react';

import { Helmet } from 'react-helmet-async';

import TopBarContent from './TopBarContent';
import BottomBarContent from './BottomBarContent';
import SidebarContent from './SidebarContent';
import ChatContent from './ChatContent';

import { Scrollbars } from 'react-custom-scrollbars-2';

import { Box, Drawer, Hidden } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ChatRes, CHAT_DOCUMENT } from '../../../graphql/message/getMessage';
import { ChatSidebarContext } from '../../../contexts/ChatSidebarContext';
import {
  SendMessageReq,
  SendMessageRes,
  SEND_MESSAGE_DOCUMENT
} from '../../../graphql/message/sendMessage';
import { ChatModel } from '../../../graphql/message/message';

const RootWrapper = styled(Box)(
  () => `
       height: 100%;
       display: flex;
`
);

const Sidebar = styled(Box)(
  ({ theme }) => `
        width: 300px;
        background: ${theme.colors.alpha.white[100]};
        border-right: ${theme.colors.alpha.black[10]} solid 1px;
`
);

const ChatWindow = styled(Box)(
  () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`
);

const ChatTopBar = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.white[100]};
        border-bottom: ${theme.colors.alpha.black[10]} solid 1px;
        padding: ${theme.spacing(3)};
`
);

const ChatMain = styled(Box)(
  () => `
        flex: 1;
`
);

const ChatBottomBar = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(3)};
`
);

function ApplicationsMessenger() {
  const ref = useRef<any>(null);

  const [selectedChat, setSelectedChat] = useState<string>('');
  const [nameChat, setNameChat] = useState<string>('');
  const [chatList, setChat] = useState<ChatModel[]>([]);
  const { sidebarToggle, toggleSidebar } = useContext(ChatSidebarContext);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollToBottom();
    }
  });

  const closeSidebar = () => toggleSidebar();

  const [GetChat] = useLazyQuery<ChatRes>(CHAT_DOCUMENT, {
    onCompleted: (res) => {
      console.log(res);
      setChat(res.getChat);
    }
  });

  const [SendMessage] = useMutation<SendMessageRes, SendMessageReq>(
    SEND_MESSAGE_DOCUMENT
  );

  const handleSelectChat = (otherId: string, fullName: string) => {
    setSelectedChat(otherId);
    setNameChat(fullName);
    GetChat({
      variables: {
        otherId
      }
    });
  };

  const handleSendChat = ({ content }: { content: string }) => {
    SendMessage({
      variables: {
        input: {
          content,
          reciverId: selectedChat
        }
      },
      onCompleted: (res) => {
        setChat((item) => [res.sendMessage, ...item]);
      }
    });
  };

  const handleSendChatWithId = (reciverId: string, content: string) => {
    SendMessage({
      variables: {
        input: {
          content,
          reciverId
        }
      },
      onCompleted: (res) => {
        setChat((item) => [res.sendMessage, ...item]);
      }
    });
  };

  const WrapSideBarContent = () => {
    return (
      <SidebarContent
        handleSelectChat={handleSelectChat}
        selectedChat={selectedChat}
        handleSendChatWithId={handleSendChatWithId}
      />
    );
  };

  return (
    <>
      <Helmet>
        <title>Messenger - Applications</title>
      </Helmet>
      <RootWrapper>
        {/* sidebar chat */}
        <Hidden mdDown>
          <Sidebar>
            <Scrollbars autoHide>{WrapSideBarContent()}</Scrollbars>
          </Sidebar>
        </Hidden>
        {/* sidebar drawer */}
        <Hidden mdUp>
          <Drawer
            anchor="left"
            open={sidebarToggle}
            onClose={closeSidebar}
            variant="temporary"
            elevation={9}
          >
            {WrapSideBarContent()}
          </Drawer>
        </Hidden>
        {chatList.length > 0 ? (
          <ChatWindow>
            <ChatTopBar>
              <TopBarContent userId={selectedChat} fullName={nameChat} />
            </ChatTopBar>
            <ChatMain>
              <Scrollbars ref={ref} autoHide>
                <ChatContent chatList={chatList} />
              </Scrollbars>
            </ChatMain>
            <ChatBottomBar>
              <BottomBarContent handleSendChat={handleSendChat} />
            </ChatBottomBar>
          </ChatWindow>
        ) : (
          <Hidden mdUp>{WrapSideBarContent()}</Hidden>
        )}
      </RootWrapper>
    </>
  );
}

export default ApplicationsMessenger;
