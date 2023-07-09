import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardHeader, CardBody, Container } from "shards-react";
import axios from '../../axios'

const Tableunit = () => {
  const [data, setData] = useState([]);
  const tHead = ['nomor', 'nama', 'BBM', 'angkutan', 'average', 'service', 'pemakaian', 'last service']

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const formattedToken = token ? token.replace(/"/g, '') : '';

    const getData = async () =>{
      await axios
      .get(`/unit`,{headers:{Authorization: `Bearer ${formattedToken}`}})
      .then((res) => setData(res.data.result))
      .catch((err) => console.log("error"))
    }

    Promise.all([getData()])
  }, [])

  

  return (
    <Container fluid className="main-content-container px-4">
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Unit</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    {tHead.map(item => (
                      <th scope="col" className="border-0">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nomor_unit}</td>
                      <td>{item.nama_model}</td>
                      <td>{item.jenis_BBM}</td>
                      <td>{item.jenis_angkutan}</td>
                      <td>{item.average_BBM} Km/L</td>
                      <td>{item.service} Bulanan</td>
                      <td>{item.pemakaian}</td>
                      <td>{item.terakhir_service}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Tableunit;