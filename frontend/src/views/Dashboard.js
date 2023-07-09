import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import axios from '../axios'

import PageTitle from "../components/common/PageTitle";
import SmallStats from "../components/common/SmallStats";
import TableUnit from "../components/blog/tableUnit";
import UsersByDevice from "../components/blog/UsersByDevice";
import NewDraft from "../components/blog/NewDraft";
import Discussions from "../components/blog/Discussions";
import TopReferrals from "../components/common/TopReferrals";

const Dashboard = () => {
  const [pegawai, setPegawai] = useState('');
  const [office, setOffice] = useState('');
  const [unit, setUnit] = useState([]);
  const [tambang, setTambang] = useState('');
  const [driver, setDriver] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const formattedToken = token ? token.replace(/"/g, '') : ''; 
    const getPegawai = async () =>{
      await axios
      .get('/pegawai',{headers:{Authorization: `Bearer ${formattedToken}`}})
      .then((res) => setPegawai(res.data.count))
      .catch((err) => console.log("error bodoh"))
    }
    const getOffice = async () =>{
      await axios
      .get('/kantor',{headers:{Authorization: `Bearer ${formattedToken}`}})
      .then((res) => setOffice(res.data.count))
      .catch((err) => console.log("error bodoh"))
    }
    const getUnit = async () =>{
      await axios
      .get('/unit',{headers:{Authorization: `Bearer ${formattedToken}`}})
      .then((res) => setUnit(res.data))
      .catch((err) => console.log("error bodoh"))
    }
    const getTambang = async () =>{
      await axios
      .get('/tambang',{headers:{Authorization: `Bearer ${formattedToken}`}})
      .then((res) => setTambang(res.data.count))
      .catch((err) => console.log("error bodoh"))
    }
    const getDriver = async () =>{
      await axios
      .get('/driver',{headers:{Authorization: `Bearer ${formattedToken}`}})
      .then((res) => setDriver(res.data.count))
      .catch((err) => console.log("error bodoh"))
    }
    
    Promise.all([getPegawai(),getOffice(), getUnit(), getTambang(), getDriver()])
  }, [])
  

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle title="Dashboard" className="text-sm-left mb-3" />
      </Row>

      {/* Small Stats Blocks */}
      <Row>
          <Col className="col-lg mb-4">
            <SmallStats
              variation="1"
              label="pegawai"
              value={pegawai}
            />
          </Col>
          <Col className="col-lg mb-4">
            <SmallStats
              variation="1"
              label="office"
              value={office}
            />
          </Col>
          <Col className="col-lg mb-4">
            <SmallStats
              variation="1"
              label="unit"
              value={unit.count}
            />
          </Col>
          <Col className="col-lg mb-4">
            <SmallStats
              variation="1"
              label="tambang"
              value={tambang}
            />
          </Col>
          <Col className="col-lg mb-4">
            <SmallStats
              variation="1"
              label="driver"
              value={driver}
            />
          </Col>
      </Row>

      <Row>
        {/* Users Overview */}
        <Col lg="8" md="12" sm="12" className="mb-4">
          <TableUnit />
        </Col>

        {/* Users by Device */}
        <Col lg="4" md="6" sm="12" className="mb-4">
          <UsersByDevice />
        </Col>

        {/* New Draft */}
        <Col lg="4" md="6" sm="12" className="mb-4">
          <NewDraft />
        </Col>

        {/* Discussions */}
        <Col lg="5" md="12" sm="12" className="mb-4">
          <Discussions />
        </Col>

        {/* Top Referrals */}
        <Col lg="3" md="12" sm="12" className="mb-4">
          <TopReferrals />
        </Col>
      </Row>
    </Container>
  );
};

Dashboard.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      percentage: PropTypes.string,
      increase: PropTypes.bool,
      decrease: PropTypes.bool,
      chartLabels: PropTypes.arrayOf(PropTypes.string),
      attrs: PropTypes.objectOf(PropTypes.string),
      datasets: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          fill: PropTypes.string.isRequired,
          borderWidth: PropTypes.number.isRequired,
          backgroundColor: PropTypes.string.isRequired,
          borderColor: PropTypes.string.isRequired,
          data: PropTypes.arrayOf(PropTypes.number).isRequired,
        })
      ).isRequired,
    })
  ),
};

export default Dashboard;