import React, { useEffect, useState } from "react";
import useGetStatusAlert from "../../hooks/useGetStatusAlert";
import { Alert } from "antd";

const StatusAlert: React.FC = () => {
  const status = useGetStatusAlert();
  const [visible, setVisible] = useState(true);

  // Close alert after 5 seconds
  useEffect(() => {
    if (status.message) {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [status.message]);

  return (
    <>
      {visible && (
        <Alert
          message={status.message}
          type={status.type}
          closable
          afterClose={() => setVisible(false)}
        />
      )}
    </>
  );
};

export default StatusAlert;
