import React, { useState } from "react";
import { Row, Col, Card, CardHeader, CardBody, Container } from "shards-react";

const Table = ({ tableTitle, tHead, tData }) => {
  const [title, setTitle] = useState(tableTitle);
  const [thead, setThead] = useState(tHead)
  const [data, setData] = useState(tData)

  return (
    <Container fluid className="main-content-container px-4">
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">{title}</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    {thead.map(item => (
                      <th scope="col" className="border-0">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ali</td>
                    <td>Kerry</td>
                    <td>Russian Federation</td>
                    <td>Gdańsk</td>
                    <td>107-0339</td>
                  </tr>
                  {/* <tr>
                    <td>Clark</td>
                    <td>Angela</td>
                    <td>Estonia</td>
                    <td>Borghetto di Vara</td>
                    <td>1-660-850-1647</td>
                  </tr>
                  <tr>
                    <td>Jerry</td>
                    <td>Nathan</td>
                    <td>Cyprus</td>
                    <td>Braunau am Inn</td>
                    <td>214-4225</td>
                  </tr>
                  <tr>
                    <td>Colt</td>
                    <td>Angela</td>
                    <td>Liberia</td>
                    <td>Bad Hersfeld</td>
                    <td>1-848-473-7416</td>
                  </tr>
                  <tr>
                    <td>Colt</td>
                    <td>Angela</td>
                    <td>Liberia</td>
                    <td>Bad Hersfeld</td>
                    <td>1-848-473-7416</td>
                  </tr> */}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Table;