import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
const { Option } = Select;



const SelectDrop = ({handleChange, publishers}) => {
  const [children, setChildren] = useState([]);
  const [size, setSize] = useState('middle');

  useEffect(() => {
    const data = [];
    publishers.forEach(publisher => {
      data.push(<Option key={publisher.user_name}>{publisher.user_name}</Option>);
    });
    setChildren(data);
  }, [publishers])

  return (
    <>
      <Select
        mode="multiple"
        size={size}
        placeholder="Please select publishers"
        defaultValue={[]}
        onChange={handleChange}
        style={{
          width: '100%',
        }}
      >
        {children}
      </Select>
    </>
  );
};

export default SelectDrop;