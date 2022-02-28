import React, { useRef, LegacyRef, useContext } from 'react';
import { ExpandAltOutlined, SettingOutlined } from '@ant-design/icons';
import Graphin, { Utils, GraphinContext } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';
import iconLoader from '@antv/graphin-icons';

const { Menu } = ContextMenu;
const icons = Graphin.registerFontFamily(iconLoader);

const layout = {
  type: 'concentric',
};

const SettingNode = ({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const { graph } = useContext(GraphinContext);

  const handleExpand = (menuItem: any, menuData: any) => {
    const expandData = Utils.mock(5).expand([menuData]).graphin();
    const randomNum = (Math.random() + 5).toFixed(1);

    switch (menuItem.key) {
      case 'tag':
        setData((data: any) => ({
          // 还需要对Node和Edge去重，这里暂不考虑
          nodes: [...data.nodes, ...expandData.nodes],
          edges: [...data.edges, ...expandData.edges],
        }));
        break;
      case 'avatar':
        graph.updateItem(menuData.id, {
          style: {
            icon: {
              type: 'text',
              value: `图片${randomNum}`,
            },
            label: {
              value: `更新了图片${randomNum}`,
            },
          },
        });
        break;
    }
  };

  return (
    <ContextMenu>
      <Menu
        bindType="node"
        options={[
          {
            key: 'tag',
            icon: <ExpandAltOutlined />,
            name: '插入节点',
          },
          {
            key: 'avatar',
            icon: <SettingOutlined />,
            name: '设置图标',
          },
        ]}
        onChange={(menuItem, menuData) => handleExpand(menuItem, menuData)}
      />
    </ContextMenu>
  );
};

export default () => {
  const [data, setData] = React.useState(Utils.mock(6).circle().graphin());

  return (
    <div>
      <Graphin data={data} layout={layout}>
        <SettingNode setData={setData} />
      </Graphin>
    </div>
  );
};
