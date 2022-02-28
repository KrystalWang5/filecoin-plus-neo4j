import React, { useCallback, useEffect, useState } from 'react';
import { request } from 'umi';
import Graphin, { GraphinData } from '@antv/graphin';
import { UpdateNodeIcon } from '@/pages/neo4j/update-node-icon';
import { Card } from 'antd';

export default () => {
  const [graphinData, setGraphinData] = useState<GraphinData>({
    nodes: [],
    edges: [],
  });

  const layout = {
    type: 'graphin-force',
    // animation: false,
    preset: {
      type: 'concentric', // 力导的前置布局
    },
    // leafCluster: true, // 是否需要叶子节点聚类
    // nodeClusterBy: 'cluster', // 节点聚类的映射字段
    // clusterNodeStrength: 20, // 节点聚类作用力
  };

  const fetchData = async () => {
    const data: GraphinData = await request('/api/dashboard/antv');

    setGraphinData((source) => ({
      ...source,
      ...data,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card title={'测试Graphin api'}>
      <Graphin data={graphinData} layout={layout}>
        <UpdateNodeIcon insertNode={setGraphinData} />
      </Graphin>
    </Card>
  );
};
