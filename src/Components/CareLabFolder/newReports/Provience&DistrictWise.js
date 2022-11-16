import { message, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { VerifyPatientReport } from "../../../constants/url";
import {
  getDistrictsByStateId,
  getMunicipalitiesByDistrictId,
  getPatientDetailsByLocationWise,
  getStates,
} from "../../../services/datametricService";
import PageHeader from "../../Common/pageHeader";
import ReportsFilter from "../../Common/ReportsFilter";

function ProvienceDistrictWise() {
  const [states, setStates] = useState([]);
  const [district, setDistrict] = useState([]);
  const [stateId, setStateId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  const [municipality, setMunicipality] = useState([]);
  const [municipalityId, setMunicipalityId] = useState(0);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [patientData, setPatientData] = useState([]);
  const [reportsColumn, setReportsColumn] = useState([]);

  const dispatch = useDispatch();

  function createMarkup(htmlData = "") {
    return {
      __html: htmlData,
    };
  }

  const OnLoad = () => {
    console.log("fromtodate", fromDate, toDate);
    setPatientData([]);
    let data = {
      provinceid: stateId ? stateId : 0,
      districtid: districtId ? districtId : 0,
      municipalityId: municipalityId ? municipalityId : 0,
      fromdate: fromDate,
      todate: toDate,
    };
    console.log(data, "data");

    dispatch(
      getPatientDetailsByLocationWise(data, (val) => {
        if (val.length > 0) {
          let tableKeys = Object.keys(val[0]);
          let data = [];
          tableKeys.forEach((ele) => {
            data.push({
              title: ele,
              dataIndex: ele,
              key: ele,
              // render: function (html) {
              //   return <div dangerouslySetInnerHTML={createMarkup(html)} />;
              // },
            });
          });
          setReportsColumn(data);
          setPatientData(val);
        } else {
          message.info("No data found");
        }
      })
    );
  };

  useEffect(() => {
    dispatch(
      getStates((val) => {
        setStates(val);
        console.log(val);
      })
    );

    dispatch(
      getDistrictsByStateId(stateId, (val) => {
        setDistrict(val);
      })
    );
  }, [stateId]);

  useEffect(() => {
    dispatch(
      getMunicipalitiesByDistrictId(districtId, (val) => {
        setMunicipality(val);
      })
    );
  }, [districtId]);

  // var dateData = {
  //   fromdate: val[0].format("YYYY-MM-DD"),
  //   todate: val[1].format("YYYY-MM-DD"),
  //   SearchType: val.SearchType !== undefined ? val.SearchType : 1,
  // };

  return (
    <>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle={"Provience & Districtwise Patient Count & Details"}
        />
        <ReportsFilter
          dateRange
          serchButton
          states={states}
          district={district}
          municipality={municipality}
          setStateId={setStateId}
          setDistrictId={setDistrictId}
          setMunicipalityId={setMunicipalityId}
          setFromDate={setFromDate}
          setToDate={setToDate}
          OnLoad={OnLoad}
          csvDataName="PatientReport.csv"
          csvData={patientData}
          reportName="Patient's"
          printFileName
          fromDate
          toDate
          tableHead={reportsColumn}
        />

        {patientData?.length > 0 && (
          <div className="tableisRes">
            <Table
              className="tableWidth"
              columns={reportsColumn}
              dataSource={patientData}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ProvienceDistrictWise;