import React, { useState, useEffect, useCallback } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Count: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const TotalProduct = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchProductsForPlatform = async (url) => {
    try {
      const response = await axios.get(url, { withCredentials: true });
      return response.data.products.length;
    } catch (error) {
      console.error(`Error fetching products from ${url}:`, error);
      return 0;
    }
  };

  const fetchAllPlatformsData = async () => {
    const shopify_url = `http://localhost:3000/api/v1/auth/shopify-products`;
    const daraz_url = `http://localhost:3000/api/v1/auth/daraz-products`;
    const ebay_url = `http://localhost:3000/api/v1/auth/ebay-products`;

    const platformData = await Promise.all([
      fetchProductsForPlatform(shopify_url).then((count) => ({ name: 'Shopify', value: count })),
      fetchProductsForPlatform(daraz_url).then((count) => ({ name: 'Daraz', value: count })),
      fetchProductsForPlatform(ebay_url).then((count) => ({ name: 'eBay', value: count })),
    ]);

    setData(platformData);
  };

  useEffect(() => {
    fetchAllPlatformsData();
  }, []);

  const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);

  const onPieEnter = useCallback((_, index) => {
    setActiveIndex(index);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#0c1a3c"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
        {/* Add a text element to display the total value */}
        <text x="50%" y="90%" textAnchor="middle" fill="#333" fontSize={16}>
          {`Total Products: ${totalValue}`}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TotalProduct;
