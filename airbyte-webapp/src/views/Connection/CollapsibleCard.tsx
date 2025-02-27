import React from "react";
import { useToggle } from "react-use";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { ContentCard } from "components";

const Card = styled(ContentCard)`
  margin-bottom: 10px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ArrowView = styled(FontAwesomeIcon)<{ $isOpen?: boolean }>`
  font-size: 16px;
  line-height: 16px;
  color: ${({ theme }) => theme.primaryColor};
  transform: ${({ $isOpen }) => $isOpen && "rotate(90deg)"};
  transition: 0.3s;
  cursor: pointer;
`;

export type CollapsibleCardProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsedState?: boolean;
};

export const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  children,
  collapsible = false,
  defaultCollapsedState = false,
}) => {
  const [isCollapsed, toggle] = useToggle(defaultCollapsedState);

  return (
    <Card
      title={
        <CardHeader>
          {title}
          {collapsible && <ArrowView onClick={toggle} $isOpen={!isCollapsed} icon={faChevronRight} />}
        </CardHeader>
      }
    >
      {collapsible && isCollapsed ? true : children}
    </Card>
  );
};
