import { FunctionComponent, ReactNode } from 'react';

type HomeContentProps = {
  children: ReactNode;
};

const ContentLayout: FunctionComponent<HomeContentProps> = ({ children }) => {
  return <div className="content">{children}</div>;
};

export default ContentLayout;
