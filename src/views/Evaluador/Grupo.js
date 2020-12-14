import React from "react";
import { Card, CardBody, Row, Col, Table, CardHeader, CardTitle } from "reactstrap";

class Grupo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            estudiantes: [],
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        Promise.all([])
            .then((values) => {})
            .catch((err) => console.log(err));
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    render() {
        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Lista de estudiantes</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Apellido Paterno</th>
                                            <th>Apellido Materno</th>
                                            <th>Nombres</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>López</td>
                                            <td>Pérez</td>
                                            <td>Juan Francisco</td>
                                        </tr>
                                        <tr>
                                            <td>Suárez</td>
                                            <td>Pinilla</td>
                                            <td>Diego Martín</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Grupo;
