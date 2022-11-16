import {
  Space,
  Table,
  Tag,
  Input,
  Button,
  Form,
  Row,
  Col,
  DatePicker,
  Select,
} from "antd";
import React, { useEffect, useRef, useState, createRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { carelabStat } from "../Common/StateList";
import Filter from "../Common/Filter";
import Edit from "../Common/Edit";
import PageHeader from "../Common/pageHeader";
import { getControlTestListApi } from "../../services/qcService";
import { getListListOfTestToInsertUpdateCutoffTimeAndCriticalValuesApi } from "../../services/Tat";
import CarelabFilter from "../Common/CarelabFilter";
import TopSection from "./TopSection";
const BillDesign = () => {
  const myRefs = useRef([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const [newanalyzerlist, setnewanalyzerlist] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [lowvalue, setLowValue] = useState();
  const [highvalue, setHighValue] = useState();
  const [meanvalue, setMeanValue] = useState();
  const [controlvalue, setControlvalue] = useState();
  const [entries, setEntries] = useState([]);

  const [inputRefsArray] = useState(() =>
    Array.from({ length: 4 }, () => createRef())
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleKeyPress = () => {
    setCurrentIndex((prevIndex) => {
      console.log(inputRefsArray);
      const nextIndex = prevIndex + 1;
      console.log(nextIndex);
      const nextInput = inputRefsArray?.[nextIndex]?.current;
      console.log(nextInput);
      // nextInput.focus();
      // nextInput.select();
      return nextIndex;
    });
  };

  useEffect(() => {
    if (inputRefsArray?.[0]?.current) {
      inputRefsArray?.[0]?.current?.focus();
    }

    window.addEventListener("keyup", handleKeyPress, false);
    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, []);

  const dateFormat = "YYYY-MM-DD";
  const handleKeyUp = (e, targetElem) => {
    if (e.key === "Enter" && targetElem) {
      // handleKeyPress();
      // targetElem.focus();
    }
  };
  const columns = [
    {
      title: "Test Id",
      dataIndex: "Id",
      key: "Id",
    },
    {
      title: "Test Name",
      dataIndex: "TestName",
      key: "TestName",
    },
    {
      title: "Test Code",
      dataIndex: "TestCode",
      key: "TestCode",
    },

    {
      title: "Low",
      dataIndex: "Low",
      key: "lowvalue",
      width: "auto",
      render: (number, record, i) => {
        // console.log(number, record, i);
        return (
          <Input
            ref={inputRefsArray}
            id={`low${record.TId}`}
            value={number}
            onKeyUp={(e) => handleKeyUp(e)}
            onClick={(e) => {
              setCurrentIndex(record.TId);
              e.target.select();
            }}
          />
        );
      },
    },
    {
      title: "High",
      dataIndex: "high",
      key: "high",
      width: "auto",
      render: (number, record, index) => (
        <Input value={number} onKeyUp={(e) => handleKeyUp(e)} />
      ),
    },
    {
      title: "Mean",
      dataIndex: "mean",
      key: "mean",
      width: "auto",
      render: (number, record, index) => (
        <Input value={number} onKeyUp={(e) => handleKeyUp(e)} />
      ),
    },
    {
      title: "Control Value",
      dataIndex: "mean",
      key: "mean",
      width: "auto",
      render: (number, record, index) => (
        <Input value={number} onKeyUp={(e) => handleKeyUp(e)} />
      ),
    },

    {
      key: "Action ",
      dataIndex: "Action",
      title: "Action",
      render: (data) => {
        return <Button onClick={save}>save</Button>;
      },
    },
    {
      title: "Edit",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Edit
            onClick={() =>
              history.push({
                pathname: `/editcontroltesttest/${record.TId}`,
                state: carelabStat,
              })
            }
          >
            Edit
          </Edit>
        </Space>
      ),
    },
  ];

  // const getanayzerData = (data) => {
  //   dispatch(
  //     getControlTestListApi(data, (val) => {
  //       setnewanalyzerlist(val);
  //     })
  //   );
  // };
  const getTestData = () => {
    dispatch(
      getListListOfTestToInsertUpdateCutoffTimeAndCriticalValuesApi((val) => {
        setnewanalyzerlist(val);
        console.log("test list", testList);
      })
    );
  };
  const returnFilterData = (res) => {
    let newData = {
      analyzerId: res.Id,
    };
    getTestData(newData);
  };
  const save = (record, id) => {
    let tempArray = [];
    let a = tempArray.push(id);
    setLowValue(a);
    // console.log(a, "datainserted");
  };
  return (
    <BillDesignSection>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle="Analyzer details"
          buttonOnClick={() =>
            history.push({
              pathname: "addcontroltesttest",
              state: carelabStat,
            })
          }
        />
        <div className="date-section">
          <Col span={6}>
            <Form.Item
              className="date-div"
              label="Date"
              name="create_date"
              rules={[
                {
                  message: "Please input Created Date!",
                },
              ]}
            >
              <DatePicker
                format={dateFormat}
                style={{ width: "100%", marginLeft: "10" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Lot No."
              name="create_date"
              rules={[
                {
                  message: "Please input Created Date!",
                },
              ]}
            >
              <Select style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <div className="level-section"></div>
        </div>
        <div className="date-section">
          <Col span={6}>
            <Form.Item
              label="Parameter"
              className="parameter-form"
              name="create_date"
              rules={[
                {
                  message: "Please input Created Date!",
                },
              ]}
            >
              <Select style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Level"
              className="level-sections"
              name="create_date"
              rules={[
                {
                  message: "Please input Created Date!",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select Level"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                allowClear
              >
                <Option title={"All"} key={"All"} value={"All"}>
                  {"All"}
                </Option>
                <Option title={"Level 1"} key={"Level 1"} value={"Level 1"}>
                  {"Level 1"}
                </Option>
                <Option title={"Level 2"} key={"Level 2"} value={"Level 2"}>
                  {"Level 2"}
                </Option>
              </Select>
            </Form.Item>
          </Col>

          <div className="level-section"></div>
        </div>

        <div className="datefilter-section">
          <CarelabFilter
            returnFilterData={returnFilterData}
            showTestControlList={true}
          />
        </div>
      </div>

      {newanalyzerlist.length > 0 && (
        <>
          <div className="tableisRes">
            <Table
              className="tableWidth"
              columns={columns}
              dataSource={newanalyzerlist}
              buttonText="view"
            />
            <Button className="saveall-btn">Save All</Button>
          </div>
        </>
      )}
    </BillDesignSection>
  );
};

export default BillDesign;

const BillDesignSection = styled.div`
  .saveall-btn {
    float: right;
  }
  .date-section {
    display: flex;
    justify-content: space-between;
  }
  .date-div {
    margin-left: 10px;
  }
  .parameter-form {
    margin-left: 10px;
  }
  .level-sections {
    margin-left: 10px;
  }
`;
