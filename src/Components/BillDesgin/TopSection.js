import React, { useState } from "react";
import { DatePicker, Space, Select, Col, Row, Button } from "antd";
import styled from "styled-components";
const onChange = (date, dateString) => {
  console.log(date, dateString);
};
const TopSection = () => {
  const [datalist, setDataList] = useState();
  const datas = [
    {
      id: 1,
      name: "apple",
    },
    {
      id: 2,
      name: "ball",
    },
  ];
  return (
    <TopSectionPart>
      <div className="date-section"></div>
      <Row>
        <Col span={6}>
          <div className="analyze-section">
            <h4>Analyzer:</h4>

            <Space
              direction="vertical"
              style={{
                width: "100%",
                marginLeft: 10,
              }}
            >
              <Select
                style={{
                  width: "100%",
                }}
              >
                {datas.map((item) => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Space>
          </div>
        </Col>
        <Button
          // onClick={onChangeHandler}
          htmlType="submit"
          className="load-btn"
          type="primary"
          id="submitBtn"
        >
          Load
        </Button>
      </Row>
    </TopSectionPart>
  );
};

export default TopSection;
const TopSectionPart = styled.div`
  .date-section {
    display: flex;
    justify-content: flex-end;
  }
  .analyze-section {
    display: flex;
    margin: 10px;
  }
  .load-btn {
    margin-top: 10px;
  }
`;
