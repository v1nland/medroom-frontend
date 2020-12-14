import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Input, Button } from "reactstrap";

class Cursos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                                <CardTitle tag="h4">Crear Curso</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <form>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <small>Nombre Curso</small>
                                            <Input placeholder="Programación" />
                                        </Col>
                                        <Col sm="12" md="6">
                                            <small>Sigla Curso</small>
                                            <Input placeholder="CIT1000" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <small>Vigencia (Semestres)</small>
                                            <Input placeholder="2" />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="info" type="submit" style={{ marginTop: "20px" }}>
                                                Crear Curso
                                            </Button>
                                        </div>
                                    </Row>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Cursos;
