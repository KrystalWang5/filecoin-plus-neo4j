import { BasicLayoutProps } from '@ant-design/pro-layout';

export const layout = (): BasicLayoutProps => {
  return {
    title: 'Filecoin Plus',
    route: {
      routes: [
        {
          path: '/antv',
          name: 'G6模型',
        },
      ],
    },
  };
};
