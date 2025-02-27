import React, { useState } from "react";
import { useDebounce } from "react-use";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FormattedMessage, useIntl } from "react-intl";

import { Button } from "components";
import ToolTip from "components/ToolTip";

import { copyToClipboard } from "utils/clipboard";

import { buildAttemptLink } from "../attemptLinkUtils";

interface Props {
  jobId: string | number;
  attemptId?: number;
}

export const LinkToAttemptButton: React.FC<Props> = ({ jobId, attemptId }) => {
  const { formatMessage } = useIntl();

  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [hideTooltip] = useDebounce(() => setShowCopyTooltip(false), 3000, [showCopyTooltip]);

  const onCopyLink = async () => {
    // Get the current URL and replace (or add) hash to current log
    const url = new URL(window.location.href);
    url.hash = buildAttemptLink(jobId, attemptId);
    await copyToClipboard(url.href);
    // Show and hide tooltip with a delay again
    setShowCopyTooltip(true);
    hideTooltip();
  };

  return (
    <ToolTip
      disabled={!showCopyTooltip}
      control={
        <Button
          secondary
          onClick={onCopyLink}
          title={formatMessage({ id: "connection.copyLogLink" })}
          aria-label={formatMessage({ id: "connection.copyLogLink" })}
        >
          <FontAwesomeIcon icon={faLink} />
        </Button>
      }
    >
      <FormattedMessage id="connection.linkCopied" />
    </ToolTip>
  );
};
