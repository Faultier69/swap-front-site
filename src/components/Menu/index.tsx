import React, { useRef } from 'react'
import { BookOpen, Code, Info, MessageCircle, PieChart, Tool } from 'react-feather'
import styled from 'styled-components'
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import { useActiveWeb3React } from '../../hooks'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'

import { ExternalLink, StyledInternalLink } from '../../theme'
import { ButtonPrimary } from '../Button'

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StyledMenuButton = styled.button`
background-color: transparent;
${({ theme }) => theme.mediaWidth.upToMedium`
padding: 1rem 0 1rem 1rem;
justify-content: flex-end;
`};
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;

  ${({ theme }) => theme.mediaWidth.upToExtra2Small`
    margin-left: 0.2rem;
  `};
`

const MenuFlyout = styled.span`
  border-radius: ${({ theme }) => theme.borderRadius};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: -15rem !important;
    :after{
      border-color: #fff transparent transparent transparent !important;
      top: 162px !important;
    }
  `};
`

const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text1};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
    opacity:0.8;
  }
  > svg {
    margin-right: 8px;
  }
`

const MenuItemInternal = styled(StyledInternalLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text1};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
    opacity:0.8;
  }
  > svg {
    margin-right: 8px;
  }
`

export default function Menu() {
  const { account } = useActiveWeb3React()

  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.MENU)
  const toggle = useToggleModal(ApplicationModal.MENU)
  useOnClickOutside(node, open ? toggle : undefined)
  const openClaimModal = useToggleModal(ApplicationModal.ADDRESS_CLAIM)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle} className="s-top-links-btn">
      </StyledMenuButton>

      {open && (
        <MenuFlyout className="s-top-links">
          <MenuItem id="link" href="https://yuzu-swap.com">
            <span className="docs">Docs</span>
          </MenuItem>
          <MenuItem id="link" href="https://github.com/yuzuswap-oasis">
            <span className="code">Github</span>
          </MenuItem>
          <MenuItem id="link" href="https://twitter.com/Yuzu_Swap">
            <span className="twitter">Twitter</span>
          </MenuItem>
          <MenuItem id="link" href="https://t.me/yuzuswap_on_oasis">
            <span className="telegram">Telegram</span>
          </MenuItem>
          {/* {account && (
            <ButtonPrimary onClick={openClaimModal} padding="8px 16px" width="100%" borderradius="20px" mt="0.5rem">
              Claim UNI
            </ButtonPrimary>
          )} */}
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
