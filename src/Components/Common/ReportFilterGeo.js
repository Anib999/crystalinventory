import { Col, message, Row, Select } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getDatametricReportType } from "../../services/careLabService";
import AppButton from "./AppButton";
import Datepicker from "./Datepicker";
import FilterTable from "./FilterTable";
import { newTableStyles } from "./TableStyles";

function ReportsFilterGeo({ ...props }) {
  const dispatch = useDispatch();
  const [dateRanges, setDateRanges] = useState();

  const {
    states,
    district,
    setStateId,
    setDistrictId,
    setMunicipalityId,
    municipality,
    dateRange,
    serchButton,
    setFromDate,
    setToDate,
    OnLoad,
    csvDataName,
    csvData,
    reportName,
    printFileName,
    fromDate,
    toDate,
    tableHead,
    reportType,
    setReportId,
    stateId,
    districtId,
    municipalityId,
    diagnosis,
    test,
    diagnosisId,
    testId,
  } = props;

  const { Option } = Select;

  const getLocationDetails = (
    stateId,
    districtId,
    municipalityId,
    diagnosisId
  ) => {
    const sProvince = states.map((index) => {
      if (index.Id === stateId) {
        return index.Name;
      }
    });
    const sDistrict = district.map((index) => {
      if (index.Id === districtId) {
        return index.Name;
      }
    });
    const sMunicipality = municipality.map((index) => {
      if (index.Id === municipalityId) {
        return index.Name;
      }
    });

    const sDiagnosis = diagnosis.map((index) => {
      if (index.Id === diagnosisId) {
        return index.Name;
      }
    });

    const sTest = diagnosis.map((index) => {
      if (index.Id === testId) {
        return index.Name;
      }
    });

    console.log(
      sProvince,
      sDistrict,
      sMunicipality,
      sDiagnosis,
      "asbdasdalldetails"
    );
  };

  useEffect(() => {
    getLocationDetails();
  }, []);

  const printHandle = () => {
    // console.log("fromtodate", fromDate, toDate, dateRanges);

    if (csvData.length !== 0) {
      let newWindow = window.open();

      var adbs = require("ad-bs-converter");
      var nepaliFromDate = dateRanges[0].format("YYYY/MM/DD");
      var nepaliToDate = dateRanges[1].format("YYYY/MM/DD");
      var neaplaiFromToDateString = [];
      if (nepaliFromDate !== undefined) {
        // var nNepaliFromDate = nepaliFromDate.replaceAll("-", "/");
        // var nNepaliToDate = nepaliToDate.replaceAll("-", "/");
        var converterNepaliFromDate = adbs.ad2bs(nepaliFromDate);
        var converterNepalitoDate = adbs.ad2bs(nepaliToDate);
        console.log(converterNepaliFromDate, "hihihi");
        var converteNpFromDate = `${converterNepaliFromDate.en.year}-${converterNepaliFromDate.en.month}-${converterNepaliFromDate.en.day} `;
        var converteNpToDate = `${converterNepalitoDate.en.year}-${converterNepalitoDate.en.month}-${converterNepalitoDate.en.day} `;
        neaplaiFromToDateString.push(converteNpFromDate, converteNpToDate);
        console.log(neaplaiFromToDateString, "hello world");
      }

      let newStyle = ``;
      // if (removetwo)
      newStyle = `<style>thead > tr> th:first-child, thead > tr> th:nth-child(2), tbody > tr > td:first-child,tbody > tr > td:nth-child(2){
        display: none;
       }tbody > tr:last-child{
    background-color: #f0f0f2;
    }
    tbody > tr:last-child > td{
        font-size: 12px;
        font-weight: 500;
    }</style>`;

      let refName = `
      <div class="gocenter">
          
          <h2> Crystal Diagonistic Lab </h2>
          <p> Kathmandu, Sankhamul </p>
          <p>Contact no:9009090 </p>
          <h2>${reportName} Report</h2>
          
          </div>
          <div >
          
          <div style='float:right;margin-bottom:10px;'>
          <strong >From</strong> ${neaplaiFromToDateString[0]} - <strong>To</strong> ${neaplaiFromToDateString[1]}
          </div>
        
      </div>
      `;

      let locationDetail = `
        <div style='float:right;margin-bottom:10px;'>
          <strong >Province</strong> ${states} <strong>To</strong> ${neaplaiFromToDateString[1]}
          </div>
      `;

      let tableBody = "";
      let tableHeadHtml = "<thead>";
      let columns = [];

      tableHead.forEach((ele) => {
        tableHeadHtml += `<th>${ele?.dataIndex}</th>`;
        columns.push(ele.dataIndex);
      });
      tableHeadHtml += "</thead>";

      csvData.forEach((ele) => {
        tableBody = tableBody + "<tr>";
        columns.forEach((cell) => {
          tableBody = tableBody + "<td>" + ele[cell] + "</td>";
        });
        tableBody = tableBody + "</tr>";
      });

      let allTable = `<table>${tableHeadHtml}${tableBody}</table>`;

      newWindow.document.body.innerHTML =
        newTableStyles + newStyle + refName + allTable;

      setTimeout(function () {
        newWindow.print();
        newWindow.close();
      }, 300);
    } else {
      message.info("select some data");
    }
  };

  return (
    <FilterContainer>
      <Row justify="start" align="bottom">
        <Col lg={20} md={24} sm={24}>
          <Row className="filterRow" align="bottom">
            {states !== undefined && (
              <Col lg={8} md={12} sm={11} xs={24}>
                <span className="labelTop">State</span>
                <Select
                  style={{ width: "100%" }}
                  // defaultValue="0"
                  onChange={(val) => {
                    setStateId(val);
                    // console.log(val, "valval");
                  }}
                >
                  <Option value={0}>All</Option>

                  {states?.map((iTy) => {
                    return <Option value={iTy?.Id}>{iTy?.Name}</Option>;
                  })}
                </Select>
              </Col>
            )}
            {district !== undefined && (
              <Col lg={8} md={12} sm={11} xs={24}>
                <span className="labelTop">District</span>
                <Select
                  style={{ width: "100%" }}
                  // defaultValue="0"
                  onChange={(val) => {
                    setDistrictId(val);
                  }}
                >
                  <Option value={0}>All</Option>

                  {district?.map((iTy) => {
                    return <Option value={iTy?.Id}>{iTy?.Name}</Option>;
                  })}
                </Select>
              </Col>
            )}
            {municipality !== undefined && (
              <Col lg={8} md={12} sm={11} xs={24}>
                <span className="labelTop">Municipality</span>
                <Select
                  style={{ width: "100%" }}
                  // defaultValue="0"
                  onChange={(val) => {
                    setMunicipalityId(val);
                  }}
                >
                  <Option value={0}>All</Option>
                  {municipality?.map((iTy) => {
                    return <Option value={iTy?.Id}>{iTy?.Name}</Option>;
                  })}
                </Select>
              </Col>
            )}
            {diagnosis !== undefined && (
              <Col lg={8} md={12} sm={11} xs={24}>
                <span className="labelTop">Diagnosis Id</span>
                <Select
                  style={{ width: "100%" }}
                  // defaultValue="0"
                  onChange={(val) => {
                    console.log(val, "valvalval");
                    setReportId(val);
                  }}
                >
                  {diagnosis?.map((iTy) => {
                    return (
                      <Option value={iTy?.diagnosisId}>
                        {iTy?.diagnosisId}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            )}
            <Col lg={8} md={12} sm={11} xs={24}>
              <span className="labelTop">Test Id</span>
              <Select
                style={{ width: "100%" }}
                // defaultValue="0"
                onChange={(val) => {
                  console.log(val, "valvalval");
                  setReportId(val);
                }}
              >
                {municipality?.map((iTy) => {
                  return <Option value={iTy?.RId}>{iTy?.ReportName}</Option>;
                })}
              </Select>
            </Col>

            {dateRange && (
              <Col lg={8} md={10} sm={12} xs={24}>
                <span className="labelTop">Date Range</span>
                <Datepicker
                  //   defaultValuer={fromDate}
                  onChanger={(value) => {
                    console.log("value", value);
                    setDateRanges(value);
                    setFromDate(value[0].format("YYYY-MM-DD"));
                    setToDate(value[1].format("YYYY-MM-DD"));
                  }}
                />
              </Col>
            )}
            {serchButton && (
              <Col>
                <AppButton
                  className="primary-btn"
                  buttonTitle="Load"
                  buttonOnClick={() => {
                    OnLoad();
                  }}
                  priamryOutlineBtn
                />
              </Col>
            )}
            <div
              style={{
                position: "absolute",
                right: "-210px",
                top: "-60px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {csvDataName && (
                <div
                  className="link"
                  style={{ display: "inline", float: "right" }}
                >
                  <CSVLink
                    filename={csvDataName}
                    className="btn ant-btn btn-primary btn-primary--outline"
                    data={csvData}
                  >
                    Export CSV
                  </CSVLink>
                </div>
              )}
              {printFileName && (
                <button
                  onClick={printHandle}
                  className="btn ant-btn btn-primary btn-primary--outline"
                  style={{
                    marginLeft: "8px",
                    marginBottom: "4px",
                  }}
                >
                  Print
                </button>
              )}
            </div>
          </Row>
        </Col>

        {/* <Col lg={4} md={24} sm={24}>
          {onSearch && (
            <FilterTable
              // ble
              className="costomeInput"
              onInput={(e) => handleSerch(e.target.value)}
              dataReturn
            />
          )}
        </Col> */}
      </Row>
    </FilterContainer>
  );
}

export default ReportsFilterGeo;

const FilterContainer = styled.div`
  /* background-color: #fefefe; */
  padding: 5px;
  .filterRow > div {
    padding: 4px;
  }
  .labelTop {
    display: block;
  }
`;
