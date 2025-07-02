import { useTranslate } from '@tolgee/react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ResultCustom = styled(Result)`
  .ant-result-title {
    color: ${({ theme }) => theme.colors.textBold};
  }
  .ant-result-subtitle {
    color: ${({ theme }) => theme.colors.text};
  }
`;

function ErrorLayout({ code = '500' }: { code?: any }) {
  const { t } = useTranslate();
  const navigate = useNavigate();

  return (
    <ResultCustom
      style={{ marginTop: '56px' }}
      status={code}
      title={code}
      subTitle={t(`error_handle.${code}.content`)}
      extra={
        <Button
          onClick={() => {
            navigate('/');
          }}
          type="primary"
        >
          {t(`error_handle.back_home`)}
        </Button>
      }
    />
  );
}

export default ErrorLayout;
